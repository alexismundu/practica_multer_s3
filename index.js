const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const app = express()
const port = 3000

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();
app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'testbucket20210429',
        acl: 'public-read',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.post('/upload', upload.single('img'), function (req, res) {
    const info = req.body;
    const image = req.file;
    console.log(info, image)
    res.send("Uploaded!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
