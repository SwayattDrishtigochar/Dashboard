import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Box,
  Checkbox,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addBoilerData } from '../../slices/boilerSlice';
import { useSetBoilerDataMutation } from '../../slices/boilerApiSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const BoilerModal = ({ open, onClose }) => {
  const [steamPressure, setSteamPressure] = useState('');
  const [mainValveControls, setMainValveControls] = useState('');
  const [feedPump1, setFeedPump1] = useState('');
  const [feedPump2, setFeedPump2] = useState('');
  const [waterLevel, setWaterLevel] = useState('');
  const [feedWater, setFeedWater] = useState('OFF');
  const [blowDown, setBlowDown] = useState('OFF');
  const dispatch = useDispatch();
  const { boilerData } = useSelector((state) => state.boiler);

  const [setBoilerData, { isLoading, error }] = useSetBoilerDataMutation();

  const handleSave = async (e) => {
    e.preventDefault();

    // Set the current time as the form submission time
    const currentTime = new Date();
    console.log({
      steamPressure,
      mainValveControls,
      feedPump1,
      feedPump2,
      waterLevel,
      feedWater,
      blowDown,
      time: currentTime,
    });

    try {
      const res = await setBoilerData({
        steamPressure,
        mainValveControls,
        feedPump1,
        feedPump2,
        waterLevel,
        feedWater,
        blowDown,
        time: currentTime,
      }).unwrap();
      dispatch(addBoilerData([...boilerData, res.data]));
      onClose();
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error while saving boiler data:', error);
      // Handle the error here (e.g., show an error message to the user)
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Data</DialogTitle>
      <form style={{ width: '100%' }}>
        <DialogContent>
          <FormControl fullWidth margin='normal'>
            <TextField
              error={error}
              name='steamPressure'
              label='Steam Pressure'
              value={steamPressure}
              onChange={(e) => setSteamPressure(e.target.value)}
              type='number'
            />
          </FormControl>

          <Box mt={2} display='flex' alignItems='center'>
            <Typography variant='subtitle1'>Main Control Valve:</Typography>
            <RadioGroup
              name='mainValveControls'
              value={mainValveControls}
              onChange={(e) => setMainValveControls(e.target.value)}
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
              value={feedPump1}
              onChange={(e) => setFeedPump1(e.target.value)}
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
              value={feedPump2}
              onChange={(e) => setFeedPump2(e.target.value)}
              row
            >
              <FormControlLabel value='ON' control={<Radio />} label='ON' />
              <FormControlLabel value='OFF' control={<Radio />} label='OFF' />
            </RadioGroup>
          </Box>

          <TextField
            name='waterLevel'
            label='Water Level'
            type='number'
            value={waterLevel}
            fullWidth
            margin='normal'
            onChange={(e) => setWaterLevel(e.target.value)}
          />

          <Box mt={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name='feedWater'
                  checked={feedWater === 'ON'}
                  color='primary'
                  onChange={(e) =>
                    setFeedWater(e.target.checked ? 'ON' : 'OFF')
                  }
                />
              }
              label='Feed Water Analysis'
            />

            <FormControlLabel
              control={
                <Checkbox
                  name='blowDown'
                  checked={blowDown === 'ON'}
                  color='primary'
                  onChange={(e) => setBlowDown(e.target.checked ? 'ON' : 'OFF')}
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
      </form>
    </Dialog>
  );
};

export default BoilerModal;
