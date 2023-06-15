import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, FloatingLabel, Modal } from 'react-bootstrap';
import { useForgetPasswordMutation } from '../slices/userApiSlice';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const emailRef = useRef('');
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); // State for controlling the modal visibility

  const [forgetPassword, { isLoading, error }] = useForgetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    try {
      const res = await forgetPassword({
        email,
      }).unwrap();
      setShowModal(true); // Show the modal on successful submission
      toast.success('Mail Sent');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    navigate('/'); // Redirect the user to the login page
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
            <h2 className='m-3'>Forgot Password</h2>
            <p>No worries, we will send you reset instructions</p>
            <Form onSubmit={submitHandler} className='w-100'>
              <Form.Group controlId='email' className='mb-3'>
                <FloatingLabel label='Email'>
                  <Form.Control
                    style={{
                      border: '1px solid black',
                    }}
                    type='email'
                    placeholder='Enter email'
                    ref={emailRef}
                  />
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
                {isLoading ? <Loader /> : 'Submit'}
              </Button>
            </Form>
          </Col>
        </Row>
      </FormContainer>

      {/* Modal Popup */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Email Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Check your email for reset instructions.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgotPassword;
