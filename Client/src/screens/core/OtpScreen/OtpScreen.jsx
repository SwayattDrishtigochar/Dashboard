import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, FormControl, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../../components/FormContainer/FormContainer';
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from '../../../slices/authApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { toast } from 'react-toastify';
import OtpInput from 'react-otp-input';
import useStyles from './styles';

const OtpScreen = () => {
  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp({
        email: userInfo.email,
        otp: otp,
      }).unwrap();

      toast.success('Email Verified');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const resetHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await resendOtp({
        email: userInfo.email,
      }).unwrap();
      toast.success('OTP Sent');
      setMinutes(1);
      setSeconds(59);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <FormContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 3,
        }}
      >
        <Typography variant='h4' gutterBottom>
          Verify Email
        </Typography>
        <form onSubmit={submitHandler} className={classes.form}>
          <FormControl fullWidth margin='normal'>
            <Typography variant='body1' gutterBottom>
              Email Sent to
            </Typography>
            <Typography variant='body2'>{userInfo?.email}</Typography>
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <OtpInput
              containerStyle={{
                justifyContent: 'center',
                margin: '10px',
              }}
              inputStyle={classes.inputStyle}
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputType={'number'}
              // renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </FormControl>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ mt: 3, mb: 2 }}
            className={classes.button}
          >
            Continue
          </Button>
        </form>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
          }}
        >
          {seconds > 0 || minutes > 0 ? (
            <Typography variant='body2'>
              Resend code in:{' '}
              {`${minutes < 10 ? `0${minutes}` : minutes}:${
                seconds < 10 ? `0${seconds}` : seconds
              }`}
            </Typography>
          ) : (
            <Typography variant='body2'>Didn't receive code?</Typography>
          )}
          <Button
            onClick={resetHandler}
            disabled={seconds > 0 || minutes > 0}
            sx={{ ml: 1 }}
          >
            Resend
          </Button>
        </Box>
      </Box>
    </FormContainer>
  );
};

export default OtpScreen;
