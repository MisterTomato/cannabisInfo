var express = require("express");
var router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

router.get("/register", function(req, res, next) {
  res.render("user/register");
});

router.get("/login", (req, res, next) => {
  res.render("user/login", { message: req.flash("error") });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.post("/register", function(req, res, next) {
  const { username, password, email } = req.body;

  if (username === "" || password === "") {
    res.render("user/register", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("user/register", { message: "The username already exists" });
        return;
      } else {
        const hashPass = bcrypt.hashSync(password, saltRounds);

        const newUser = new User({
          username,
          email,
          password: hashPass
        });

        newUser.save((err, user) => {
  
          if (err) {
            res.render("user/register", {
              message: "Something went wrong" + err
            });
          } else {
            res.redirect(`/auth/login`);
          }
        });
      }
    })
    .catch(error => {
      next(error.message + "register route post");
      res.redirect("/");
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

module.exports = router;
