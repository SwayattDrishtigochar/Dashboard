import { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import BoilerModal from '../../components/BoilerModal/BoilerModal';
import {
  useGetBoilerDataQuery,
  useDeleteBoilerDataMutation,
} from '../../slices/boilerApiSlice';
import { addBoilerData } from '../../slices/boilerSlice';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';

const Boiler = () => {
  const [open, setOpen] = useState(false);

  const { boilerData } = useSelector((state) => state.boiler);

  const { data, isLoading, refetch } = useGetBoilerDataQuery();
  const [deleteBoilerData, response] = useDeleteBoilerDataMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(addBoilerData(data.data));
    }
  }, [data, dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    refetch();
  };
  // console.log(boilerData);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box position='relative'>
        <Typography variant='h6' align='center' gutterBottom>
          Boiler Data
        </Typography>
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>Time</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Steam Pressure
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Main Steam Valve Controls
                </TableCell>
                <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                  Feed Pump
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Water Level
                </TableCell>
                <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                  Water Analysis
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell style={{ textAlign: 'center' }}>Number 1</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Number 2</TableCell>
                <TableCell />
                <TableCell style={{ textAlign: 'center' }}>
                  Feed Water
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>Blow Down</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boilerData?.map((data, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.time}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.steamPressure}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.mainValveControls}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.feedPump1}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.feedPump2}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.waterLevel}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.feedWater}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {data.blowDown}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Button color='primary' variant='outlined'>
                      Edit
                    </Button>
                    <Button
                      color='primary'
                      variant='contained'
                      onClick={async (e) => {
                        e.preventDefault();
                        window.confirm('Confirm Delete');
                        const data = await deleteBoilerData(data._id);
                        console.log(data);
                        refetch();
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Button
        onClick={handleOpen}
        sx={{
          width: '100%',
          background: 'black',
          position: 'sticky',
          bottom: '0',
          margin: 'auto',
        }}
      >
        Add
      </Button>

      <BoilerModal open={open} onClose={handleClose} />
    </>
  );
};

export default Boiler;
