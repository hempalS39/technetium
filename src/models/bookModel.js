const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type : String,
        require : true
    }, 

    authorName: String,

    tags: [String],
    
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    year : {
        type : Number,
        default : 2021
    },

    totalPages: {type: Number, default: 100},

    stockAvailable : Boolean

}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //


