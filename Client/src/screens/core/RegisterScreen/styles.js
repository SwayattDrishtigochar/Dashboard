import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  button: {
    borderRadius: '10px !important',
    padding: '10px !important',
    margin: '5px 5px !important',
    width: '100%',

    [theme.breakpoints.down('md')]: {},
  },
}));
