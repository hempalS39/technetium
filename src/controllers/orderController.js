const OrderModel = require('../models/orderModel');
const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');

const createOrder = async function (req,res) {
    let requestHeader = req.headers["isFreeAppUser"];
    if(!requestHeader) requestHeader = req.headers["isfreeappuser"];

    const data = req.body;
    const user = await UserModel.findById(req.body.userId);
    if(!user) return res.status(404).send({status : false , msg : "no user with this Id"})

    const product = await ProductModel.findById(req.body.productId)
    if(!product) return res.status(404).send({status : false , msg : "no product with this Id"})
   
    //if user is not a freeAppUser
    if(requestHeader == "false") {
        if(user.balance < product.price) return res.status(400).send({status : false, msg : "user dont have sufficient balance"})
        let userBalance = user.balance - product.price;
        data["amount"] = product.price;
        await userModel.findOneAndUpdate({_id : req.body.userId} , {balance : userBalance} ,{new : true})
    }

    data["isFreeAppUser"] = requestHeader;
    const orderData = await OrderModel.create(data);

    res.status(201).send({status : true, data : orderData})
}

module.exports.createOrder =createOrder