import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  beats:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Beat"
  }
  ],
});

const cartCollection = mongoose.model("cart", cartSchema);
export default cartCollection;
