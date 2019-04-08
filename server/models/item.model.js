import mongoose from "mongoose";
const ItemSchema = new mongoose.Schema({
  product_name: {
    type: String,
    trim: true
  },
  cost: {
    type: String,
    trim: true
  }
});
ItemSchema.set("autoIndex", false);
export default mongoose.model("Item", ItemSchema);
