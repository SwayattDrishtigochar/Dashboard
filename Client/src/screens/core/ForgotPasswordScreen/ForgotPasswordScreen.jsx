import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  Typography,
  Modal,
  TextField,
} from '@mui/material';
import { useForgetPasswordMutation } from '../../../slices/userApiSlice';
import FormContainer from '../../../components/FormContainer/FormContainer';
import Loader from '../../../components/Loader/Loader';
import { toast } from 'react-toastify';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ForgotPasswordScreen = () => {
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
        <Container maxWidth='md'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 3,
            }}
          >
            <Typography variant='h4' component='h2' gutterBottom>
              Forgot Password
            </Typography>
            <Typography variant='body1' gutterBottom>
              No worries, we will send you reset instructions
            </Typography>
            <form onSubmit={submitHandler} style={{ width: '100%' }}>
              <FormControl fullWidth margin='normal'>
                <TextField
                  label='Email'
                  placeholder='Enter email'
                  inputRef={emailRef}
                  variant='outlined'
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ color: 'gray' }} />,
                  }}
                />
              </FormControl>

              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                style={{
                  background: '#AD3D17',
                  borderRadius: '15px',
                }}
              >
                {isLoading ? <Loader /> : 'Submit'}
              </Button>
            </form>
          </Box>
        </Container>
      </FormContainer>

      {/* Modal Popup */}
      <Modal open={showModal} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green' }} />
          <Typography variant='h6' component='h2' gutterBottom>
            Email Sent
          </Typography>
          <Typography variant='body1' gutterBottom>
            Check your email for reset instructions.
          </Typography>
          <Button variant='contained' onClick={closeModal}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ForgotPasswordScreen;
