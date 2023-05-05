import mongoose from "mongoose";
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Item", itemSchema);
