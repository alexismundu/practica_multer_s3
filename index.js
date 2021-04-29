const express = require('express')
const path = require('path');
require('dotenv').config()
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");


const s3 = new AWS.S3({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
});

const app = express()
const port = 3000

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId,
    region: 'us-east-1'
});


var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'hhhcouk',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});
//Const s3 = new aws.S3();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
