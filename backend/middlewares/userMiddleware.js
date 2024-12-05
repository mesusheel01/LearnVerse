import jwt from 'jsonwebtoken'


const userMiddleware = (req, res, next)=>{
    const partialToken = req.headers.authorization
    const token = partialToken.split(' ')[1]

    if(!token){
        return res.json({
            msg: "Invalid token!"
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
        if(err){
            return res.json({
                msg: "Invalid token!"
            })
        }
        console.log(user)
        req.userId = user.userId
        next()
    })
}


export default userMiddleware
