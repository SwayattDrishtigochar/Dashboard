import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  hero: {
    padding: '10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    borderRadius: '10px !important',
    padding: '10px !important',
    margin: '5px 5px !important',
    width: '300px',
    [theme.breakpoints.down('md')]: {},
  },
}));
