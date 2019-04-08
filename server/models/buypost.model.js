import mongoose from "mongoose";
const BuyPostSchema = new mongoose.Schema({
  product: {
    type: String,
    trim: true
  },
  product_quantity: {
    type: String,
    trim: true
  },
  totalcost: {
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

export default mongoose.model("BuyPost", BuyPostSchema);
