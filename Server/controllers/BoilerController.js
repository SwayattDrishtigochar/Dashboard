import Boiler from '../models/BoilerModel.js';
import asyncHandler from 'express-async-handler';

const getBoilerData = asyncHandler(async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to the beginning of the next day

    const boilerData = await Boiler.find({
      time: {
        $gte: today,
        $lt: tomorrow,
      },
    }).sort({ time: 1 });

    const boilerDataIST = boilerData.map((data) => {
      const dateIST = new Date(data.time).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
      });

      return {
        ...data._doc,
        time: dateIST,
      };
    });

    res.status(200).json({
      data: boilerDataIST,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// Controller function for saving boiler data
const saveBoilerData = asyncHandler(async (req, res) => {
  try {
    const {
      steamPressure,
      mainValveControls,
      feedPump1,
      feedPump2,
      waterLevel,
      feedWater,
      blowDown,
      time,
    } = req.body;
    // console.log(req.body);

    // Create a new instance of the Boiler model with the extracted form data
    const newBoilerData = await Boiler.create({
      steamPressure,
      mainValveControls,
      feedPump1,
      feedPump2,
      waterLevel,
      feedWater,
      blowDown,
      time,
    });

    res.status(200).json({
      data: newBoilerData,
    });
  } catch (error) {
    res.status(400);
    // console.log(error);
    throw new Error('Invalid data');
  }
});

// Controller function for deleting boiler data
const deleteBoilerData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find the boiler data by ID and delete it
    const deletedBoilerData = await Boiler.findByIdAndDelete(id);

    if (deletedBoilerData) {
      console.log('Boiler data deleted successfully');
      res.status(200).json({
        message: 'Successfully deleted',
        data: deletedBoilerData,
      });
    } else {
      res.status(404).json({ error: 'Boiler data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Controller function for editing boiler data
const editBoilerData = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;

    // Find the boiler data by ID and update it with the new form data
    const updatedBoilerData = await Boiler.findByIdAndUpdate(id, formData, {
      new: true,
    });

    if (updatedBoilerData) {
      console.log('Boiler data updated successfully');
      res.status(200).json({
        message: 'Successfully updated',
        data: updatedBoilerData,
      });
    } else {
      res.status(404).json({ error: 'Boiler data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export { getBoilerData, saveBoilerData, deleteBoilerData, editBoilerData };
