import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  totalFee: {
    type: Number,
    required: true,
  },
  paidFee: {
    type: Number,
    required: true,
  },
  balanceFee: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Paid", "Unpaid", "Partial"],
    required: true,
  },
  photo: {
    type: String, // yahan image ka path save hoga
  },
}, { timestamps: true });

const Fee = mongoose.model("Fee", feeSchema);
export default Fee;