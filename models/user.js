import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  // created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("User", userSchema);
