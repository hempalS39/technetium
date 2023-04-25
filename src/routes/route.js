const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

//------------------------------ missing number assignment
router.get('/sol1' , function (req,res) {
    let arr = [1,2,3,4,5,7];
    let n =arr[arr.length-1]
    let totalSum = n*(n+1)/2
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        sum += arr[i]
    }
    
    let missingNum = totalSum-sum;

    return res.send({ missingNum})
})

router.get('/sol2' , function (req,res) {
    let arr = [33,34,36,37,38];
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



module.exports = router;