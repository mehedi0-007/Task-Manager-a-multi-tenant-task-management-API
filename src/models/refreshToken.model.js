import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

RefreshTokenSchema.index({ token: 1, expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model("Refreshtoken", RefreshTokenSchema);

export default RefreshToken;
