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
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from '../slices/authApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import OtpInput from 'react-otp-input';

const OtpScreen = () => {
  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verifuOtp, { isLoading, error }] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verifuOtp({
        email: userInfo.email,
        otp: otp,
      }).unwrap();

      toast.success('Email Verified');
      navigate('/dash');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const resetHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await resendOtp({
        email: userInfo.email,
      }).unwrap();
      toast.success('OTP Sent');
      setMinutes(1);
      setSeconds(59);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
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
            <h2 className='mb-5'>Verify Email</h2>

            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <FloatingLabel label='Email'>
                  <Form.Control
                    plaintext
                    readOnly
                    type='email'
                    placeholder='Enter email'
                    value={userInfo?.email}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group controlId='otp' className='mt-3'>
                <OtpInput
                  inputStyle='inputStyle'
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputType={'number'}
                  // renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
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
                Continue
              </Button>
            </Form>

            <Row className='my-3 text-center'>
              <Col>
                {seconds > 0 || minutes > 0 ? (
                  <p>
                    Resend code in: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <p>Didnt recieve code?</p>
                )}
              </Col>
              <Col>
                <Button
                  onClick={resetHandler}
                  disabled={seconds > 0 || minutes > 0}
                >
                  Resend
                </Button>
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
