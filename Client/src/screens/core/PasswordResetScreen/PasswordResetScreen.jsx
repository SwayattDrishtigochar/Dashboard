import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import { useResetPasswordMutation } from '../../../slices/userApiSlice';
import FormContainer from '../../../components/FormContainer/FormContainer';
import Loader from '../../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordResetScreen = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { userId, token } = useParams();

  const navigate = useNavigate();

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  console.log(error);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let res = await resetPassword({
        userId,
        token,
        password: { password },
      }).unwrap();
      toast.success('Password changed successfully');
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <FormContainer>
        <Container maxWidth='md'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 3,
            }}
          >
            <Typography variant='h4' component='h2' gutterBottom>
              Reset Password
            </Typography>
            <form onSubmit={submitHandler} style={{ width: '100%' }}>
              <FormControl fullWidth margin='normal'>
                <TextField
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </FormControl>
              <FormControl fullWidth margin='normal'>
                <TextField
                  label='Confirm Password'
                  type='password'
                  placeholder='Confirm Password'
                  variant='outlined'
                />
              </FormControl>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                style={{
                  background: '#AD3D17',
                  borderRadius: '15px',
                }}
              >
                {isLoading ? <Loader /> : 'Submit'}
              </Button>
            </form>
          </Box>
        </Container>
      </FormContainer>
    </>
  );
};

export default PasswordResetScreen;
