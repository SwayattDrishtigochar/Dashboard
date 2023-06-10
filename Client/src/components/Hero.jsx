import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ImgUrl from '../assets/test.jpg';

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Container fluid className='p-3'>
      <Row className='w-100'>
        <Col lg={6} md={6} sm={12} className='bg-dark p-0 d-none d-md-block'>
          <img src={ImgUrl} height={''} alt='Image' className='w-100' />
        </Col>

        <Col
          lg={6}
          md={6}
          sm={12}
          className='d-flex flex-column justify-content-center align-items-center'
        >
          <h1 className='py-5'>Welcome to Dashboard</h1>
          {userInfo ? (
            <LinkContainer
              to='/dash'
              className='w-100 my-2 py-3'
              style={{
                background: '#AD3D17',
                borderRadius: '15px',
              }}
            >
              <Button>Dashboard</Button>
            </LinkContainer>
          ) : (
            <>
              <LinkContainer
                to='/login'
                className='w-100 my-2 py-3'
                style={{
                  background: '#AD3D17',
                  borderRadius: '15px',
                }}
              >
                <Button>Login</Button>
              </LinkContainer>
              <LinkContainer
                to='/register'
                className='w-100 my-2 py-3'
                style={{
                  background: '#AD3D17',
                  borderRadius: '15px',
                }}
              >
                <Button>Register</Button>
              </LinkContainer>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
