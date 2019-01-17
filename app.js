var express = require("express"),
    app = express(),
    nodemailer = require("nodemailer"),
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

app.post("/contact",function(req,res){
    let mailOpts,smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: "cfols92@gmail.com",
          pass: "Thunnder1"
        }
    });
    mailOpts = {
        from: req.body.email,
        to: "cfols92@gmail.com",
        subject: 'New message from contact form at chrisfolsom.herokuapp.com',
        text: `${req.body.name} (${req.body.email}) from ${req.body.company} says: ${req.body.content}`
    };
    smtpTrans.sendMail(mailOpts,function(err,res){
        if(err){
            console.log(err);
            // res.render("contact-failure");
        } else {
            res.redirect("/home");
            //res.render("contact-success");
        }
    });
});

app.listen(process.env.PORT,process.env.IP);