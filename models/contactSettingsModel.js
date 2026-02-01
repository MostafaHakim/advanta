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
});

const addressSchema = new mongoose.Schema({
  address: {
    title: {
      type: String,
    },
    details: [String],
  },
  visitHours: {
    title: {
      type: String,
    },

    details: [String],
  },
  Appointment: {
    title: {
      type: String,
    },

    details: [String],
  },
});

const contactSettingsSchema = new mongoose.Schema(
  {
    contactInfo: [contactItemSchema],
    departments: [departmentSchema],
    address: [addressSchema],
  },
  { timestamps: true },
);

export default mongoose.models.ContactSettings ||
  mongoose.model("ContactSettings", contactSettingsSchema);
