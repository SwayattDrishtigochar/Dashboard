import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PendingApproval from '../components/PendingApproval';

const AdminControlScreen = () => {
  return (
    <Container fluid className=''>
      <Col>
        <Row>
          <PendingApproval />
        </Row>
        <Row>Approved user</Row>
      </Col>
    </Container>
  );
};

export default AdminControlScreen;
