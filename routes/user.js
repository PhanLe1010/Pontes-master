var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var User = require("../models/user");



// router.post('/user', function (req, res, next) {
//     var user = new User({
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password, 10),
//         fullName: req.body.fullName
//     });
//     user.save(function(err, result) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//         res.status(201).json({
//             message: 'User created',
//             obj: result
//         });
//     });
// });


router.post('/user/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secretIsNothingLol', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token
        });
    });
});

module.exports = router;
