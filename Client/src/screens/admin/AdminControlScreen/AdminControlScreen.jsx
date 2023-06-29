import { Box, Grid } from '@mui/material';
import PendingApproval from '../../../components/PendingApproval/PendingApproval';
import ApprovedUsers from '../../../components/ApprovedUsers/ApprovedUsers';

const AdminControlScreen = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PendingApproval />
        </Grid>
        <Grid item xs={12}>
          <ApprovedUsers />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminControlScreen;
