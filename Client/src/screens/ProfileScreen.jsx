import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setFirstName(userInfo.fname);
    setLastName(userInfo.lname);
    setEmail(userInfo.email);
    setPhoneNumber(userInfo.phone);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        fname: firstName,
        lname: lastName,
        phone: phoneNumber,
        email,
      }).unwrap();
      console.log(res);
      dispatch(setCredentials(res));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <FormContainer>
      <h1
        className='mb-5'
        style={{
          textAlign: 'center',
        }}
      >
        Update Profile
      </h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <FloatingLabel label='First Name'>
            <Form.Control
              type='name'
              placeholder='Enter first name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='my-2' controlId='name'>
          <FloatingLabel label='Last Name'>
            <Form.Control
              type='name'
              placeholder='Enter last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <FloatingLabel label='Mobile number'>
            <Form.Control
              type='number'
              placeholder='Enter phone number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <FloatingLabel label='Email'>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
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
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
