const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: "Please enter a valid email address.",
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        trim: true,
        required: "Please enter a password",
        validate: [({ length }) => length >= 6, "Password should be longer."]
    }
});

// check user password for login
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

// hashes password for new user
UserSchema.pre("save", function (next) {
    if (this.isNew) {
        this.password = bcrypt.hashSync(
            this.password,
            bcrypt.genSaltSync(10),
            null
        );
        next();
    } else {
        next();
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;