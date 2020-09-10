var express = require("express");
var router = express.Router();
let password = require("../AppHelp/Password").password;
let userValidations = require("../validation/User").userValidations;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const returnMessage = require("../validation/MessageHandelling").returnMessage;
const User = require("../Models/User");
const { route } = require("./Order");

const SECRET_KEY = require("../config/keys").secretOrKey;

router.get("/User/:email/:pwd", (req, res, next) => {
  try {
    const validationCheck = userValidations.validateSignIn(
      req.params.email,
      req.params.pwd
    );

    if (validationCheck.isValid === false)
      return returnMessage.userLogin(
        validationCheck.isValid,
        validationCheck.Email,
        validationCheck.Password,
        validationCheck.Description,
        "",
        400,
        res
      );

    User.findOne({
      email: req.params.email,
      password: password.encrypt(req.params.pwd),
    }).then((user) => {
      if (user) {
        let token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
        return returnMessage.userLogin(
          true,
          true,
          true,
          "User present",
          token,
          200,
          res
        );
      } else
        return returnMessage.userLogin(
          false,
          false,
          false,
          "User does not exist",
          "",
          404,
          res
        );
    });
  } catch (ex) {
    return returnMessage.userLogin(
      false,
      false,
      false,
      "server side error occurred! Please try again shortly..",
      "",
      501,
      res
    );
  }
});

router.post("/User", async (request, res) => {
  try {
    const validationCheck = userValidations.validateSignUp(request.body);
    if (validationCheck.isValid === false)
      return returnMessage.user(
        validationCheck.isValid,
        validationCheck.fName,
        validationCheck.lName,
        validationCheck.email,
        validationCheck.mobileNum,
        validationCheck.pwd,
        validationCheck.confirmPwd,
        validationCheck.Description,
        "",
        400,
        res,
        ""
      );

    User.findOne({
      email: request.body.email,
    }).then((user) => {
      if (user)
        return returnMessage.user(
          false,
          validationCheck.fName,
          validationCheck.lName,
          validationCheck.email,
          validationCheck.mobileNum,
          validationCheck.pwd,
          validationCheck.confirmPwd,
          "User already present",
          "",
          400,
          res,
          ""
        );
      else {
        let user = new User({
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          email: request.body.email,
          mobileNumber: request.body.mobileNum,
          password: password.encrypt(request.body.password),
          usertype: request.body.usertype,
        });

        user.save((err, data) => {
          if (err)
            return returnMessage.user(
              false,
              validationCheck.fName,
              validationCheck.lName,
              validationCheck.email,
              validationCheck.mobileNum,
              validationCheck.pwd,
              validationCheck.confirmPwd,
              "User registring error.Please try agin",
              "",
              400,
              res,
              ""
            );

          let token = jwt.sign({ id: data._id, email: data.email }, SECRET_KEY);
          return returnMessage.user(
            true,
            validationCheck.fName,
            validationCheck.lName,
            validationCheck.email,
            validationCheck.mobileNum,
            validationCheck.pwd,
            validationCheck.confirmPwd,
            "User registered Successfuly",
            token,
            200,
            res,
            data.firstName
          );
        });
      }
    });
  } catch (ex) {
    return returnMessage.user(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      "server side error occurred! Please try again shortly..",
      "",
      501,
      res,
      ""
    );
  }
});

router.post("/sendlink", (req, res) => {
  try {
    User.findOne({ email: req.body.email })
      .then((user) => res.send("User Found"))
      .then(() => {
        SendMail("sammanmra008@gmail.com");
      })
      .catch((err) =>
        res.status(500).send({
          isValid: false,
          description: err,
        })
      );
  } catch (e) {
    return returnMessage.user(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      e
    );
  }
});

router.put('/forgotpassword', (req, res) => {
    try {
      const userPassword = {
        password: password.encrypt(request.body.password)
      }
      User.findOneAndUpdate({email: req.body.email}, { $set: userPassword }, { new: true, useFindAndModify: false })
        .then((user) => res.send("Password Updated"))
        .catch((err) =>
          res.status(500).send({
            isValid: false,
            description: err,
          }));
    }catch(e) {
        return returnMessage.user(
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            e
          );
    }
})

function SendMail(receiver) {
  var smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "xxx",
      pass: "xxx",
    },
  };
  var transporter = nodemailer.createTransport(smtpConfig);

  var mailOptions = {
    from: '"Fred Foo ?" trainbooking096@gmail.com',
    to: receiver,
    subject: "Hello ✔",
    text: "Hello world ?",
    html: "<a href='http://localhost:3000/forgotpassword'>Reset</a>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    return console.log(info.response);
  });
}

module.exports = router;
