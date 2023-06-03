import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useVerifyOtpMutation } from '../slices/authApiSlice';
import { toast } from 'react-toastify';
import OtpInput from 'react-otp-input';

const OtpScreen = () => {
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const [verifuOtp, { isLoading, error }] = useVerifyOtpMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verifuOtp({
        email: userInfo.email,
        otp: otp,
      }).unwrap();
      //   dispatch(setCredentials({ ...res }));
      console.log(res);
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <>
      <FormContainer>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2>Verify Email</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={userInfo?.email}
                />
              </Form.Group>

              <Form.Group controlId='otp'>
                <Form.Label>OTP</Form.Label>
                <OtpInput
                  inputStyle='inputStyle'
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  inputType={'number'}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </Form.Group>

              <Button type='submit' variant='primary'>
                Submit
              </Button>
            </Form>

            <Row className='py-3'>
              <Col>
                Didnt recieved otp? <Button variant='primary'>Resend</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </FormContainer>
      ;
    </>
  );
};

export default OtpScreen;
