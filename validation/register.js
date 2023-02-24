const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){
    const { name = '', email = '', password = '', confirmPassword = '' } = data;
    const errors = {};
    
    Validator.isEmpty(name) && (errors.name = 'Name field is required');
    Validator.isEmpty(email) && (errors.email = 'Email field is required');
    !Validator.isEmail(email) && (errors.mail = 'Email is invalid');
    Validator.isEmpty(password) && (errors.password = 'Password field is required');
    !Validator.isLength(password, { min: 6, max: 30 }) && (errors.password = 'Password must be at least 6 characters');
    !Validator.equals(password, confirmPassword) && (errors.confirmPassword = 'Password must match');
    Validator.isEmpty(confirmPassword) && (errors.confirmPassword = 'Confirm password field is required');

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
