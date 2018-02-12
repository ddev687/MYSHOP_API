const mongoose=require('mongoose');
const validator=require('validator');
const Schema = mongoose.Schema;

const Subcategory=new Schema({
    Subcategory_Name:{
        type:String,
        trim:true,
        required:true,
    },
    Subcategory_Description:{
        type:String,
        trim:true,
        required:true
    },
    Subcategory_Image:{
        type:String,
        trim:true
    },
    Category_Id:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    }
});


module.exports=mongoose.model("Subcategory",Subcategory);
