import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const OtpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      trim: true,
      enum: ['pending', 'confirmed', 'rejected'], // Accepts only "pending" or "confirmed" as values
      default: 'pending', // Set the default value as "pending"
    },
  },
  {
    timestamps: true,
  }
);
OtpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// OtpSchema.pre('save', async function (next) {
//   if (!this.isModified('otp')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.otp = await bcrypt.hash(this.otp, salt);
// });

OtpSchema.methods.matchOtp = async function (enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otp);
};

const Otp = mongoose.model('Otp', OtpSchema);

export default Otp;
