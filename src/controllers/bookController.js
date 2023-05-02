const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel = require('../models/authorModel') 
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")


const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}



const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find()
    if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
    else res.send({msg: "No books found" , condition: false})
}



const getBooksByChetanBhagat = async function (req , res) {
    const author = await AuthorModel.findOne({author_name : "Chetan Bhagat"});
    if(author == null) return res.send({msg : "no author found with this name"});
    const id = author.author_id;

    const books = await BookModel.find({author_id : id});
    res.send({msg : books});
}



//find author of "Two states" return auther name and udated price
const updateBooks= async function (req, res) {
    const result = {}
    const book = await bookModel.findOneAndUpdate({name : "Two states"},{$set : {price : 100}});


    const author = await authorModel.findOne({author_id : book.author_id})
    result.authorName = author.author_name;

    result.price = book.price;
    
     res.send( { msg: result})
}



// Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 
// bookModel.find( { price : { $gte: 50}  ,  price: {$lte: 100} } ) // WRONG
// bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})..run a map(or forEach) loop and get all the authorName corresponding to the authorId’s ( by querying authorModel)

const findBooks = async function (req , res) {
    let books = await bookModel.find({price : {$gte : 50 , $lte : 100}}).select({author_id : 1 , _id : 0});
   
    let author = []
    for(let i=0; i<books.length; i++){
       let authorName =  await authorModel.findOne({author_id : books[i].author_id}).select({author_name : 1})
        author.push(authorName)
    }
    

    res.send({msg : author})
}







module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksByChetanBhagat= getBooksByChetanBhagat
module.exports.updateBooks= updateBooks
module.exports.findBooks= findBooks
