var express = require("express");
var router = express.Router();
const Order = require("../Models/Order");
const Product = require("../Models/ProductModel");

const validationOrderInput = require("../validation/Order");
const returnMessage = require("../validation/MessageHandelling").returnMessage;
const jwt = require("jsonwebtoken");

const SECRET_KEY = require("../config/keys").secretOrKey;

router.post("/Order", async (req, res) => {
  try {
    let user = {};
    let orderItems = [];
    const token = req.header("x-jwt-token");

    if (!token || !jwt.verify(token, SECRET_KEY))
      return returnMessage.globalOne(
        false,
        404,
        "Access denied.Invalid token",
        res,
        ""
      );

    user = jwt.decode(token, SECRET_KEY);

    const { error, isValid } = validationOrderInput(req.body);
    if (isValid === false)
      return returnMessage.globalOne(false, 404, error, res, "");

    req.body.forEach((orderItem) => {
      orderItems.push(createOrderItemObject(orderItem));
    });

    let ProductUpdatedStatus = await updateProductQuantity(orderItems);
    if (ProductUpdatedStatus != "") {
      return returnMessage.globalOne(false, 401, ProductUpdatedStatus, res, "");
    }

    Order.findOne({
      userId: user.id,
    }).then(async (order) => {
      if (order) return await updateOder(order._id, orderItems, res);
      else return await createNewOder(user.id, orderItems, res);
    });
  } catch (ex) {
    return returnMessage.globalOne(
      false,
      501,
      "server side error occurred! Please try again shortly..",
      res,
      ex
    );
  }
});
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
    categoryId: orderItems.categoryId,
    discountPercent: orderItems.discountPercent,
    taxPercent: orderItems.taxPercent,
    unitPrice: orderItems.unitPrice,
    quantity: orderItems.quantity,
    createdAt: Date.now(),
  };
};

createNewOder = async (userId, orderItems, res) => {
  try {
    let order = new Order({
      userId: userId,
      orders: [{ items: orderItems }],
    });

    order.save((err, data) => {
      if (err)
        return returnMessage.globalOne(
          false,
          404,
          "Order placing error.Please try again",
          res,
          err
        );
      else
        return returnMessage.globalOne(
          true,
          200,
          "order placed sussfully",
          res,
          ""
        );
    });
  } catch (ex) {
    return returnMessage.globalOne(
      false,
      501,
      "server side error occurred! Please try again shortly..",
      res,
      ex
    );
  }
};

        





updateOder = async (userId, orderItems, res) => {
  try {
    Order.updateOne(
      { _id: userId },
      { $push: { orders: [{ items: orderItems }] } },
      { new: true },
      (err, data) => {
        if (err)
          return returnMessage.globalOne(
            false,
            404,
            "Order placing error.Please try again",
            res,
            err
          );
        else
          return returnMessage.globalOne(
            true,
            200,
            "order placed sussfully",
            res,
            ""
          );
      }
    );
  } catch (ex) {
    return returnMessage.globalOne(
      false,
      501,
      "server side error occurred! Please try again shortly..",
      res,
      ex
    );
  }
};


updateProductQuantity = async (orderItems) => {
  debugger;

  let ProductUpdatedStatus = "";
  let productIds = orderItems.map((x) => x.productId);
  let filteredProducts = await Product.find({
    _id: { $in: productIds },
    availableQuantity: { $gt: 0 },
  });

  if (filteredProducts && orderItems.length === filteredProducts.length) {
    filteredProducts.forEach(async (product, i) => {
      let customerSelectedItem = orderItems.filter(
        (item) => item.productId === product.id
      )[0];
      if (
        checkProductQuantityGettingMinius(product, customerSelectedItem) ===
        true
      ) {
        await Product.findByIdAndUpdate(
          { _id: product.id },
          {
            $set: {
              availableQuantity:
                product.availableQuantity - customerSelectedItem.quantity,
              modifiedAt: Date.now(),
            },
          },
          { new: true, useFindAndModify: false },
          (err, data) => {
            if (err) ProductUpdatedStatus = err;
          }
        );
      }
    });
    return ProductUpdatedStatus;
  } else return "Not enaught stock to place order.Please try again shrotly";
};

checkProductQuantityGettingMinius = (product, customerSelectedItem) => {
  if (product.availableQuantity - customerSelectedItem.quantity >= 0)
    return true;
  else return false;
};

module.exports = router;
