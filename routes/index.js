const path = require("path");
const router = require("express").Router();
const authenticationRoutes = require("./authentication");

router.use("/authentication", authenticationRoutes);

// directs to client if no api route hit
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;