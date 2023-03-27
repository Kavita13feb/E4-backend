const jwt=require("jsonwebtoken")

const authenticator=(req,res,next)=>{
    const token=req.headers.authorization

    jwt.verify(token,"masai",async(err,decoded)=>{
        if(decoded){
            console.log(decoded)
            req.body.userId=decoded.userId
            next()
        }else{
res.send("Please login First")
        }
    })


}

module.exports={
    authenticator
}