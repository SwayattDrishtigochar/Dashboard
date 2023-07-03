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
} from '@mui/material';

const BoilerModal = ({ open, onClose, onSave, formData, handleChange }) => {
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
        <Box display={'flex'} alignItems={'center'}>
          <Typography variant='subtitle1'>Main Control Valve:</Typography>
          <RadioGroup
            sx={{
              margin: '0 50px',
            }}
            name='mainValveControls'
            value={formData.mainValveControls}
            onChange={handleChange}
            row
          >
            <FormControlLabel value='on' control={<Radio />} label='On' />
            <FormControlLabel value='off' control={<Radio />} label='Off' />
          </RadioGroup>
        </Box>

        <TextField
          name='feedPump1'
          label='Feed Pump Number 1'
          value={formData.feedPump1}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          name='feedPump2'
          label='Feed Pump Number 2'
          value={formData.feedPump2}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          name='waterLevel'
          label='Water Level'
          value={formData.waterLevel}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          name='feedWater'
          label='Feed Water Analysis'
          value={formData.feedWater}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          name='blowDown'
          label='Blow Down Analysis'
          value={formData.blowDown}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant='contained' color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoilerModal;
