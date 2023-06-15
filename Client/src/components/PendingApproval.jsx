import React, { useEffect, useState } from 'react';
import {
  Container,
  Col,
  Row,
  Form,
  CardGroup,
  Card,
  Button,
} from 'react-bootstrap';
import Loader from '../components/Loader';
import RequestCard from './RequestCard';
import { useGetRequestsQuery } from '../slices/adminApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setRequests } from '../slices/requestSlice';

const PendingApproval = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { requests } = useSelector((state) => state.requests);
  const { data, isLoading, error } = useGetRequestsQuery(userInfo.company);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

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
    <Container
      className='p-3 my-2'
      style={{ backgroundColor: '#B3CDD1', borderRadius: '5px' }}
    >
      <Row>
        <Col>
          <h3>Approvals Pending</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Control
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form>
        </Col>
        <Col>
          <Button>Refresh</Button>
        </Col>
      </Row>
      <Row className='mt-3'>
        {isLoading ? (
          <Loader />
        ) : (
          filteredRequests.map((request) => {
            return (
              <Col key={request.email} sm={6} md={4} lg={3}>
                <RequestCard request={request} />
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default PendingApproval;
