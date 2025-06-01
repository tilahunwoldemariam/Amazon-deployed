
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");



const dotenv = require('dotenv');
dotenv.config();

// import express and cors
const express = require('express');
const cors = require('cors');
const { setGlobalOptions } = require("firebase-functions");

// initialized stipe
const stripeKey = process.env.STRIPE_KEY; 
const stripe = require('stripe')(stripeKey)


// initialized express app
const app = express();
setGlobalOptions({maxInstances: 10})

// the middlewares
app.use(cors({origin: true}))
app.use(express.json())


// end points
app.get('/', (req, res)=>{


    res.status(200).json({  message: "success" }
    )
})

// endpoint for payment
app.post('/payment/create', async (req, res)=>{

    const total = req.query.total
    
    if(total > 0){
     
        const paymentIntent = await stripe.paymentIntents.create(
            {
            amount: total,
            currency: "usd"
        })

        console.log(paymentIntent)
         
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
            message: "payment intent created successfully"

        })


    }else {
       
        res.status(403).json({message: "payment amount must be greater than 0"})


    }

})




// our firebase functions(backend) is now listening 
exports.api = onRequest(app)

