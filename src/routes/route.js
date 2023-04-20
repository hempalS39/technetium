const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const commonFile = require('./common')
const myUnderscore = require('underscore')

router.get('/test-me', function (req, res) {
    res.send('This should be working!')
});


let moviesArr = ["Rang de basantiz", "The shining", "Lord of the rings", "Batman begins"] 

// --------- problem -1
router.get('/movies', function (req, res) {

    res.send(moviesArr)
});

//----------problem 2 & 3
router.get('/movies/:index', function(req, res){

    let requiredIdx = req.params.index
    
    if(requiredIdx>=0 && requiredIdx<moviesArr.length) {
        let requiredMovie = moviesArr[requiredIdx]
        res.send(requiredMovie)
    }
    else {
        res.send("pls provide valid index ")
    }

})


// -----------  
let movieObj = [ {
    id: 1,
    name: "The Shining"
   }, {
    id: 2,
    name: "Incendies"
   }, {
    id: 3,
    name: "Rang de Basanti"
   }, {
    id: 4,
    name: "Finding Nemo"
   }]
   

// ----------- problem 4    
router.get('/films', function (request, response){
    
    response.send(movieObj)
})


// ------------ problem 5
router.get('/films/:filmId', function(req, res) {
   let id = req.params.filmId
   if(id>=0 && id<movieObj.length) {
        for(let i=0; i<movieObj.length; i++){
            if(movieObj[i].id == id){
                res.send(movieObj[i].name)
            }
        }
   }
    else {
        res.send("No movie exists with this id")
    }
})


// router.get('/films', function(req, res){
//     // receive or access the query params in the code
//     // write a logic on these query params
//     // city, score
//     console.log(req.query)
//     let requestedCity = req.query.city
//     let sortField = req.query.sort
//     // logic to get students
//     res.send(["Sabiha","Neha","Akash","Sonali"])
// })




module.exports = router;