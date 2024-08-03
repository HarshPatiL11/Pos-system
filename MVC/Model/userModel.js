import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    verified:{
        type:Boolean,
        default: false
    }
},{timestamps:true}
    

)   

export default mongoose.model("user",userSchema)