import Task from "../models/Task.js";
import User from "../models/user.js";
import ApiError from "../utils/errorHandlers.js";

export const createTaskService = async (user, taskData) => {
  const userData = await User.findById(user.id);
  const { title, description } = taskData;
  if (!userData) {
    throw new ApiError(`user with id= ${user.id} not found`, 404);
  }
  const userId = user.id;
  try {
    const newTask = await Task.create({
      user: userId,
      title,
      description,
    });
    return newTask;
  } catch (error) {
    throw new ApiError("error creating Task", error);
  }
};

export const getAllTasksService=async(user)=>{
  try{
    const userTasksData=await Task.find({user:user.id})
    return userTasksData
  }catch(error){
    throw new ApiError("Error fetchig Tasks",error)
  }
}