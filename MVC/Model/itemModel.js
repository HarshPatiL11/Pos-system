import mongoose from "mongoose";

// Define item model schema
const itemModel = mongoose.Schema({
    name: {
        type: String,
        required: true, // Corrected from 'require' to 'required'
    },
    price: {
        type: Number, // Consider changing to Number if you're dealing with prices
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
}, { timestamps: true }); // Corrected from 'timestamp' to 'timestamps'

export default mongoose.model('items', itemModel);
