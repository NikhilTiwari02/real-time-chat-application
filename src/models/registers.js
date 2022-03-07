const mongoose=require("mongoose");
const schema=new mongoose.Schema({
     email:{
        type:String,
        required :true,
        unique :true
     },
    name:{
        type:String ,
        required :true
    },
  password:{
      type:String,
      required:true
  },
  confirmpassword:{
     type:String,
     required :true
  }
})
const Register= new mongoose.model("Register",schema);
module.exports=Register;