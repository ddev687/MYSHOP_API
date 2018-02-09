const mongoose=require('mongoose');
const validator=require('validator');
const Schema = mongoose.Schema;

const Order=new Schema({
    Product_Id:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true

    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'Subcategory',
        required:true
    },
    Product_Price:{
        type:String,
        trim:true,
        required:true
    },
    Product_Stock:{
        type:String,
        trim:true,
        required:true
    },
    Product_Description:{
        type:String,
        trim:true,
        required:true
    },
    Product_Image:{
        type:String,
        trim:true,
        required:true
    }
});


module.exports=mongoose.model("Order",Order);
