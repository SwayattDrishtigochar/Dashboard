import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  AccountCircle,
  ExitToApp,
  Person,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/authApiSlice';
import { logout } from '../../slices/authSlice';
import Logo from '../../assets/logo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
  },
  logo: {
    marginRight: theme.spacing(2),
    width: 28,
    height: 40,
  },
  title: {
    flexGrow: 1,
  },
}));

const Demo = () => {
  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='static' className={classes.appBar}>
      <Container maxWidth='lg'>
        <Toolbar>
          <Link to='/'>
            <img src={Logo} alt='Logo' className={classes.logo} />
          </Link>
          <Typography variant='h6' className={classes.title}>
            Your App Name
          </Typography>
          {userInfo ? (
            <>
              <IconButton
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
                onClick={handleMenuOpen}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    to='/profile'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Person style={{ marginRight: '8px' }} />
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToApp style={{ marginRight: '8px' }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color='inherit' component={Link} to='/login'>
                <ExitToApp style={{ marginRight: '8px' }} />
                Sign In
              </Button>
              <Button color='inherit' component={Link} to='/register'>
                <Person style={{ marginRight: '8px' }} />
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Demo;
