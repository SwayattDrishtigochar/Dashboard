import { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { addBoilerData } from '../../slices/boilerSlice';
import { useDispatch, useSelector } from 'react-redux';
import BoilerModal from '../../components/BoilerModal';

const Boiler = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    steamPressure: '',
    mainValveControls: '',
    feedPump1: '',
    feedPump2: '',
    waterLevel: '',
    feedWater: '',
    blowDown: '',
  });

  const dispatch = useDispatch();
  const boilerData = useSelector((state) => state.boiler);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Set the current time as the form submission time
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const updatedFormData = {
      ...formData,
      time: currentTime,
    };

    // Perform any necessary operations with the form data
    console.log(updatedFormData);

    dispatch(addBoilerData(updatedFormData));

    handleClose();
  };

  return (
    <>
      <Box position='relative'>
        <Typography variant='h6' align='center' gutterBottom>
          Boiler Data
        </Typography>
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>Time</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Steam Pressure
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Main Steam Valve Controls
                </TableCell>
                <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                  Feed Pump
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Water Level
                </TableCell>
                <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                  Water Analysis
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell style={{ textAlign: 'center' }}>Number 1</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Number 2</TableCell>
                <TableCell />
                <TableCell style={{ textAlign: 'center' }}>
                  Feed Water
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>Blow Down</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boilerData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.time}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.steamPressure}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.mainValveControls}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.feedPump1}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.feedPump2}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.waterLevel}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.feedWater}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.blowDown}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Button
        onClick={handleOpen}
        sx={{
          width: '100%',
          background: 'black',
          position: 'sticky',
          bottom: '0',
          margin: 'auto',
        }}
      >
        Add
      </Button>

      <BoilerModal
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        formData={formData}
        handleChange={handleChange}
      />
    </>
  );
};

export default Boiler;
