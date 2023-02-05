const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

// register and login validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// User model
const User = require('../../models/User');

router.get('/', (req, res) => {
    res.status(200).json('Get route successfully created');
});

// POST api/users/register
// User Registration
router.post('/register', (req, res) => {
    // form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    };
    
    // find user by email
    User.findOne({
        email: req.body.email
    }).then( user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // hash password before persist on database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// POST api/users/login
// user login and return JWT token
router.post('/login', (req, res) => {
    // form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    };

    const email = req.body.email;
    const password = req.body.password;
    
    // find user by email
    User.findOne({ email }).then(user => {
        // check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
        }
        // check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matches
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    process.env.SECRETKEY,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: 'Password incorrect' });
            }
        });
    });
});

module.exports = router;