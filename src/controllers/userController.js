const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function (req, res) {
  let data = req.body;
  if(!data) return res.send({status : false , msg : "pls provide user details"})
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};


 // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret (This is basically a fixed value only set at the server. This value should be hard to guess)
  // The same secret will be used to decode tokens 


const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)return res.send({ status: false,msg: "username or password is  incorerct"});

 // creating token
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "technetium",
      organisation: "FunctionUp",
    },
    "functionup-technetium-secret-key"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};



const getUserData = async function (req, res) {
  // let token = req.headers["x-Auth-token"];
  // if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error. This means the user is not logged in.
  // if (!token) return res.send({ status: false, msg: "token must be present" });

  // console.log(token);

  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself

  // Decoding requires the secret again. 
  // A token can only be decoded successfully if the same secret was used to create(sign) that token.
  // And because this token is only known to the server, it can be assumed that if a token is decoded at server then this token must have been issued by the same server in past.
  // let decodedToken = jwt.verify(token, "functionup-technetium-secret-key");
  // if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails) return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {

 try {
  // let token = req.headers["x-Auth-token"];
  // if (!token) token = req.headers["x-auth-token"];
  // if (!token) return res.send({ status: false, msg: "token must be present" });

  // let decodedToken = jwt.verify(token, "functionup-technetium-secret-key");
  // if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) { return res.send("No such user exists")}

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData , {new : true});
  res.send({ status: true, data: updatedUser });
 } 
 catch (error) {
    res.send({status : false , mag : error})
 }
};


const deleteUser = async function (req , res) {
  try {
    // let token = req.headers["x-Auth-token"];
    // if (!token) token = req.headers["x-auth-token"];
    // if (!token) return res.send({ status: false, msg: "token must be present" });
  
    // let decodedToken = jwt.verify(token, "functionup-technetium-secret-key");
    // if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });
  
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) { return res.send("No such user exists")}
  
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {isDeleted : true} , {new : true});
    res.send({ status: true, data: "User deleted successfully" });
  } catch (error) {
    res.send({status : false , msg : error})
  }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
