import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Brand || mongoose.model("Brand", brandSchema);
