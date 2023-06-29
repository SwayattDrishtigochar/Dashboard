import { useEffect } from 'react';
import { useGetApprovedUsersQuery } from '../../slices/adminApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setApproved } from '../../slices/requestSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ApprovedUsers = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { approved } = useSelector((state) => state.requests);
  const { data, isLoading, error } = useGetApprovedUsersQuery(
    userInfo?.company
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setApproved(data));
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Approved Users</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='approved users table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  {/* Additional table headers */}
                </TableRow>
              </TableHead>
              <TableBody>
                {approved ? (
                  approved.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{`${user.fname} ${user.lname}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      {/* Additional user details */}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No Approved Users</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default ApprovedUsers;
