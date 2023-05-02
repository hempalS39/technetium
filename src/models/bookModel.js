const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,

    author: {
        type: ObjectId,
        ref: "FamousAuthor"
    }, 

    price: Number,

    rating: Number,

    publisher: {
        type: ObjectId,
        ref: "FamousPublisher"
    },


}, { timestamps: true });


module.exports = mongoose.model('FamousBook', bookSchema)
