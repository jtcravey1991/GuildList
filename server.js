const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3002;

//Define Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static assets in production (heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//Initiate express session
app.use(
    session({
        secret: "secret",
        saveUninitialized: true,
        resave: true
    })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// add routes
app.use(routes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/guildlist");

//Start the server
app.listen(PORT, function() {
    console.log(`Server now listening at localhost:${PORT}.`)
})