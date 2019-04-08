import mongoose from "mongoose";
const SellPostSchema = new mongoose.Schema({
  product: {
    type: String,
    trim: true,
    required: "Product Name is required"
  },
  product_description: {
    type: String,
    trim: true
  },
  product_quantity: {
    type: String,
    trim: true,
    required: "Product Quantity is required"
  },
  totalcost: {
    type: String,
    trim: true
  },
  postedRole: {
    type: String,
    trim: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  }
});
// SellPostSchema.set("autoIndex", false);
export default mongoose.model("SellPost", SellPostSchema);
