import jwt from "jsonwebtoken"
import userdataschema from "../model/UserScheme.js"

export const middleware=async(req,res,next)=>{
    try {
          console.log(req.headers.authorization?.startsWith("Bearer"))    
          const token =req.headers.authorization || req.headers.authorization?.startsWith("Bearer")   
          const secretKey="1234567890"


        if(!token)
        {
            return res.json({
                success: false,
                status: 400,
                message: "please insert token",
                body: {}
            })
        }
        else{
            const splitBearerToken = await token.split(" ")[1]
            const verifyToken = await jwt.verify(splitBearerToken,secretKey)
            // console.log(verifyToken,"verifyToken")
            if(!verifyToken){
                return res.json({
                    success: false,
                    status: 400,
                    message: "please insert valid token",
                    body: {}
                })
            }else{
                const user= await userdataschema.findById({_id:verifyToken._id.id})
                console.log(user,"user")
                if(user.token!==splitBearerToken){
                    return res.json({
                        success: false,
                        status: 400,
                        message: "please login again",
                        body: {}
                    })
                }else{
                    req.user= user
                    next()
                }
            }
        }

        
    } catch (error) {
        
        return res.json({
            success: false,
            status: 400,
            message: "please insert valid token",
            body: {}
        })
        
    }
}