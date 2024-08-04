    import mongoose from "mongoose";
    const  billModel = mongoose.Schema({
        billID:{
            type:Number
        },

        customerName: {
            type: String,
            required: true, 
        },
        customerPhone: {
            type: Number, 
            required: true,
        },
        subTotal:{
            type: Number, 
            required: true
        },
        items:[{
            itemName:{
                type: String,
                required: true, 
            },
            itemQuantity:{
                type: String,
                required: true, 
            },
            itemPrice:{
                type: String,
                required: true, 
            }
        }],
        

        tax: {
            type: Number, 
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true, 
        },
        
        paymentMode: {
            type: String,
            required: true,
        }
    },{ timestamps: true }
    )

    export default mongoose.model("bills",billModel)