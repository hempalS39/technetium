const publisherModel = require('../models/publisherModel');

const createPublisher = async function (req , res) {
    let data = req.body;
    let saveData = await publisherModel.create(data);

    res.send({msg : saveData})
}


const getPublisher = async function (req , res) {
    const publishers = await publisherModel.find();
    if(publishers.length == 0) return res.send({msg : "no publisher found"});
    
    res.send(publishers)
}

module.exports.createPublisher = createPublisher;
module.exports.getPublisher = getPublisher