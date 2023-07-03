import { Typography, Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const DashboardScreen = () => {
  // Sample time series temperature data
  const temperatureData = [
    { time: '00:00', temperature: 25 },
    { time: '03:00', temperature: 23 },
    { time: '06:00', temperature: 22 },
    { time: '09:00', temperature: 26 },
    { time: '12:00', temperature: 30 },
    { time: '15:00', temperature: 28 },
    { time: '18:00', temperature: 26 },
    { time: '21:00', temperature: 24 },
  ];

  // Sample data for the bar chart
  // Sample data for the bar chart
  const barChartData = [
    { name: 'Machine 1', value: 120 },
    { name: 'Machine 2', value: 80 },
    { name: 'Machine 3', value: 65 },
    { name: 'Machine 4', value: 65 },
  ];

  // Sample data for the pie chart
  const manufacturingData = [
    { name: 'Production', value: 300 },
    { name: 'Maintenance', value: 100 },
    { name: 'Quality Control', value: 80 },
    { name: 'Inventory', value: 200 },
  ];

  // Colors for the pie chart
  const pieChartColors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <Box>
      <Typography variant='h4' align='center' gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Box display='flex' justifyContent='space-between'>
        <Box flexBasis='30%'>
          <Typography variant='h6' align='center' gutterBottom>
            Temperature Data
          </Typography>
          <LineChart width={400} height={300} data={temperatureData}>
            <XAxis dataKey='time' />
            <YAxis />
            <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='temperature' stroke='#8884d8' />
          </LineChart>
        </Box>
        <Box flexBasis='30%'>
          <Typography variant='h6' align='center' gutterBottom>
            Running Hours
          </Typography>
          <BarChart width={400} height={300} data={barChartData}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
            <Tooltip />
            <Legend />
            <Bar dataKey='value' fill='#8884d8' />
          </BarChart>
        </Box>
        <Box flexBasis='30%'>
          <Typography variant='h6' align='center' gutterBottom>
            Manufacturing Data
          </Typography>
          <PieChart width={400} height={300}>
            <Pie
              data={manufacturingData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={80}
              fill='#8884d8'
              label
            >
              {manufacturingData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieChartColors[index % pieChartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardScreen;
