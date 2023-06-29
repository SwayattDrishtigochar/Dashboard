import { Container, Row, Col } from 'react-bootstrap';
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
  // Sample data for the line chart
  const lineChartData = [
    { name: 'January', data: 12 },
    { name: 'February', data: 19 },
    { name: 'March', data: 3 },
    { name: 'April', data: 5 },
    { name: 'May', data: 2 },
    { name: 'June', data: 3 },
  ];

  // Sample data for the bar chart
  const barChartData = [
    { name: 'Category 1', value: 15 },
    { name: 'Category 2', value: 7 },
    { name: 'Category 3', value: 10 },
    { name: 'Category 4', value: 5 },
  ];

  // Sample data for the pie chart
  const pieChartData = [
    { name: 'Category A', value: 30 },
    { name: 'Category B', value: 20 },
    { name: 'Category C', value: 50 },
  ];

  // Colors for the pie chart
  const pieChartColors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <Container>
      <Row className='my-4'>
        <Col>
          <h1 className='text-center'>Welcome to the Dashboard</h1>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col>
          <h3 className='text-center'>Line Chart</h3>
          <LineChart width={600} height={300} data={lineChartData}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='data' stroke='#8884d8' />
          </LineChart>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col>
          <h3 className='text-center'>Bar Chart</h3>
          <BarChart width={600} height={300} data={barChartData}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
            <Tooltip />
            <Legend />
            <Bar dataKey='value' fill='#8884d8' />
          </BarChart>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col>
          <h3 className='text-center'>Pie Chart</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieChartData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={80}
              fill='#8884d8'
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieChartColors[index % pieChartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardScreen;
