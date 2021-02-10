const  jwt  = require('jsonwebtoken')
const jwtKey = process.env.secert

function restrict(){
    return async (req,res,next) =>{
        try{
            const token = req.headers.authorization
            if(!token){
                return res.status(401).json({
                    message: "Invalid credentials",
                })
            } else{
                jwt.verify(token, jwtKey, (err, decoded)=>{
                    if (err) {
                        return res.status(401).json(err);
                    }
                    req.decoded = decoded;
                    next();
                })
            }
        } catch(err){
            next(err)
        }
    }
}


module.exports ={
    restrict
}