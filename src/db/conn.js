const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/chatregistration",{
     useNewUrlParser:true,
     useUnifiedTopology:true,
     // useCreateIndex:true
}).then(()=>{
    console.log("succesfully Connected");
}).catch((e)=>{
     console.log(e);
})
