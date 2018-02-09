const mongoose=require('mongoose');
const validator=require('validator');

const Category=new mongoose.Schema({
    Category_Name:{
        type:String,
        trim:true,
        required:true,
    },
    Category_Description:{
        type:String,
        trim:true,
        required:true
    },
});


module.exports=mongoose.model("Category",Category);
