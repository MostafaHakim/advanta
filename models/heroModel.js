import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  titleFirst: {
    type: String,
  },
  titleLast: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  content: [
    {
      contentTitle: {
        type: String,
      },
      contentSubTitle: {
        type: String,
      },
    },
  ],
});

export default mongoose.models.Hero || mongoose.model("Hero", heroSchema);
