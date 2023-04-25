const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const myUnderscore = require('underscore')

router.get('/test-me', function (req, res) {
    res.send('This should be working!')
});

//------------------------------ missing number assignment
router.get('/sol1' , function (req,res) {
    let arr = [1,2,3,5,6,7];
    let n =arr[arr.length-1]
    let totalSum = n*(n+1)/2
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        sum += arr[i]
    }
    console.log(totalSum , sum )
    let missingNum = totalSum-sum;
    console.log(missingNum)

    return res.send({ missingNum})
})

router.get('/sol2' , function (req,res) {
    let arr = [33,34,35,37,38];
    // let arr = [21,22,23,24,26,27,28,29]
    let min = arr[0];
    for(let i=1; i<arr.length; i++){
        if(arr[i] == min+1) {
            min = min+1;
        }
        else return res.send({misingNum : min+1})
    }
})

//-------------------------------------- post Assignment --------------------------------
let players =[
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ]
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ]
       },
   ]

router.post('/players' , function (req,res) {
    let player = req.body;
    for(let i=0; i<players.length; i++){
        if(players[i].name == player.name){
           return res.send({msg : "player with same name already present"})
        }
    }

    players.push(player)
   return res.send({data : players})
})   




// -------------------------- get-api - Assignment
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




module.exports = router;