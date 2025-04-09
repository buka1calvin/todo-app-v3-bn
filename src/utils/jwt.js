import jwt from 'jsonwebtoken';
import config from '../config/env.js';
//Generate jwt token
export const generateToken = (userId) => {
    return jwt.sign(
      { id: userId },
      config.jwtSecret,
      { expiresIn: config.jwtexpire }
    );
  }; 
  //verify jwt token
  export const verifyToken =(token)=> {
    try{
        const decoded =jwt.verify(token,config.jwtSecret);
        console.log("decoded", decoded)
        return { valid:true,expired: false,decoded};
    } catch(error){
      console.log(error)
        return{
            valid:false,
            expired: error.name ==='TokenExpiredError',
            decoded:null,

        };
    }
  };
  