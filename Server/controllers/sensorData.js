import axios from 'axios';
import asyncHandler from 'express-async-handler';
// import Equipment from '../models/equipmentModel';

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
          $limit: parseInt(limit) || 10,
        },
      ],
    };

    const response = await axios.post(apiUrl, requestBody, { headers });
    const data = response.data;
    if (data.documents.length > 0) {
      data.documents = data.documents.map((data) => {
        const dateIST = new Date(data.timestamp).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
        });

        return {
          ...data,
          timestamp: dateIST,
        };
      });
    }

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

// const getRunningHours = asyncHandler(async (req, res) => {
//   const { collection } = req.query;

//   try {
//     const apiUrl = process.env.Mongo_API;
//     const headers = {
//       'api-key': process.env.Mongo_API_KEY,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     };

//     // Get the start and end timestamps for the current date
//     const currentDate = new Date();
//     currentDate.setHours(0, 0, 0, 0);
//     const currentDateEnd = new Date(currentDate);
//     currentDateEnd.setHours(23, 59, 59, 999);

//     const requestBody = {
//       dataSource: 'Dashboard',
//       database: 'Sensor',
//       collection: collection,
//       pipeline: [
//         {
//           $match: {
//             timestamp: {
//               $gte: currentDate,
//               $lte: currentDateEnd,
//             },
//           },
//         },
//         {
//           $sort: { timestamp: -1 },
//         },

//         {
//           $project: {
//             _id: 0,
//             state: 1,
//             timestamp: 1,
//           },
//         },
//       ],
//     };

//     const response = await axios.post(apiUrl, requestBody, { headers });
//     const data = response.data.documents;

//     res.status(200).json(data);
//     // Calculate running hours
//   } catch (error) {
//     res.status(500);
//     throw new Error(error);
//   }
// });

// const getRunningHours = asyncHandler(async (req, res) => {
//   const { collection } = req.query;
//   let runningHours = 0; // Initialize running hours
//   let downtime = 0; // Initialize downtime

//   const fetchData = async () => {
//     try {
//       const apiUrl = process.env.Mongo_API;
//       const headers = {
//         'api-key': process.env.Mongo_API_KEY,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       };

//       const requestBody = {
//         dataSource: 'Dashboard',
//         database: 'Sensor',
//         collection: collection,
//         pipeline: [
//           {
//             $sort: { timestamp: -1 },
//           },
//           {
//             $limit: 1,
//           },
//           {
//             $project: {
//               _id: 0,
//               state: 1,
//             },
//           },
//         ],
//       };

//       const response = await axios.post(apiUrl, requestBody, { headers });
//       const state = response.data.documents[0].state;

//       // Check the state and update running hours
//       if (state === 1) {
//         runningHours += 2; // Add 2 minutes to running hours
//       } else {
//         downtime += 2; // Add 2 minutes to downtime
//       }

//       // Send the response only once within the interval
//       if (!res.headersSent) {
//         res.status(200).json({ state, runningHours, downtime });
//       }
//     } catch (error) {
//       if (!res.headersSent) {
//         res.status(500).json({ message: 'An error occurred' });
//       }
//       console.error(error);
//     }
//   };

//   // Call fetchData initially and then at 2-minute intervals
//   fetchData();
//   setInterval(fetchData, 1 * 60 * 1000); // 2 minutes in milliseconds
// });

export { getSensorData, getStatus };
