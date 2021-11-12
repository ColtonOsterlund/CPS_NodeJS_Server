const express = require('express');
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const crypto = require('crypto')
const async = require('async')
var url = require('url')
const { v4: uuidv4 } = require("uuid");
const nodemailer = require('nodemailer');
const validatePhoneNumber = require('validate-phone-number-node-js');
const { Console } = require('console');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('short'));
dotenv.config()
app.use(cors());


app.get("/", authorizeUser, (req, res) => {
  res.send("ROOT")
})



//using PORT to run on Heroku. Use localhost for any local testing
app.listen(process.env.PORT, () => {
  console.log("Server is up and listening on " + PORT)
})