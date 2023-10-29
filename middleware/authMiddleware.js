const jwt = require('jsonwebtoken')
const Users = require("../Model/Users")
const dotenv = require('dotenv');
dotenv.config();

const requireSignIn = async (req, res,next)=>{
    try {
        const decode = await jwt.verify(req.headers.authorization,process.env.SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
};

const isManufacturer =async (req, res, next)=>{
    try {
        const user = await Users.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "Un-Authorized Access"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message:"Error in Manufacturer middleware"
        })
    }
}
const isTransporter =async (req, res, next)=>{
    try {
        const user = await Users.findById(req.user._id);
        if(user.role === 1){
            return res.status(401).send({
                success: false,
                message: "Un-Authorized Access"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message:"Error in Transporter middleware"
        })
    }
}

module.exports = {requireSignIn, isManufacturer, isTransporter};