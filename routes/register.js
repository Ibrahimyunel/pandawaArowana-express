var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../db/userSchema');
require('dotenv').config();

router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            const splitSALT = process.env.SALT_ADD.split(",");
            const splitIDX = process.env.SALT_IDX.split(",");
            const splitpass = hashedPassword.split("");

            for (let i = 0; i < splitIDX.length; i++) {
                var x = Math.floor((Math.random() * 70) + 1);
                splitpass.splice(splitIDX[i], 0, splitSALT[x]);
            }
            const joinsaltpass = splitpass.join(""); 

            const user = new User({
                username: req.body.username,
                whatsapp: req.body.whatsapp,
                email: req.body.email,
                password: joinsaltpass
            });

            user.save()
                .then((result) => {
                    res.status(201).send({
                        message: "Registration successfully",
                        result
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Registration failed",
                        err
                    })
                })
        })
        .catch((err) => {
            res.status(500).send({
                message: "password was not hashed",
                err
            })
        })

})

module.exports = router;