var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../db/userSchema');
require('dotenv').config();

router.post('/', (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            const splitIDX = process.env.SALT_IDX2.split(",");
            const splitpass = user.password.split("");

            for (let i = 0; i < splitIDX.length; i++) {
                splitpass.splice(splitIDX[i], 1);
            }
            const joinsaltpass = splitpass.join("");

            bcrypt.compare(req.body.password, joinsaltpass)
                .then((passChecked) => {
                    if (!passChecked) {
                        return res.status(400).send({
                            message: "Password doesn't match",
                            err: passChecked
                        });
                    }

                    const token = jwt.sign(
                        {
                            userId: user._id,
                            username: user.username
                        },
                        "RANDOM TOKEN", { expiresIn: "24h" }
                    );

                    res.status(200).send({
                        message: "Login successfully",
                        token
                    });
                })
                .catch((err) => {
                    res.status(400).send({
                        message: "Password doesn't match",
                        err
                    })
                })
        })
        .catch((err) => {
            res.status(404).send({
                message: "Email doesn't exist",
                err
            })
        })
});

module.exports = router;