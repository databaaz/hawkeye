
require('@tensorflow/tfjs-node');
import "babel-polyfill";
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const { Image, createCanvas } = require('canvas');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

//app.configure(function () {
//    app.use(allowCrossDomain);
//    app.use(express.bodyParser());
//    app.use(express.methodOverride());
//    app.use(app.router);
//    app.use(express.static(path.join(application_root, "public")));
//    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
//  });

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array()); 
app.use(express.static('public'));

app.listen(port, ()=> console.log(`Listening on port ${port}`))


// Loading the model.
var loaded_model = null
cocoSsd.load('lite_mobilenet_v2').then((model)=>{
    loaded_model = model;
    console.log("model loaded !")
});


app.post('/inference', upload.single('img'), async (req, res)=>{
    console.log('Request received !')
    res.header("Access-Control-Allow-Origin", "*");
    if(!loaded_model){
        res.send({
        pred: null,
        ftype: null,
        fsize: null,
        fres: null,
        status: 'failure'
        })
        return
    }
    let size = req.file.size + ' bytes';
    let ftype = req.file.mimetype.split('/')[1]
    // Convert image to canvas
    console.log(req.file);
    let img_b64 = req.file.buffer;
    let img = new Image();
    img.src = img_b64;
    
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        //prediction
        const predictions = await loaded_model.detect(canvas);

        let resolution = img.width + 'x' + img.height;
        res.send({
            pred: predictions,
            ftype: ftype,
            fsize: size,
            fres: resolution,
            status: 'success'
        });
    
    
})
