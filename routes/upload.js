var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
const dirname = __dirname.slice(0, __dirname.lastIndexOf('\\'));

router.post('/upload', (req, res) => {
    try {
        const filePath = `\\images\\upload\\${Date.now()}_${req.body.name}`;
        const buffer = Buffer.from(req.body.base64.split(',')[1], "base64");

        fs.writeFileSync(path.join(dirname, filePath), buffer);

        res.json(filePath);
    } catch(err) {
        res.status(500).send({err});
    }
    
});

router.get('/get-upload', (req, res) => {
    res.sendFile(path.join(dirname, req.body.path));
});

module.exports = router;