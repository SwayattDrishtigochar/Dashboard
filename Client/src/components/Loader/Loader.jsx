import { CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <CircularProgress
      size={40}
      style={{
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
};

export default Loader;
