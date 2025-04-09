import {registerUser,loginUser,getCurrentUser} from '../services/authservice.js'
export const register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      const result = await registerUser({ name, email, password });
  
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const result = await loginUser(email, password);
  
      res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  export const getMe = async (req, res, next) => {
    console.log("user", req.user)
    try {
      const user = await getCurrentUser(req.user.id);
  
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  };