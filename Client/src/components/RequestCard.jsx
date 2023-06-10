import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const RequestCard = ({ request }) => {
  const { userInfo } = useSelector((state) => state.auth);

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
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('Failed to accept the request.');
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
    } catch (error) {
      console.log(error);
      toast.error('An error occurred.');
    }
  };
  return (
    <Card
      style={{
        fontSize: '15px',
      }}
    >
      <Card.Body>
        {/* <Card.Text>Card 1 content</Card.Text> */}
        <Row>
          <Col>
            <p>Name: {`${request.fname} ${request.lname}`}</p>
            <p>Email: {request.email}</p>
            <p>Phone: {request.phone}</p>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col className='d-flex justify-content-between'>
            <Button variant='success' className='me-2' onClick={acceptHandler}>
              Accept
            </Button>
            <Button variant='danger' onClick={rejectHandler}>
              Reject
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default RequestCard;
