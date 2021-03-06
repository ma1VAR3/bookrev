const jwt=require("jsonwebtoken")
const config=require("config")

module.exports=function(req,res,next){
     //Get the tokem from the header
     const token=req.header("x-auth-token")

     //check for token
     if(!token){
         return res.status(401).json({msg:"token not found"})
     }
 
     //verify token
     try {
         const decoded =jwt.verify(token,config.get("JWTsecret"))
         req.user=decoded.user
         next()
     } catch (error) {
         res.status(401).json({msg:"token not valid"})
     }
 
}