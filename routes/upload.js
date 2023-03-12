var express = require('express');
var router = express.Router();
var Upload = require('../db/uploadSchema');
var fs = require('fs');
const path = require('path');
const dirname = __dirname.slice(0, __dirname.lastIndexOf('\\'));

router.post('/upload', async (req, res) => {
    try {
        const filePath = `\\images\\upload\\${Date.now()}_${req.body.name}`;
        const buffer = Buffer.from(req.body.base64.split(',')[1], "base64");
        fs.writeFileSync(path.join(dirname, filePath), buffer);

        const upload = new Upload({
            user: '64074193b463bf5f1a865e98',
            name: req.body.name,
            currentDate: req.body.currentDate,
            currentTime: req.body.currentTime,
            caption: req.body.caption
        });

        const result = await upload.save();
        res.status(201).send({
            message: "Upload successfully",
            filePath: filePath,
            result
        });
    } catch (err) {
        res.status(500).send({ err });
    }
});

router.get('/get-upload', (req, res) => {
    res.sendFile(path.join(dirname, req.body.path));
});

module.exports = router;