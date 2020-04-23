var express = require("express");
var router = express.Router();
var userModel = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require("../config");
const redis = require("redis");
const redisClient = redis.createClient();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//To register a new user
router.post("/register", function (req, res, next) {
  userModel.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return next(err);
    } //USER NOT FOUND
    if (user == null) {
      //NEW USER --SO INSERT

      userModel.create(req.body, function (err, user) {
        if (err) {
          return next(err);
        }
        res.status(200);
        res.json(user);
      });
    } else {
      res.send(409, "User Already Registered");
    }
  });
});

router.post("/authenticate", function (req, res, next) {
  console.log("In authenticate");
  console.log(req.body);

  userModel.findOne({ email: req.body.email }, function (err, user) {
    if (err) throw err;
    console.log(user);

    if (user === null) {
      res.send(401, "Authentication failed. User not found.");
    } else {
      if (req.body.password === user.password) {
        console.log("password matched" + user);
        var token = jwt.sign({ uid: user._id }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });

        redis.set(
          user._id,
          JSON.stringify({
            token: token,
          }),
          redis.print
        );

        res.status(200);
        res.json({ user: user, token: token });
      } else {
        res.send(401, "Authentication failed. Wrong password.");
      }
    }
  });
});

module.exports = router;
