const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/signup-validation');
const validateLoginInput = require('../../validation/signin-validation');

const User = require('../../models/user-model');


router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

// @route POST api/users/signup
// @desc Signup user
// @access public

router.post('/signup', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email is already in use';
            return res.status(400).json(errors);
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                avatar,
                password: req.body.password,
                roletype: req.body.roletype,
                createdOn: Date.now(),
                contactno: req.body.contactno
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/signin
// @desc Signin user
// @access public

router.post('/signin', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = 'Invalid Credentials';
            return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {

                const payload = { id: user.id, fname: user.fname, lname: user.lname, roletype: user.roletype, avatar: user.avatar };

                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            } else {
                errors.password = 'Invalid Credentials';
                return res.status(400).json(errors);
            }
        });
    });
});

// @route GET api/users/current
// @desc get user meta data
// @access public

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        fname: req.user.fname,
        lname: req.user.lname,
        email: req.user.email,
        roletype: req.user.roletype
    });
});

module.exports = router;