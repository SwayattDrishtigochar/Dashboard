import { Container, Grid } from '@mui/material';
import useStyles from './styles';
import ImgUrl from '../../assets/form.png';

const FormContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} sm={12}>
          <img src={ImgUrl} alt='Image' className={classes.image} />
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormContainer;
