import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  inputStyle: {
    width: '50px !important',
    height: '50px',
    margin: '0 1rem',
    fontSize: '20px',
    borderRadius: '4px',
    border: '1px solid black',
  },
  button: {
    borderRadius: '10px !important',
    padding: '10px !important',
    margin: '5px 5px !important',
    width: '75%',

    [theme.breakpoints.down('md')]: {},
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));
