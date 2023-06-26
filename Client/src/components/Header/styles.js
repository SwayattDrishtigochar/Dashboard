import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
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
