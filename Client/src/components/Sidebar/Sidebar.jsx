import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <div>
      <Typography variant='h6' align='center' gutterBottom>
        Sidebar
      </Typography>
      <List>
        <ListItem button component={Link} to='/'>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button component={Link} to='/dashboard'>
          <ListItemText primary='Dashboard' />
        </ListItem>
        {/* Add more sidebar items here */}
      </List>
    </div>
  );
};

export default Sidebar;
