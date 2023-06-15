import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useResetPasswordMutation } from '../slices/userApiSlice';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordResetScreen = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { userId, token } = useParams();

  const navigate = useNavigate();

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  console.log(error);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let res = await resetPassword({
        userId,
        token,
        password: { password },
      }).unwrap();
      toast.success('Password changed successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
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
            <h2 className='m-5'>Reset Password</h2>
            <Form onSubmit={submitHandler} className='w-100'>
              <Form.Group
                controlId='password'
                style={{
                  position: 'relative',
                }}
              >
                <FloatingLabel label='Password'>
                  <Form.Control
                    style={{
                      border: '1px solid black',
                    }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <Form.Group controlId='cpassword' className='mt-3'>
                <FloatingLabel label='Confirm Password'>
                  <Form.Control
                    style={{
                      border: '1px solid black',
                    }}
                    type='password'
                    placeholder='Confirm Password'
                    // ref={emailRef}
                  />
                </FloatingLabel>
              </Form.Group>

              <Button
                type='submit'
                className='w-100 my-3 py-3 '
                style={{
                  background: '#AD3D17',
                  borderRadius: '15px',
                }}
              >
                {isLoading ? <Loader /> : 'Submit'}
              </Button>
            </Form>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default PasswordResetScreen;
