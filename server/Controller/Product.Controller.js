const Product=require('../Model/Product.Modal');
const Category=require('../Model/Product_Category.Modal');
const Subcategory=require('../Model/Product_Subcategory.Modal');
const ProductOffer=require('../Model/Product.Offer.Modal');
const bodyParser=require('body-parser');
const express=require('express');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const {mongoose,port}=require('../../config/config');



let app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());


exports.addProduct=(req,res)=>{
    let newProduct=new Product({
        Product_Name:req.body.product_name,
        Category_Id:req.body.category_id,
        Subcategory_Id:req.body.subcategory_id,
        Product_Price:req.body.product_price,
        Product_Stock:req.body.product_stock,
        Product_Description:req.body.product_description,
        Product_Image:req.body.product_Image,
    });
    newProduct.save().then(product=>res.send(product)).catch(e=>next(e));
};

exports.getProduct=(req,res)=> {
    var category=req.param.categoryid;
    console.log(category);
    Product.find({Category_id:category}).then(product => {
        /*var data={};
        product.forEach(a=>{
            data={
                Product_Name:a.Product_Name,
                Product_Image:a.Product_Image
            }
        });*/
        res.json(product)
    }).catch(e => console.log(e));
}


exports.addSubcategory=(req,res)=>{
    let newSubcategory=new Subcategory({
        Subcategory_Name:req.body.subcategory_name,
        Subcategory_Description:req.body.subcategory_description,
        Category_Id:req.body.category_id
    });
    newSubcategory.save().then(subcategory=>res.send(subcategory)).catch(e=>next(e));
};

exports.getSubcategory=(req,res)=>{
    Subcategory.find().then(subcategory=>res.send(subcategory)).catch(e=>next(e));
}

exports.addCategory=(req,res)=>{
    let newCategory=new Category({
        Category_Name:req.body.category_name,
        Category_Description:req.body.category_description,
    });
    newCategory.save().then(category=>res.send(category)).catch(e=>next(e));
};

exports.getCategory=(req,res)=>{
    Category.find().then(category=>res.json(category)).catch(e=>next(e));
}

exports.addProductOffer=(req,res)=>{
    let newProductOffer=new ProductOffer({
        Product_Name:req.body.product_name,
        Product_Company:req.body.product_company,
        Category_Id:req.body.category_id,
        Subcategory_Id:req.body.subcategory_id,
        Product_Price:req.body.product_price,
        Product_Stock:req.body.product_stock,
        Product_Description:req.body.product_description,
        Product_Image:req.body.product_Image,
        Product_Discount:req.body.product_offer
    });
    newProductOffer.save().then(product=>res.send(product)).catch(e=>next(e));
};

exports.getProductOffer=(req,res)=>{
    ProductOffer.find().then(product=>{
        res.json(product)}).catch(e=>console.log(e));
};