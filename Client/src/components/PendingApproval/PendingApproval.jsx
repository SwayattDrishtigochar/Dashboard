import { useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, Box } from '@mui/material';
import Loader from '../../components/Loader/Loader';
import RequestCard from '../RequestCard/RequestCard';
import { useGetRequestsQuery } from '../../slices/adminApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setRequests } from '../../slices/requestSlice';

const PendingApproval = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { requests } = useSelector((state) => state.requests);
  const { data, isLoading, error, refetch } = useGetRequestsQuery(
    userInfo?.company
  );
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const refresh = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      dispatch(setRequests(data));
    }
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRequests = requests.filter((request) => {
    const fullName = `${request.fname} ${request.lname}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Box
      sx={{
        p: 3,
        my: 2,
        backgroundColor: '#B3CDD1',
        borderRadius: '5px',
      }}
    >
      <Grid container alignItems='center' spacing={2}>
        <Grid item xs={12} sm={12} lg={12} p='0'>
          <h3>Approvals Pending</h3>
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <TextField
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} sm={4} lg={4}>
          <Button
            onClick={refresh}
            variant='contained'
            sx={{
              height: '45px',
            }}
          >
            Refresh
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        {isLoading ? (
          <Loader />
        ) : (
          filteredRequests.map((request) => (
            <Grid item key={request._id} xs={12} sm={6} md={3} lg={2}>
              <RequestCard request={request} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PendingApproval;
