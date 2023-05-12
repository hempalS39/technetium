const jwt = require("jsonwebtoken");


function authentication (req , res , next) {
   try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
    let decodedToken = jwt.verify(token, "functionup-technetium-secret-key");
    if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });

    next()
   } 
   catch (error) {
        res.send({status : false , msg : error})
   }
}

const authorise = function (req, res, next) {
   let token = req.headers["x-auth-token"]
   let decodedToken = jwt.verify(token, "functionup-technetium-secret-key")

   //userId for which the request is made. 
   let userToBeModified = req.params.userId
   //userId for the logged-in user
   let userLoggedIn = decodedToken.userId

   //userId comparision to check if the logged-in user is requesting for their own data
   if (userToBeModified != userLoggedIn) return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
   
   next()
}

module.exports.authentication = authentication;
module.exports.authorise = authorise;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDVkMWM0MmZiNzgwNzk0ZmRiMDFjOTIiLCJiYXRjaCI6InRlY2huZXRpdW0iLCJvcmdhbmlzYXRpb24iOiJGdW5jdGlvblVwIiwiaWF0IjoxNjgzOTAyMzI0fQ.kUOLhqlHq5eCDkKyzmJ0d6Hs-RvBKarfwW8j9-830Uo