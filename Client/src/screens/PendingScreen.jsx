import { Container } from 'react-bootstrap';
import ImgUrl from '../assets/pending.png';
import { useSelector } from 'react-redux';

const PendingScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Container className='text-right'>
        <h1>Hello {userInfo?.fname}</h1>

        <p>
          Your account will be alotted soon by admin. You will recieve a mail
          regarding the approval.
        </p>

        <p>Thanks</p>

        <img src={ImgUrl} alt='' />
      </Container>
    </>
  );
};

export default PendingScreen;
