import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    /* 🔥 Missing fields added */
    client: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    results: {
      type: [resultSchema],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
