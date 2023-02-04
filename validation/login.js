const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    const email = data.email;
    const password = data.password;

    // convert empty fields to an empty string to use on validator functions
    let isEmailEmpty = !isEmpty(email) ? email : "";
    let isPasswordEmpty = !isEmpty(password) ? password : "";
    
    // email validation
    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    };

    // password validation
    if (Validator.isEmpty(password)) {
        errors.password = "Password field is required";
    };

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
