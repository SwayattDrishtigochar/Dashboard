import axios from 'axios';
import asyncHandler from 'express-async-handler';

const getSensorData = asyncHandler(async (req, res) => {
  const { collection, limit } = req.query;
  try {
    const apiUrl = process.env.Mongo_API;
    const headers = {
      'api-key': process.env.Mongo_API_KEY,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const requestBody = {
      dataSource: 'Dashboard',
      database: 'Sensor',
      collection: collection,
      pipeline: [
        {
          $sort: { timestamp: -1 },
        },
        {
          $limit: parseInt(limit) || 1,
        },
      ],
    };

    const response = await axios.post(apiUrl, requestBody, { headers });
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
    throw new Error(error);
  }
});

const getStatus = asyncHandler(async (req, res) => {
  const { collection } = req.query;
  try {
    const apiUrl = process.env.Mongo_API;
    const headers = {
      'api-key': process.env.Mongo_API_KEY,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const requestBody = {
      dataSource: 'Dashboard',
      database: 'Sensor',
      collection: collection,
      pipeline: [
        {
          $sort: { timestamp: -1 },
        },
        {
          $limit: 1,
        },
        {
          $project: {
            _id: 0,
            state: 1,
          },
        },
      ],
    };

    const response = await axios.post(apiUrl, requestBody, { headers });
    const data = response.data.documents[0].state;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
    throw new Error(error);
  }
});

export { getSensorData, getStatus };
