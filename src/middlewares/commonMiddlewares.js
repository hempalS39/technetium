
const mid1 = function (req , res , next) {
    let requestHeader = req.headers["isFreeAppUser"];
    if(!requestHeader) requestHeader = req.headers["isfreeappuser"];

    if(!requestHeader) return res.status(400).send({status : false , msg : "request is missing a mandatory header"})
    next();
}

module.exports.mid1 = mid1