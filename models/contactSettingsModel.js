import mongoose from "mongoose";

const contactItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Phone, Email, Office
  },
  icon: {
    type: String, // lucide icon name: Phone, Mail, MapPin
    required: true,
  },
  details: {
    type: [String], // numbers, emails, addresses
    required: true,
  },
  description: {
    type: String,
  },
});

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Sales, Support etc
  },
  email: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // MessageSquare, Users, Headphones
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const contactSettingsSchema = new mongoose.Schema(
  {
    contactInfo: [contactItemSchema],
    departments: [departmentSchema],
  },
  { timestamps: true },
);

export default mongoose.models.ContactSettings ||
  mongoose.model("ContactSettings", contactSettingsSchema);
