import mongoose from "mongoose";

const itemModel = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    }, 
    image:{
        type:String   
    }
},{timestamp:true})

export default mongoose.model('items',itemModel)