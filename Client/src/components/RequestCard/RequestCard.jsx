import { Card, Grid, Button, Typography, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setRequests, setApproved } from '../../slices/requestSlice';
import useStyles from './styles';
const RequestCard = ({ request }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { requests, approved } = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  const classes = useStyles();
  const acceptHandler = async () => {
    try {
      const response = await fetch(
        `/api/company/${userInfo.company}/requests/${request._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'accept' }),
        }
      );

      if (response.ok) {
        dispatch(
          setRequests(requests.filter((req) => req._id !== request._id))
        );
        dispatch(setApproved([...approved, request]));
        toast.success('Request accepted');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred.');
    }
  };

  const rejectHandler = async () => {
    try {
      const response = await fetch(
        `/api/company/${userInfo.company}/requests/${request._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'reject' }),
        }
      );

      if (response.ok) {
        dispatch(
          setRequests(requests.filter((req) => req._id !== request._id))
        );
        toast.success('Request rejected');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred.');
    }
  };
  console.log(request);

  return (
    <Card className={classes.card}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='body2'>
            <strong>Name:</strong> {`${request.fname} ${request.lname}`}
          </Typography>
          <Typography variant='body2'>
            <strong>Email:</strong> {request.email}
          </Typography>
          <Typography variant='body2'>
            <strong>Phone:</strong> {request.phone}
          </Typography>
        </Grid>
        <Divider style={{ width: '100%' }} />
        <Grid item xs={12}>
          <Grid container justifyContent='flex-end' spacing={1}>
            <Grid item>
              <Button variant='contained' onClick={acceptHandler}>
                Accept
              </Button>
            </Grid>
            <Grid item>
              <Button variant='contained' onClick={rejectHandler}>
                Reject
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RequestCard;
