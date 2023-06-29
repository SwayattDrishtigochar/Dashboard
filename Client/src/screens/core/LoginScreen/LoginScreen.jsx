import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../../slices/authApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { toast } from 'react-toastify';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import FormContainer from '../../../components/FormContainer/FormContainer';
import Loader from '../../../components/Loader/Loader';
import useStyles from './styles';

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading, error, isError }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const isFormValid = email && password;

  useEffect(() => {
    if (userInfo) {
      navigate('/dash');
    }
  }, [navigate, userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/dash');
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <FormContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 3,
        }}
      >
        <Typography variant='h4' component='h2' gutterBottom>
          Login
        </Typography>
        <Typography variant='h6' component='p' gutterBottom>
          Welcome back!
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              // helperText={error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              // helperText={error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IconButton onClick={toggleShowPassword} edge='start'>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button
            component={Link}
            to='/forget-password'
            variant='text'
            sx={{ mb: 3, textAlign: 'right' }}
          >
            Forgot Password?
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={!isFormValid}
            className={classes.button}
            sx={{ mt: 2, mb: 1 }}
          >
            {isLoading ? <Loader /> : 'Log In'}
          </Button>

          <Typography variant='body1' textAlign='center' mt={2}>
            Dont have an account? <Link to='/register'>Register here</Link>
          </Typography>
        </form>
      </Box>
    </FormContainer>
  );
};

export default LoginScreen;
