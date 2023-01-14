import { Schema, model } from "mongoose";

const profileImageSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default model("profileImage", profileImageSchema);
