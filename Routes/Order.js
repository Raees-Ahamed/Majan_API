var express = require("express");
var router = express.Router();
const Order = require("../Models/Order");
const Product = require("../Models/ProductModel");

const validationOrderInput = require("../validation/Order");
const returnMessage = require("../validation/MessageHandelling").returnMessage;
const jwt = require("jsonwebtoken");
const Logger = require('../Logger/Logger').Logger;
const User = require('../Models/User');


const SECRET_KEY = require("../config/keys").secretOrKey;

const nodemailer = require('nodemailer');

router.post('/Order', async (req, res) => {

  try {

      let user = {};
      let orderItems = [];
      const token = req.header("x-jwt-token");

      if ((!token) || (!jwt.verify(token, SECRET_KEY)))
          return returnMessage.userOrder(false, true, true, true, true, true, true, true, true, true, true, "Access denied.Invalid token", 400, res, false);

      user = jwt.decode(token, SECRET_KEY);

      const validationCheck = validationOrderInput(req.body);
      if (validationCheck.isValid === false)
          return returnMessage.userOrder(validationCheck.isValid, validationCheck.firstName, validationCheck.lastName, validationCheck.address, validationCheck.city,
              validationCheck.contactNo, validationCheck.cardName, validationCheck.cardNo, validationCheck.expiryDate, validationCheck.cvNo, validationCheck.itemQty,
              validationCheck.Description, 400, res, false);

      let tempOderInfoInMag = "";
      let totalAmount = 0;

      req.body.cartItems.forEach((orderItem) => {
          orderItems.push(createOrderItemObject(orderItem));
          tempOderInfoInMag = tempOderInfoInMag + ' -  Item name  -  ' + orderItem.productName + '  Quantity -  ' + orderItem.quantity.toString() + '  Unit price  -  ' + orderItem.unitPrice.toString() + '  Line Total (LKR)  -  ' + orderItem.quantity * orderItem.unitPrice;
          totalAmount = totalAmount + (orderItem.quantity * orderItem.unitPrice);
      });

      const userInfo = await User.findById(user.id);


      const mailSendingStatus = await oderInvoiceGeneration(tempOderInfoInMag, totalAmount, userInfo.email);
      if (mailSendingStatus === 0) Logger.error(mailSendingStatus);

      let ProductUpdatedStatus = await updateProductQuantity(orderItems);
      if (ProductUpdatedStatus != "")
          return returnMessage.userOrder(false, true, true, true, true, true, true, true, true, true, true, ProductUpdatedStatus, 400, res, true);

      Order.findOne({
          userId: user.id
      }).then(async order => {
          if (order)
              return await updateOder(order._id, orderItems, res);
          else
              return await createNewOder(user.id, orderItems, res);
      });

  } catch (ex) {
      return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res, ex);
  }


})



router.get("/Order/History", (req, res) => {
  try {
    const token = req.header("x-jwt-token");

    if (!token || !jwt.verify(token, SECRET_KEY))
      return returnMessage.globalOne(
        false,
        403,
        "Access denied.Invalid token",
        res
      );

    user = jwt.decode(token, SECRET_KEY);
    Order.findOne({ userId: user.id })
      .then((order) => res.send(order))
      .catch((err) =>
        res.status(500).send({
          isValid: false,
          description: err,
        })
      );
  } catch (e) {
    return returnMessage.globalOne(false, 500, e, res);
  }
});




//-----------------------------------------------------------helping methods


createOrderItemObject = (orderItems) => {

  return {
      productId: orderItems.productId,
      productName: orderItems.productName,
      categoryId: orderItems.categoryId,
      discountPercent: orderItems.discountPercent,
      taxPercent: orderItems.taxPercent,
      unitPrice: orderItems.unitPrice,
      quantity: orderItems.quantity,
      createdAt: Date.now()
  }

}


createNewOder = async (userId, orderItems, res) => {

  try {

      let order = new Order({
          userId: userId,
          orders: [{ items: orderItems }]
      });

      order.save((err, data) => {
          if (err)
              return returnMessage.userOrder(false, true, true, true, true, true, true, true, true, true, true, "Order placing error.Please try again", 404, res, true);

          else
              return returnMessage.userOrder(true, true, true, true, true, true, true, true, true, true, true, "Order placed sussfully", 200, res, true);

      });

  } catch (ex) {
      return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res, ex);
  }


}


updateOder = async (userId, orderItems, res) => {

  try {

      Order.updateOne(
          { _id: userId },
          { $push: { orders: [{ items: orderItems }] } },
          { new: true },
          (err, data) => {
              if (err)
                  return returnMessage.userOrder(false, true, true, true, true, true, true, true, true, true, true, "Order placing error.Please try again", 400, res, true);

              else
                  return returnMessage.userOrder(true, true, true, true, true, true, true, true, true, true, true, "Order placed sussfully", 200, res, true);

          });

  } catch (ex) {
      return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res, ex);
  }


}


updateProductQuantity = async (orderItems) => {
  debugger

  let ProductUpdatedStatus = "";
  let productIds = (orderItems.map(x => x.productId));
  let filteredProducts = await Product.find({ _id: { $in: productIds }, availableQuantity: { $gt: 0 } });

  if ((filteredProducts) && (orderItems.length === filteredProducts.length)) {

      filteredProducts.forEach(async (product, i) => {

          let customerSelectedItem = orderItems.filter(item => item.productId === product.id)[0];
          if (checkProductQuantityGettingMinius(product, customerSelectedItem) === true) {

              await Product.findByIdAndUpdate(
                  { _id: product.id },
                  { $set: { availableQuantity: product.availableQuantity - customerSelectedItem.quantity, modifiedAt: Date.now() } },
                  { new: true, useFindAndModify: false },
                  (err, data) => {
                      if (err) ProductUpdatedStatus = err;
                  });
          }
      });
      return ProductUpdatedStatus;
  } else return "Not enaught stock to place order.Please try again shrotly";
}


checkProductQuantityGettingMinius = (product, customerSelectedItem) => {
  if ((product.availableQuantity - customerSelectedItem.quantity) >= 0) return true;
  else return false;
}






oderInvoiceGeneration = async (tempOderInfoInMag, totalAmount, email) => {

  const HtmlTemplate = `
<html>
<head>
<style>
table {
width: 100%;
}
table, th, td {
border: 1px solid lightgrey;
border-collapse: collapse;
}
th, td {
padding: 2px 4px;
}
</style>
</head>

<body>


<p> Thank you ordering with us</p>
<p> Invoice Date - ${ new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}<p>
<P> Your invoice details</P>

<table>
  <thead>
      <tr>
          <th>Oder Information</th>
      </tr>
  </thead>
<tbody>
      <tr>
          <td>${tempOderInfoInMag}</td>
      </tr>
      <tr>
          <td align="right">-Total Amount  -   ${totalAmount}</td>
      <tr>
</tbody>
</table>
</body>
</html>
  `;


  var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
          user: 'mulitha.development@gmail.com',
          pass: 'Root@123'
      }
  });


  var mailOptions = {
      from: '"Majan.lk" <mulitha.development@gmail.com>',
      to: email,
      subject: 'INVOICE',
      html: HtmlTemplate,

  };

  const rmailrespond = await transporter.sendMail(mailOptions);
  if (rmailrespond) return rmailrespond;
  else return 0;

}



module.exports = router;