import mongoose from "mongoose";
import connectMongoose from "@/lib/mongoose";

const trainerApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    certification: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    adminNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const TrainerApplication =
  mongoose.models.TrainerApplication ||
  mongoose.model("TrainerApplication", trainerApplicationSchema);

export async function getApplicationByUserId(userId) {
  await connectMongoose();

  return TrainerApplication.findOne({ userId }).lean();
}

export default TrainerApplication;
