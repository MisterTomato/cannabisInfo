var express = require("express");
var router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

/* GET users listing. */
router.get("/register", function(req, res, next) {
  res.render("user/register");
});

router.get("/profile", function(req, res, next) {
  res.render("user/profile", { user: req.user });
});

router.get("/login", (req, res, next) => {
  res.render("user/login", { message: req.flash("error") });
});

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.post("/register", function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (username === "" || password === "") {
    res.render("user/register", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("user/register", { message: "The username already exists" });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashPass
      });

      newUser.save(err => {
        if (err) {
          res.render("user/register", { message: "Something went wrong" });
        } else {
          res.redirect("/profile");
        }
      });
    })
    .catch(error => {
      next(error.message);
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

module.exports = router;
