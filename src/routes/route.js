const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//route for  Authors
router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorData", authorController.getAuthorData)

//route for books
router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)

router.get('/getBooksByChetanBhagat' , BookController.getBooksByChetanBhagat)

router.put("/updateBooks", BookController.updateBooks)

router.get("/findBooks", BookController.findBooks)



//MOMENT JS
const moment = require('moment');
router.get("/dateManipulations", function (req, res) {
    
    // const today = moment();
    // let x= today.add(10, "days")

    // let validOrNot= moment("29-02-1991", "DD-MM-YYYY").isValid()
    // console.log(validOrNot)
    
    const dateA = moment('01-01-1900', 'DD-MM-YYYY');
    const dateB = moment('01-01-2000', 'DD-MM-YYYY');

    let x= dateB.diff(dateA, "days")
    console.log(x)

    res.send({ msg: "all good"})
})

module.exports = router;