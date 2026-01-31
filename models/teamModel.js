import mongoose from "mongoose";

const StatSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const SocialSchema = new mongoose.Schema(
  {
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { _id: false },
);

const TeamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    expertise: [
      {
        type: String,
      },
    ],
    social: SocialSchema,
    featured: {
      type: Boolean,
      default: false,
    },
    stats: [StatSchema],
  },
  {
    timestamps: true,
  },
);

const TeamMember =
  mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);

export default TeamMember;
