const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data){
    const { email = '', password = '' } = data;
    const errors = {};
    
    Validator.isEmpty(email) && (errors.email = 'Email field is required');
    !Validator.isEmail(email) && (errors.email = 'Email is invalid');
    Validator.isEmpty(password) && (errors.password = 'Password field is required');

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
