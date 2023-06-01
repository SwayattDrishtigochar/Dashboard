/* eslint-disable react/prop-types */
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col lg={6}>
          <img src='path_to_image' alt='Image' className='img-fluid' />
        </Col>
        <Col lg={6}>
          <div className='form-container'>{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
