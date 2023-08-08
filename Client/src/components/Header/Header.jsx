import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import useStyles from './styles';

import {
  AccountCircle,
  ExitToApp,
  Person,
  Settings,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/authApiSlice';
import { logout } from '../../slices/authSlice';
import Logo from '../../assets/logo.png';

const Header = () => {
  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
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
      <Toolbar>
        <Link to='/'>
          <img src={Logo} alt='Logo' className={classes.logo} />
        </Link>
        <Typography variant='h6' className={classes.title}>
          IMPCOPS
        </Typography>
        {userInfo ? (
          <>
            <IconButton
              aria-controls={open ? 'menu-appbar' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              color='inherit'
              onClick={handleMenuOpen}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              id='menu-appbar'
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
              {/* {userInfo.role === 'admin' ? (
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    to={`/company/${userInfo.company}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Settings style={{ marginRight: '8px' }} />
                    Settings
                  </Link>
                </MenuItem>
              ) : null} */}
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
            {/* //!Disabled for MVP */}
            {/* <Button color='inherit' component={Link} to='/register'>
              <Person style={{ marginRight: '8px' }} />
              Sign Up
            </Button> */}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
