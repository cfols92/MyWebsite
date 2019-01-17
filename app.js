var express = require("express"),
    app = express();
    
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

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

app.listen(process.env.PORT,process.env.IP);