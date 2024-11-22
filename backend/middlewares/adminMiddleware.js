import jwt from 'jsonwebtoken'


const adminMiddleware = (req,res,next)=>{
    const partialToken = req.headers.authorization

    if(!partialToken){
        return res.json({
            msg: "Token not present!"
        })
    }
    const token = partialToken.split(' ')[1];

    try{
        jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
            if(err){
                return res.status(403).json({
                    msg: "Forbidden, invalid token!"
                })
            }
            req.adminId = user.adminId
            req.username = user.username
            next()
        })
    }catch(err){
        res.status(500).json({
            msg: 'Something is up with the server!'
        })
    }
}

export default adminMiddleware
