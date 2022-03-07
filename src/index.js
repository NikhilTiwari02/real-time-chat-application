// const { Console } = require('console');
// INSTALLED_APPS = ['corsheaders',]
// MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware',]
// CORS_ORIGIN_ALLOW_ALL = true
const express = require('express');
const path = require('path');
const app = express();
const hbs=require("hbs");
const Register=require("./models/registers");
const e = require('express');
require('./db/conn');
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// console.log(require('/db/conn'))
const port = process.env.PORT || 4000;
const static = path.join(__dirname,"../public/static");
const template = path.join(__dirname,"../templates/views");
const partial = path.join(__dirname,"../templates/partials");
// console.log(static);
 app.use(express.static(static));
 app.set("view engine","hbs");
 app.set("views",template);
 hbs.registerPartials(partial);

 
app.get("/",(req,res) => {
     res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
})
app.post("/login",async(req,res)=>{
     try{
         const email=req.body.email;
         const password=req.body.password;
         const user=await Register.findOne({email:email})
         console.log(req.body.email);
         if(user.password===password)
         {res.render("chat");
         console.log("login success");}
         else{
             res.send("Invalid password")
         }
     }catch(error){
        res.status(400).send("invalid email or password");
        console.log(error)
     }
})
app.post("/register",async (req,res)=>{
    try {
        const email=req.body.email;
        const name=req.body.Name;
        const password=req.body.password;
        const confirmpassword=req.body.cpassword;
        // console.log(email,name,password,confirmpassword);
       if(password === confirmpassword)
       { 
           const customer=Register({
             email:req.body.email,
             name:req.body.Name,
             password:req.body.password,
             confirmpassword:req.body.cpassword
           })
        const registered=await customer.save()
        console.log(registered);
        res.status(201).render("index");
       }
       else{
           res.send("password is unmatched");
           console.log("hello")
       }
    } catch (error) {
        res.send("Some error occured");
        console.log(error)
    }
})
app.get("/login",(req,res)=>{
    res.render("login");
})

// Node server which will handle socket io connections
const io=require("socket.io")(8000,{
    cors :{
        origin:"*"
    }
})
const users ={};
io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
        // audio.play();
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
    
})
//  console.log("hello");

app.listen(port, () => {
    console.log(`port is runnning at ${port}`);
});