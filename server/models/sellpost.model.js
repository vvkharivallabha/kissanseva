import mongoose from "mongoose";
const SellPostSchema = new mongoose.Schema({
  product: {
    type: String,
    trim: true,
    required: "Product Name is required"
  },
  product_description: {
    type: String,
    trim: true,
    required: "Product Description is required"
  },
  product_quantity: {
    type: String,
    trim: true,
    required: "Product Quantity is required"
  },
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("SellPost", SellPostSchema);
