const express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

// make all ".env" variables avaiable in "process.env"
// require('dotenv').config();
    
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.redirect("home");
});

app.get("/home",function(req,res){
    res.render("home");
});

app.get("/about",function(req,res){
    res.render("about");
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("*",function(req,res){
    res.status(404).send("Sorry, this page does not exist. Please return to home!")
});

app.post("/contact",(req,res) => {

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: 'cfols92@gmail.com',
    from: req.body.email,
    subject: 'New message from contact form at chrisfolsom.herokuapp.com',
    text: `${req.body.name} (${req.body.email}) from ${req.body.company} says:\n${req.body.content}`,
    //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);

    res.redirect("/home");
});

app.listen(process.env.PORT,process.env.IP);

// app.listen(3000,() => {
//     console.log("Now serving");
// });