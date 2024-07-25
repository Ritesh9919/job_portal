import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
  // User authentication fields
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // Job seeker or employer details (based on a user role)
  role: {
    type: String,
    enum: ['jobSeeker', 'employer'], // Allowed roles
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  // Additional details relevant to user roles:

  // Job seeker specific
  skills: [String], // Array of strings for skills
  experience: Number, // Years of experience

  // Employer specific
  companyName: {
    type: String,
  },
  companyWebsite: {
    type: String,
  },
});



UserSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
}) 

UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = async function() {
  return await jwt.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME});
}

export const User =  mongoose.model('User', UserSchema);
