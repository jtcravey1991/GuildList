const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();
const path = require("path");

// login route
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

// user creation route
router.post("/signup", (req, res) => {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then((dbUser) => {
        res.json({
            email: dbUser.email
        });
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

// logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.status(200).sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;