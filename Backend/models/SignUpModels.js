const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    // password encrypting is necessary before storing it in database
    // to store the password in sorted order as this will handle all the cases except one
    password: {
        type: String,
        required: true,
    },

    // to store the password in which each each char is advanced by one
    password2: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("mydatabase", signUpSchema);
