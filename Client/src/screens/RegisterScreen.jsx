import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  Spinner,
  FloatingLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/authApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, error }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/');
  //   }
  // }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    e.preventDefault();
    try {
      const res = await register({
        fname: firstName,
        lname: lastName,
        company: organizationName,
        phone: phoneNumber,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      toast.success(res.message);
      navigate('/otp');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
    setValidated(true);
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
            <h2 className='my-4'>Register</h2>
            <Form
              noValidate
              validated={validated}
              onSubmit={submitHandler}
              className='w-100'
            >
              <Row>
                <Col>
                  <Form.Group controlId='firstName'>
                    <FloatingLabel label='First Name'>
                      <Form.Control
                        style={{
                          border: '1px solid black',
                        }}
                        type='text'
                        placeholder='Enter first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='lastName'>
                    <FloatingLabel label='Last Name'>
                      <Form.Control
                        style={{
                          border: '1px solid black',
                        }}
                        type='text'
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId='phoneNumber' className='mt-3'>
                <FloatingLabel label='Mobile Number'>
                  <Form.Control
                    style={{
                      border: '1px solid black',
                    }}
                    type='text'
                    placeholder='Enter phone number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group controlId='organizationName' className='mt-3'>
                <Form.Select
                  style={{
                    border: '1px solid black',
                    height: '60px',
                  }}
                  onChange={(e) => setOrganizationName(e.target.value)}
                >
                  <option value=''>Select Company</option>
                  <option value='64743f9bc481a6f675df7774'>Impcops</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId='email' className='mt-3'>
                <FloatingLabel label='Email'>
                  <Form.Control
                    style={{
                      border: '1px solid black',
                    }}
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group controlId='password' className='mt-3'>
                <FloatingLabel label='Password'>
                  <Form.Control
                    style={{
                      border: '1px solid black',
                    }}
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
              {/* <Form.Text id='passwordHelpBlock' muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text> */}

              <Form.Group controlId='confirmPassword' className='mt-3'>
                <FloatingLabel label='Confirm Password'>
                  <Form.Control
                    style={{
                      border: '1px solid black',
                    }}
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
              {/* <Form.Group className='mt-3'>
                <Form.Check
                  required
                  label='Agree to terms and conditions'
                  feedback='You must agree before submitting.'
                  feedbackType='invalid'
                />
              </Form.Group> */}

              <Button
                type='submit'
                variant='primary'
                className='w-100 my-3 py-3 '
                style={{
                  background: '#AD3D17',
                  borderRadius: '15px',
                }}
              >
                {isLoading ? (
                  <div className='d-flex justify-content-center align-items-center'>
                    <Spinner animation='border' role='status'></Spinner>
                  </div>
                ) : (
                  'Register'
                )}
              </Button>
            </Form>

            <Row className='py-3'>
              <Col>
                Already have an account? <Link to='/login'>Login</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
