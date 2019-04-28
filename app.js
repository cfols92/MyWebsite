var express = require("express"),
    app = express(),
    nodemailer = require("nodemailer"),
    bodyParser = require("body-parser");

require('dotenv').config();
    
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
    res.send("Sorry, this page does not exist. Please return to home!")
});

app.post("/contact",function(req,res){
    let mailOpts,smtpTrans;

    // create a transporter object named smtpTrans
    // this transporter object can send mail
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        // port: 465,
        // secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
    });

    mailOpts = {
        from: req.body.email,
        to: process.env.GMAIL_USER,
        subject: 'New message from contact form at chrisfolsom.herokuapp.com',
        text: `${req.body.name} (${req.body.email}) from ${req.body.company} says: ${req.body.content}`
    };

    // use the transporter object to send mail
    smtpTrans.sendMail(mailOpts,function(err,response){
        if(err){
            console.log(err);
            //res.render("contact-failure");
            res.send("Contact failure");
        } else {
            res.redirect("/home");
            //res.render("contact-success");
        }
    });
});

app.listen(process.env.PORT,process.env.IP);

// app.listen(3000,function(){
//     console.log("Now serving");
// });