import mongoose from 'mongoose';

// Define the schema for the boiler data
const boilerSchema = new mongoose.Schema(
  {
    steamPressure: {
      type: Number,
    },
    mainValveControls: {
      type: String,
    },
    feedPump1: {
      type: String,
    },
    feedPump2: {
      type: String,
    },
    waterLevel: {
      type: Number,
    },
    feedWater: {
      type: String,
    },
    blowDown: {
      type: String,
    },
    woodAmount: {
      type: Number,
    },

    time: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

// Create the Boiler model
const Boiler = mongoose.model('Boiler', boilerSchema);

export default Boiler;
