import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PendingApproval from '../components/PendingApproval';
import ApprovedUsers from '../components/ApprovedUsers';

const AdminControlScreen = () => {
  return (
    <Container fluid className=''>
      <Col>
        <Row>
          <PendingApproval />
        </Row>
        <Row>
          <ApprovedUsers />
        </Row>
      </Col>
    </Container>
  );
};

export default AdminControlScreen;
