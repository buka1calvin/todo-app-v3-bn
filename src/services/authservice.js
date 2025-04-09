import User from '../models/user.js';
import { generateToken } from '../utils/jwt.js';
import ApiError from '../utils/errorHandlers.js';
export const registerUser = async (userData) => {
    const { email } = userData;
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError('User with this email already exists', 400);
    }
    const user = await User.create(userData);
    const token = generateToken(user._id);
  
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  };
export const loginUser = async (email, password) => {
const user = await User.findOne({ email }).select('+password');
console.log("user===",user)
if (!user) {
  throw new ApiError('Invalid credentials', 401);
}

const isMatch = await user.comparePassword(password);
if (!isMatch) {
  throw new ApiError('Invalid credentials', 401);
}

const token = generateToken(user._id);

return {
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  },
  token
};
};

export const getCurrentUser = async (userId) => {
const user = await User.findById(userId);

if (!user) {
  throw new ApiError('User not found', 404);
}

return {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role
};
};
