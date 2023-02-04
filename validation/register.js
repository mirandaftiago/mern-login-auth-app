const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    const name = data.name;
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    // convert empty fields to an empty string to use on validator functions
    let isNameEmpty = !isEmpty(name) ? name : '';
    let isEmailEmpty = !isEmpty(email) ? email : '';
    let isPasswordEmpty = !isEmpty(password) ? password : '';
    let isConfirmPasswordEmpty = !isEmpty(confirmPassword) ? confirmPassword : '';
    
    // name validation
    if (Validator.isEmpty(isNameEmpty)) {
        errors.name = 'Name field is required';
    }

    // email validation
    if (Validator.isEmpty(isEmailEmpty)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(isEmailEmpty)) {
        errors.email = 'Email is invalid';
    };

    // password validations
    if (Validator.isEmpty(isPasswordEmpty)) {
        errors.password = 'Password field is required';
    };

    if (Validator.isEmpty(isConfirmPasswordEmpty)) {
        errors.confirmPassword = 'Confirm password field is required';
    };

    if (!Validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    };

    if (!Validator.equals(password, confirmPassword)) {
        errors.confirmPassword = "Passwords must match";
    };

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
