import mongoose from 'mongoose';
const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    data_id: {
      type: String,
    },
    type: {
      type: String,
    },
    tags: [String],
    location: {
      type: String,
    },
    status: {
      type: String,
      default: 'Available',
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

const Equipment = mongoose.model('Equipment', equipmentSchema);

export default Equipment;
