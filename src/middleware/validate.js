import joi from 'joi';
import ApiError from '../utils/errorHandlers.js';
export const validate =(schema) => (req,res,next) =>{
    const{error } =schema.validate(req.body,{
        abortEarly: false,
        stripUnknown: true, 
        errors: {
          wrap: {
            label: ''
          }
        }
      });
      if (error){
        const message =error.details.map(detail.message).join(',');
        return next(new ApiError(message,400));
      }
      next();
};
export const registerSchema =joi.object({
    name: joi.string()
    .trim()
    .required()
    .max(50)
    .message({
        'string.empty':'Name is required',
        'string.max':'Name can not be more than 50 characters'
    }),
    email:joi.string()
    .trim()
    .required()
    .email()
    .message({
        'string.empty':'Email is required',
        'string.email':'please provide a valid email'
    }),
    password:joi.string()
    .trim()
    .required()
    .min(6)
    .message({
        'string.empty':'password is required',
        'string.min':'password must be atleast 6 characters'
    })
});
export const loginSchema=joi.object({
    email:joi.string()
    .trim()
    .required()
    .email()
    .message({
        'string empty':'Email is required',
        'string.email':'please provide a valid email'
       
    }),

    password:joi.string()
    .trim()
    .required()
    .min(6)
    .message({
        'string.empty':'password is required',
        'string.min':'password must be atleast 6 characters'
    })
});