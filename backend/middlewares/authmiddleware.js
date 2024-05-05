const JWT = require('jsonwebtoken');
const { User } = require('../models/UserModel');


const requireSignIn = (req, res, next) => {
    try{
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode; //passing decode into req.user so that we can get the id of user.
        next();
    }
    catch(error){
        console.log(error);
    }
}

const isadmin = async (req,res,next) => {
    try{
        const user = await User.findById(req.user._id);
        if(user.isAdmin == false){
        return  res.status(403).json({mssg: 'unauthorized access'})
        
            
        } else {
            next();
        }
    }
    catch(error){
        console.log(error)
        res.status(401).send({mssge: 'error in admin middleware', error})
    }
}


module.exports ={ requireSignIn , isadmin};
