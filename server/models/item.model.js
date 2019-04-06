import mongoose from "mongoose";
const ItemSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  product_name: {
    type: String,
    trim: true
  },
  cost: {
    type: String,
    trim: true,
  }
});

export default mongoose.model("Item", ItemSchema);
