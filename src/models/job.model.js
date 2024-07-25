import mongoose from "mongoose";



const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  // Additional job-related fields
  skills: [String], // Array of required skills
  experience: {
    type: Number,
    min: 0, // Enforce non-negative experience
  },
  salary: {
    type: Number,
    min: 0, // Enforce non-negative salary
  },
  benefits: [String], // Array of benefits offered
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
  },
  remoteOption: {
    type: Boolean,
    default: false,
  },
  // Reference the User model for the employer who posted the job
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Additional fields for filtering and application management
  isPublic: {
    type: Boolean,
    default: true,
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Optional fields for additional information
  companyWebsite: {
    type: String,
  },
  applicationLink: {
    type: String,
  },
});

const Job =  mongoose.model('Job', JobSchema);
