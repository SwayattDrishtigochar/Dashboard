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

    res.status(200).json(boilerDataIST);
  } catch (error) {
    res.status(500);
    throw new Error('Error Getting Data');
  }
});

// Controller function for saving boiler data
const saveBoilerData = asyncHandler(async (req, res) => {
  try {
    // Create a new instance of the Boiler model with the extracted form data
    const newBoilerData = await Boiler.create(req.body);

    // Send a response with the newly created boiler data with time converted to IST

    const dateIST = new Date(newBoilerData.time).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    });

    const newBoilerDataIST = {
      ...newBoilerData._doc,
      time: dateIST,
    };

    res.status(200).json(newBoilerDataIST);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error('Invalid Data Input');
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

const getAllBoilerData = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const query = {};

    // Check if startDate and endDate query parameters are provided
    if (req.query.startDate && req.query.endDate) {
      // Convert startDate and endDate strings to Date objects
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);

      // Add date range query to the main query
      query.time = { $gte: startDate, $lte: endDate };
    } else if (req.query.date) {
      // If only a single date is provided, filter data for that specific date
      const date = new Date(req.query.date);
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      query.time = { $gte: date, $lt: nextDate };
    }

    const totalDocuments = await Boiler.countDocuments(query);

    const allBoilers = await Boiler.find(query)
      .sort({ time: -1 })
      .skip(startIndex)
      .limit(limit);
    const boilerDataIST = allBoilers.map((data) => {
      const dateIST = new Date(data.time).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
      });

      return {
        ...data._doc,
        time: dateIST,
      };
    });

    const pagination = {};

    if (endIndex < totalDocuments) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res.status(200).json({
      data: boilerDataIST,
      pagination: pagination,
      totalDocuments: totalDocuments,
    });
  } catch (error) {
    res.status(500);
    throw new Error('No DATA');
  }
});

const getWoodAmountForCurrentDay = asyncHandler(async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to the beginning of the next day

    const woodData = await Boiler.aggregate([
      {
        $match: {
          time: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalWood: { $sum: '$woodAmount' },
        },
      },
    ]);

    const totalWoodAmount = woodData.length > 0 ? woodData[0].totalWood : 0;

    res.status(200).json({
      totalWoodAmount,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error Getting Wood Data');
  }
});

const getSteamPressureForCurrentDay = asyncHandler(async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to the beginning of the next day

    const steamPressureData = await Boiler.find({
      time: {
        $gte: today,
        $lt: tomorrow,
      },
    })
      .sort({ time: 1 })
      .select('steamPressure')
      .select('time');

    //send steam pressure data with createdAt converted to IST and only time

    const steamPressureDataIST = steamPressureData.map((data) => {
      const dateIST = new Date(data.time).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
      });

      return {
        steamPressure: data.steamPressure,
        time: dateIST.split(',')[1],
      };
    });

    res.status(200).json(steamPressureDataIST);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export {
  getBoilerData,
  saveBoilerData,
  deleteBoilerData,
  editBoilerData,
  getAllBoilerData,
  getWoodAmountForCurrentDay,
  getSteamPressureForCurrentDay,
};
