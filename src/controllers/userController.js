const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function (req, res) {
    try {
        let data = req.body;
        if (!data) return res.send({ status: false, msg: "pls provide user details" })
        let savedData = await userModel.create(data);
        res.status(201).send({ msg: savedData });
    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
};



const loginUser = async function (req, res) {
    try {
        let userName = req.body.emailId;
        let password = req.body.password;

        let user = await userModel.findOne({ emailId: userName, password: password });
        if (!user) return res.send({ status: false, msg: "username or password is  incorerct" });

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
    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
};

  

const getUserData = async function (req, res) {

//   let token = req.headers["x-auth-token"]
//    if (!token) return res.send({ status: false, msg: "token must be present in the request header" })

//     let decodedToken = jwt.verify(token, "functionup-technetium-secret-key");
//     if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });
//    //userId for which the request is made. 
//    let userToBeModified = req.params.userId
//    //userId for the logged-in user
//    let userLoggedIn = decodedToken.userId

//    //userId comparision to check if the logged-in user is requesting for their own data
//    if (userToBeModified != userLoggedIn) return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
   
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
    if (!user) { return res.send("No such user exists") }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
    res.status(200).send({ status: true, data: updatedUser });
  }
  catch (error) {
    res.status(500).send({ status: false, mag: error })
  }
};


const deleteUser = async function (req, res) {
  try {
    // let token = req.headers["x-Auth-token"];
    // if (!token) token = req.headers["x-auth-token"];
    // if (!token) return res.send({ status: false, msg: "token must be present" });

    // let decodedToken = jwt.verify(token, "functionup-technetium-secret-key");
    // if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user) { return res.send("No such user exists") }

    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true });
    res.send({ status: true, data: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: false, msg: error })
  }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
