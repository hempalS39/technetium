const authorModel = require("../models/authorModel")
const publisherModel = require('../models/publisherModel')
const bookModel= require("../models/bookModel")



const createBook= async function (req, res) {
    let book = req.body
    
    if(!book.author) return res.send({msg : "pls provide author ID"});
    if(!book.publisher) return res.send({msg : "pls provide publisher ID"});

    let author = await authorModel.findById(book.author)
    if(author == null) return res.send({msg : "no author is present with this Id"});
    
    let publisher = await publisherModel.findById(book.publisher)
    if(publisher == null) return res.send({msg : "no publisher found with this ID"})

    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}


const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}


const getBooksWithAuthorDetails = async function (req, res) {
    let Books = await bookModel.find().populate('author').populate('publisher');
    res.send({data: Books})

}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
