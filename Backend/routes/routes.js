const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const signUpSchemaCopy = require("../models/SignUpModels.js");

advancedPassword = (string) => {
    var advancedpassword = "";
    string.split("").forEach((element) => {
        if (element == "z") advancedpassword += "a";
        else if (element == "Z") advancedpassword += "A";
        else if (element == "9") advancedpassword += "0";
        else advancedpassword += String.fromCharCode(element.charCodeAt(0) + 1);
    });
    return advancedpassword;
};

sortedPassword = (string) => {
    return string.split("").sort().join("");
};

router.post("/signup", (request, response) => {
    signUpSchemaCopy.find(
        { email: request.body.email },
        (err, previousUser) => {
            if (err) {
                response.send({
                    success: false,
                    message: "Server error occoured.",
                });
            } else if (previousUser.length > 0) {
                response.send({
                    success: false,
                    message:
                        "Email already exists,try again with a different one.",
                });
            } else {
                // encrypting the passwords
                const saltPassword = bcrypt.genSaltSync(10);
                const securePassword = bcrypt.hashSync(
                    sortedPassword(request.body.password),
                    saltPassword
                );
                const securePassword2 = bcrypt.hashSync(
                    advancedPassword(request.body.password),
                    saltPassword
                );

                const signedUpUser = new signUpSchemaCopy({
                    userName: request.body.userName,
                    email: request.body.email,
                    password: securePassword,
                    password2: securePassword2,
                });
                // if any field is empty this will show error
                signedUpUser.save((err) => {
                    if (err) {
                        response.send({
                            success: false,
                            message: "Server error occoured.",
                        });
                    } else {
                        response.send({
                            success: true,
                            message: "Successfully signed in.",
                        });
                    }
                });
            }
        }
    );
});

router.post("/signin", (request, response) => {
    const signedUpUser = {
        email: request.body.email,
        password: request.body.password,
    };
    if (!signedUpUser.email.length) {
        response.send({
            success: false,
            message: "Email can't be empty.",
        });
    }
    if (!signedUpUser.password.length) {
        response.send({
            success: false,
            message: "Password can't be empty.",
        });
    }

    signUpSchemaCopy.find({ email: signedUpUser.email }, (err, users) => {
        if (err) {
            response.send({
                success: false,
                message: "Server error occoured.",
            });
        } else if (users.length === 0) {
            response.send({
                success: false,
                message: "You have to sign up first.",
            });
        } else if (users.length > 1) {
            response.send({
                success: false,
                message: "Invalid email, try again with a different one.",
            });
        } else {
            const user = users[0];

            const isvalid = bcrypt.compareSync(
                sortedPassword(signedUpUser.password),
                user.password
            );
            const isvalid2 = bcrypt.compareSync(
                signedUpUser.password,
                user.password2
            );
            if (isvalid || isvalid2) {
                response.send({
                    success: true,
                    message: `Valid sign in ${user.userName}!`,
                });
            } else {
                response.send({
                    success: false,
                    message: "Invalid Password.",
                });
            }
        }
    });
});

module.exports = router;
