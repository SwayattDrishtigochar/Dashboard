import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
} from '@mui/material';
import {
  AccountCircle,
  Lock,
  Email,
  Phone,
  Business,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../../slices/authApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { toast } from 'react-toastify';
import FormContainer from '../../../components/FormContainer/FormContainer';
import Loader from '../../../components/Loader/Loader';
import useStyles from './styles';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, error }] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        fname: firstName,
        lname: lastName,
        company: organizationName,
        phone: phoneNumber,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      toast.success('OTP Sent');
      navigate('/otp');
    } catch (err) {
      toast.error('Something went wrong');
      console.log(err?.data?.message || err?.error);
    }
  };

  return (
    <FormContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 3,
          width: '60%',
        }}
      >
        <Typography variant='h4' component='h2' gutterBottom>
          Register
        </Typography>
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='First Name'
              value={firstName}
              error={error}
              onChange={(e) => setFirstName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Last Name'
              value={lastName}
              error={error}
              onChange={(e) => setLastName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Mobile Number'
              value={phoneNumber}
              error={error}
              onChange={(e) => setPhoneNumber(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Email'
              value={email}
              error={error}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <Select
              value={organizationName}
              error={error}
              onChange={(e) => setOrganizationName(e.target.value)}
              displayEmpty
              renderValue={(value) => {
                if (value === '') {
                  return <em>Select an organization</em>;
                }
                return value;
              }}
              inputProps={{ 'aria-label': 'organization' }}
              startAdornment={
                <InputAdornment position='start'>
                  <Business />
                </InputAdornment>
              }
            >
              <MenuItem value=''>Select an organization</MenuItem>
              <MenuItem value='64743f9bc481a6f675df7774'>Impcops</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Confirm Password'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              // helperText={error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            className={classes.button}
            sx={{ mt: 2, mb: 1 }}
          >
            {isLoading ? <Loader /> : 'Register'}
          </Button>
        </form>
        <Typography variant='body1' sx={{ mt: 3 }}>
          Already have an account? <Link to='/login'>Login here</Link>
        </Typography>
      </Box>
    </FormContainer>
  );
};

export default RegisterScreen;
