import { Container, Row, Col } from 'react-bootstrap';
import ImgUrl from '../assets/test.jpg';

const FormContainer = ({ children }) => {
  return (
    <Container fluid className='p-3'>
      <Row className='w-100'>
        <Col lg={3} md={6} sm={12} className='p-0'>
          <img src={ImgUrl} alt='Image' className='w-100  d-none d-md-block' />
        </Col>
        <Col lg={6} md={6} sm={12} className=''>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
