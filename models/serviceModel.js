import mongoose, { Schema, models } from "mongoose";

const MetricSchema = new Schema(
  {
    label: String,
    value: String,
  },
  { _id: false },
);

const PricePlanSchema = new Schema(
  {
    price: String,
    features: [String],
  },
  { _id: false },
);

const FeatureDetailSchema = new Schema({
  title: String,
  description: String,
  items: [String],
}, { _id: false });

const ProcessStepSchema = new Schema({
  step: Number,
  title: String,
  description: String,
}, { _id: false });

const FaqSchema = new Schema({
  question: String,
  answer: String,
}, { _id: false });


const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
    },
    tagline: {
      type: String,
    },
    icon: {
      type: String, // emoji বা icon key
    },
    color: {
      type: String,
    },
    category: {
      type: String, // Digital Marketing / Tech / Analytics
      required: true,
    },
    features: [FeatureDetailSchema],
    metrics: {
      type: [MetricSchema],
      default: [],
    },
    process: [ProcessStepSchema],
    faqs: [FaqSchema],
    pricing: {
      starter: PricePlanSchema,
      professional: PricePlanSchema,
      enterprise: PricePlanSchema,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default models.Service || mongoose.model("Service", ServiceSchema);
