
import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  amount: Number,
  address: {
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
    phone: String
  },
  status: String,
  payment: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});


const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
export default orderModel;
