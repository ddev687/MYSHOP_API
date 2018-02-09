const mongoose=require("mongoose");

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/MyShop").then(()=>{console.log("Connnected")}).catch(e=>console.log(e));

module.export={
    port:3000,
    mongoose
}