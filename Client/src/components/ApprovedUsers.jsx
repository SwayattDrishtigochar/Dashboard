import React, { useEffect } from 'react';
import { useGetApprovedUsersQuery } from '../slices/adminApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setApproved } from '../slices/requestSlice';
import { Table } from 'react-bootstrap';

const ApprovedUsers = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { approved } = useSelector((state) => state.requests);
  const { data, isLoading, error } = useGetApprovedUsersQuery(userInfo.company);
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {/* Additional table headers */}
              </tr>
            </thead>
            <tbody>
              {approved?.map((user) => (
                <tr key={user.id}>
                  <td>{`${user.fname} ${user.lname}`}</td>
                  <td>{user.email}</td>
                  {/* Additional user details */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default ApprovedUsers;
