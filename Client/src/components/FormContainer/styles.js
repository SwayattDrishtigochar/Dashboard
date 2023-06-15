import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: 0,
  },
  image: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
