import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader/Loader';
import { useUpdateUserMutation } from '../../../slices/userApiSlice';
import { setCredentials } from '../../../slices/authSlice';

import FormContainer from '../../../components/FormContainer/FormContainer';

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setFirstName(userInfo?.fname);
    setLastName(userInfo?.lname);
    setEmail(userInfo?.email);
    setPhoneNumber(userInfo?.phone);
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

      <form onSubmit={submitHandler}>
        <TextField
          id='firstName'
          label='First Name'
          variant='outlined'
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin='normal'
          required
        />

        <TextField
          id='lastName'
          label='Last Name'
          variant='outlined'
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin='normal'
          required
        />

        <TextField
          id='phoneNumber'
          label='Mobile number'
          variant='outlined'
          fullWidth
          type='number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin='normal'
          required
        />

        <TextField
          id='email'
          label='Email'
          variant='outlined'
          fullWidth
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin='normal'
          required
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          fullWidth
          disableElevation
          style={{ marginTop: '1rem' }}
        >
          Update
        </Button>

        {isLoading && <Loader />}
      </form>
    </FormContainer>
  );
};

export default ProfileScreen;
