import mongoose from 'mongoose';

// Define the schema for the boiler data
const boilerSchema = new mongoose.Schema({
  steamPressure: {
    type: String,
    required: true,
  },
  mainValveControls: {
    type: String,
    required: true,
  },
  feedPump1: {
    type: String,
    required: true,
  },
  feedPump2: {
    type: String,
    required: true,
  },
  waterLevel: {
    type: String,
    required: true,
  },
  // feedWater: {
  //   type: String,
  //   required: true,
  // },
  // blowDown: {
  //   type: String,
  //   required: true,
  // },
  time: {
    type: Date,
    required: true,
  },
});

// Create the Boiler model
const Boiler = mongoose.model('Boiler', boilerSchema);

export default Boiler;
