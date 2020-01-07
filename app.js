var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
    
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

    // let mailOpts,smtpTrans;

    // // create a transporter object named smtpTrans
    // // this transporter object can send mail
    // smtpTrans = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //       user: process.env.GMAIL_USER,
    //       pass: process.env.GMAIL_PASS
    //     }
    // });

    // mailOpts = {
    //     from: req.body.email,
    //     to: process.env.GMAIL_USER,
    //     subject: 'New message from contact form at chrisfolsom.herokuapp.com',
    //     text: `${req.body.name} (${req.body.email}) from ${req.body.company} says: ${req.body.content}`
    // };

    // // use the transporter object to send mail
    // smtpTrans.sendMail(mailOpts,function(err,response){
    //     if(err){
    //         console.log(err);
    //         //res.render("contact-failure");
    //         //res.send("Contact failure");
    //     } else {
    //         // alert("Thank you for your message! I will get back to you as soon as possible.");
    //         res.redirect("/home");
    //         //res.render("contact-success");
    //     }
    // });
});

app.listen(process.env.PORT,process.env.IP);

// app.listen(3000,function(){
//     console.log("Now serving");
// });