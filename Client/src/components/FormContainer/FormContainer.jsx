import { Box, Container, Grid } from '@mui/material';
import useStyles from './styles';
import ImgUrl from '../../assets/form.png';

const FormContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item lg={4} md={6} sm={12}>
          <img src={ImgUrl} alt='Image' className={classes.image} />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          sm={12}
          sx={{
            px: '0 !important',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormContainer;
