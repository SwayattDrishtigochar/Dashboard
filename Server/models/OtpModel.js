import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const OtpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      ref: 'User',
    },
    otp: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: {
        expires: '1m',
      },
    },
  },
  {
    timestamps: true,
  }
);

OtpSchema.pre('save', async function (next) {
  if (!this.isModified('otp')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(this.otp, salt);
});

OtpSchema.methods.matchOtp = async function (enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otp);
};

const Otp = mongoose.model('Otp', OtpSchema);

export default Otp;
