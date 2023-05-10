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

module.exports.authentication = authentication;