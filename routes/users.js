const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const router = express.Router();
const jwt = require('jsonwebtoken');


//TODO add check for user already exists
router.post('/new_user', (req, res, next) => {
    console.log(req.body['email']);
    console.log("newuser");
    const email = req.body['email'];
    const plaintextPassword = req.body['password'];
    const firstName = req.body['name'];

    bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        const user = new User(email, hash, firstName);
        user.saveToDB().then(()=>{
            res.status(200).json({
                message: 'New user created'
            });
        }, ()=>{
            res.status(409).json({
                message: 'User already exists'
            });
        });
      });
});

//TODO add check for user already exists
router.post('/log_in', (req, res, next) => {
    const email = req.body['email'];
    const password = req.body['password'];
    console.log(email);
    User.findByEmail(email).then((userFromDb) => {
        //compare password to one in DB, return auth token if match, error if not
        bcrypt.compare(password, userFromDb['password'], function(err, match) {
            //generate token
            if (match == true) {
                // create token
                const token = jwt.sign(
                { user_id: userFromDb['id']
                }, process.env.JWT_SECRET, {expiresIn : '1h'});
                //calculate token expiration in seconds since Epoch
                const d = new Date();
                const secondsNow = Math.floor(d.getTime() / 1000);
                const expiresAt = secondsNow + 3600;
                console.log(expiresAt);
                res.status(200).json({
                    token : token,
                    expiresAt : expiresAt,
                    name: userFromDb['name']
                });
            } else {
                res.status(500).json({
                    message: 'Invalid credentials'
                });
            }
        });

    } , () => {res.status(500).json({//in case of reject, when did not find user
            message: 'Invalid credentials'
        });} 
    );
 
});

module.exports = router;