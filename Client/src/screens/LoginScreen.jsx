import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
  InputGroup,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/authApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaEnvelopeOpenText } from 'react-icons/fa';

const LoginScreen = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  useEffect(() => {
    if (userInfo) {
      navigate('/dash');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const res = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/dash');
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
    setValidated(true);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    navigate('/forget-password');
  };
  return (
    <>
      <FormContainer>
        <Row className='d-flex justify-content-md-center w-100 h-100'>
          <Col
            xs={12}
            md={6}
            className='w-100 d-flex flex-column justify-content-center align-items-center'
          >
            <h2 className='m-3'>Login</h2>
            <p className='h4 mb-3'>Welcome back!</p>
            <Form
              onSubmit={submitHandler}
              noValidate
              validated={validated}
              className='w-100'
            >
              <Form.Group controlId='email' className='mb-3'>
                <InputGroup>
                  <InputGroup.Text id='basic-addon1'>
                    <FaEnvelopeOpenText />
                  </InputGroup.Text>
                  {/* <FloatingLabel label='Email'> */}
                  <Form.Floating>
                    <Form.Control
                      style={{
                        border: '1px solid ',
                      }}
                      required
                      type='email'
                      placeholder='Enter email'
                      ref={emailRef}
                    />

                    <label htmlFor='email'>Email</label>
                  </Form.Floating>
                  {/* </FloatingLabel> */}
                </InputGroup>
                <Form.Control.Feedback type='invalid'>
                  Please provide a valid Email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                controlId='password'
                style={{
                  position: 'relative',
                }}
              >
                <FloatingLabel label='Password'>
                  <Form.Control
                    required
                    style={{
                      border: '1px solid black',
                    }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    ref={passwordRef}
                  />
                  <div
                    onClick={toggleShowPassword}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </FloatingLabel>
              </Form.Group>

              <Button
                type='submit'
                variant='primary'
                className='w-100 my-3 py-3 '
                style={{
                  background: '#AD3D17',
                  borderRadius: '15px',
                }}
              >
                {isLoading ? <Loader /> : 'Log In'}
              </Button>
              <Button
                variant='link'
                className='text-decoration-none mb-3'
                onClick={handleForgetPassword}
              >
                Forgot Password?
              </Button>
            </Form>

            <Row className='py-3'>
              <Col>
                Dont registered yet? <Link to='/register'>Register here</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
