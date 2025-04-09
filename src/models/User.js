import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Userschema= new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'please provide a name'],
        trim: true,
        maxlength: [50,'Name can not be more than 50 characters'],

    },
    email: {
        type:String,
        required: [true, 'please provide an email'],
        unique:true,
        lowercase: true,
        match:[
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'please provide a valid email'
    ]
    },
    password: {
        type:String,
        required: [true,'please provide your password'],
        minlength: [6,'password  must be atleast 6 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    createdAT: {
        type: Date,
        default: Date.now
    }

});

Userschema.pre('save',async function(next){
    if (!this.isModified('password')) {
    return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(error) {
        next(error);
    }
});

Userschema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const User = mongoose.models.User || mongoose.model('User', Userschema);

  
  export default User;