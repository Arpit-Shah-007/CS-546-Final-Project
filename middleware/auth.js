import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const userAuth = async (req, res, next) => {
    try{
        
    const authorization = req.headers['authorization'];
    // console.log(authorization);
    if (!authorization) {
        return res.status(400).json({
            status: false,
            msg: "Please login to continue.."
        })
    }

    let originaltoken = authorization.substring(7);
    if (originaltoken == undefined) {
        return res.status(403).json({
            status: false,
            msg: "Please Login to continue.."
        })
    }
    const Decode = jwt.decode(originaltoken, process.env.JWT_SECRET);
    // console.log(Decode);

    let user = await User.findById(Decode.user._id);
    if (!user) {
        return res.status(403).json({
            status: false,
            msg: "Please Login to continue.."
        })
    }
    // console.log(req.user);
    req.user = user;

    next();

    } catch (err) {
        console.log("error", err)
        return res.status(403).json({
            status: false,
            msg: err.message
        })
    }
}