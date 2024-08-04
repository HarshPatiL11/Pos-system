import mongoose from "mongoose";

const itemModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number, 
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image:{
        data:{
            type:Buffer,
            required:false
        },
        contentType:{
            type:String,
            required:false
        }
    }
}, { timestamps: true }); 

export default mongoose.model('items', itemModel);
