const { AppError } = require("../errorControllers");
const { verifyAccessToken } = require("./VerifyToken");


const checkBearer = async (req, res, next) => {

    try {
    const data = req.headers.authorization;
    const token = data.split(' ').pop();
    const isVerified = verifyAccessToken(token) ;
    if(isVerified){
        next();
        }   
    } catch (error) {
        next(new AppError(401,'Invalid token'));
    }
}

module.exports = {
    checkBearer
}