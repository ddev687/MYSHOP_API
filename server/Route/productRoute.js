exports.route=(app)=>{
    const ProductContoller=require("../Controller/Product.Controller");

    app.get('/getProduct',ProductContoller.getProduct);
    app.get('/getSubcategory',ProductContoller.getSubcategory);
    app.get('/getCategory',ProductContoller.getCategory);
    app.get('/getProductOffer',ProductContoller.getProductOffer);

    app.post('/add/Product',ProductContoller.addProduct);
    app.post('/add/subcategory',ProductContoller.addSubcategory);
    app.post('/add/Category',ProductContoller.addCategory);
    app.post('/add/productOffer',ProductContoller.addProductOffer);
}