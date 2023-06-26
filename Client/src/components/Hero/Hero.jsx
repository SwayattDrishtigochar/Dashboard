import {
  Container,
  Grid,
  Button,
  Box,
  Paper,
  Card,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImgUrl from '../../assets/test.jpg';
import useStyles from './styles';
import FormContainer from '../FormContainer/FormContainer';

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const classes = useStyles();

  return (
    <FormContainer>
      <Box className={classes.hero}>
        <Typography variant='h3' m={5} textAlign='center'>
          Welcome to Dashboard
        </Typography>

        {userInfo ? (
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/dash'
            className={classes.button}
          >
            Dashboard
          </Button>
        ) : (
          <>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: { sm: 'column', md: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant='contained'
                color='primary'
                component={Link}
                to='/login'
                className={classes.button}
              >
                Login
              </Button>
              <Button
                variant='contained'
                color='primary'
                component={Link}
                to='/register'
                className={classes.button}
              >
                Register
              </Button>
            </Box>
          </>
        )}
      </Box>
    </FormContainer>
  );
};

export default Hero;
