var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
require('dotenv').config();
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var AWS = require('aws-sdk');

const config = {
    accessKeyId: "AKIA4NLF33BOVE2RM3PD",
    secretAccessKey: "",
    region: "us-west-2",
    adminEmail: "j.s.risberg@gmail.com"
};

var ses = new AWS.SES(config);

// Declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

const chargeHandler = async (req, res, next) => {
    const {token} = req.body;
    const {currency, amount, description} = req.body.charge;

    try {
        const charge = await stripe.charges.create({
            source: token.id,
            amount,
            currency,
            description
        });
        if (charge.status === 'succeeded') {
            req.charge = charge;
            req.shipped = shipped;
            req.description = description;
            next();
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
};

const emailHandler = (req, res) => {
    const {charge} = req;

    ses.sendEmail({
        Source: config.adminEmail,
        Return: config.adminEmail,
        Destination: {
            ToAddresses: [config.adminEmail]
        },
        Message: {
            Subject: {
                Data: 'Order Details - Amplify Agora'
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: '<h3>Your order was processed!</h3>'
                }
            }
        }
    }, (err, data) => {
        if (err) {
            return res.status(500).json({error: err})
        }
        res.json({
            message: 'Order processed successfully!',
            charge,
            data
        });
    })
};

app.post('/charge', chargeHandler, emailHandler);

app.listen(3000, function () {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
