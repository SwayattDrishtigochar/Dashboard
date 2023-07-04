import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Box,
  Checkbox,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addBoilerData } from '../slices/boilerSlice';

const BoilerModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    steamPressure: '',
    mainValveControls: '',
    feedPump1: '',
    feedPump2: '',
    waterLevel: '',
    feedWater: 'OFF',
    blowDown: 'OFF',
  });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? (checked ? 'ON' : 'OFF') : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
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
    setFormData({
      steamPressure: '',
      mainValveControls: '',
      feedPump1: '',
      feedPump2: '',
      waterLevel: '',
      feedWater: 'OFF',
      blowDown: 'OFF',
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Data</DialogTitle>
      <DialogContent>
        <TextField
          name='steamPressure'
          label='Steam Pressure'
          value={formData.steamPressure}
          onChange={handleChange}
          fullWidth
          margin='normal'
          type='number'
        />

        <Box mt={2} display='flex' alignItems='center'>
          <Typography variant='subtitle1'>Main Control Valve:</Typography>
          <RadioGroup
            name='mainValveControls'
            value={formData.mainValveControls}
            onChange={handleChange}
            row
          >
            <FormControlLabel value='ON' control={<Radio />} label='ON' />
            <FormControlLabel value='OFF' control={<Radio />} label='OFF' />
          </RadioGroup>
        </Box>

        <Box mt={2} display='flex' alignItems='center'>
          <Typography variant='subtitle1'>Feed Pump Number 1:</Typography>
          <RadioGroup
            name='feedPump1'
            value={formData.feedPump1}
            onChange={handleChange}
            row
          >
            <FormControlLabel value='ON' control={<Radio />} label='ON' />
            <FormControlLabel value='OFF' control={<Radio />} label='OFF' />
          </RadioGroup>
        </Box>

        <Box mt={2} display='flex' alignItems='center'>
          <Typography variant='subtitle1'>Feed Pump Number 2:</Typography>
          <RadioGroup
            name='feedPump2'
            value={formData.feedPump2}
            onChange={handleChange}
            row
          >
            <FormControlLabel value='ON' control={<Radio />} label='ON' />
            <FormControlLabel value='OFF' control={<Radio />} label='OFF' />
          </RadioGroup>
        </Box>

        <TextField
          name='waterLevel'
          label='Water Level'
          value={formData.waterLevel}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />

        <Box mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                name='feedWater'
                checked={formData.feedWater === 'ON'}
                onChange={handleChange}
                color='primary'
              />
            }
            label='Feed Water Analysis'
          />

          <FormControlLabel
            control={
              <Checkbox
                name='blowDown'
                checked={formData.blowDown === 'ON'}
                onChange={handleChange}
                color='primary'
              />
            }
            label='Blow Down Analysis'
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant='contained' color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoilerModal;
