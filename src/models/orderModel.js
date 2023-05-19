const mongoose = require('mongoose');
// const ObjectId =  mongoose.Schema.Types.ObjectId;


const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId ,
    productId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    isFreeAppUser: Boolean,

},{timestamps : true})

module.exports = mongoose.model('Neworder' , orderSchema)