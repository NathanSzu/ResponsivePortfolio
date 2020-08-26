require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const nodemailer = require('nodemailer')

// Nodemailer config
let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// route to handle contact form submission with nodemailer
app.post('/send', (req, res) => {
  console.log(req.body)
  var { name, email, message } = req.body;
  let mailOptions = {
    from: `"${name}" <${email}>`, //'"Fred Foo 👻" <foo@example.com>', sender address
    to: "nathan.szurek@yahoo.com", // list of receivers
    subject: "Portfolio Contact Form",
    text: `${message}`, // plain text body
  }

  transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
          console.log('Error')
      } else {
          console.log('Email Sent')
      }
  });
    res.json('Email Sent');
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});