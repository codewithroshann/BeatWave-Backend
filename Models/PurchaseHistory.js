import mongoose from "mongoose";

const purchaseHistorySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  beats: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Beat",
    required: true,
  },
  purchaseAmmount: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    default: "card",
  },
  status: {
    type: String,
    enum: ["PAID", "PENDING", "FAILED"],
    default: "PENDING",
  },
});

const purchaseHistory = mongoose.model(  "purchaseHistory",  purchaseHistorySchema
);
export default purchaseHistory;
