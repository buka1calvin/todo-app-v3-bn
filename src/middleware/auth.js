 import { verifyToken } from "../utils/jwt.js";
 import User from "../models/user.js";
 import ApiError from "../utils/errorHandlers.js";
import { decode } from "jsonwebtoken";
export const protect = async(req,res,next)  =>{
     try{
        let token;
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
            token= req.headers.authorization.split(' ')[1];
        }
        if (!token){
            return next(new ApiError('Not authorized to access this route',401));
        }
        console.log("token", token )

        const{valid ,expired,decoded} = verifyToken(token);
       
        if (!valid){
            return next(
                new ApiError(
                    expired ? 'your token has expired' :'invalid token',
                    401
                )
            );
        }
        console.log(decoded)
        const user= await User.findById(decoded.id);
        if(!user){
            return next(
                new ApiError('The user belonging to this token is no longer exist',401)
            );
        }
        req.user =user;
        next();
    }catch (error){
        console.log("error", error)
        next(new ApiError('Not authorized to access this route',401));
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ApiError(
            `User role ${req.user.role} is not authorized to access this route`,
            403
          )
        );
      }
      next();
    };
  };
            
        

     
