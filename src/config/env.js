import dotenv from 'dotenv';

dotenv.config();
export default{
    port: process.env.PORT||5000,
    mongodburl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtexpire:process.env.JWT_EXPIRE ||'7d'
};
