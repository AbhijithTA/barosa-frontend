import { Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetCurrentOrder, selectCurrentOrder } from '../features/order/OrderSlice';
import { selectUserInfo } from '../features/user/UserSlice';
import { orderSuccessAnimation } from '../assets';
import Lottie from 'lottie-react';
import { axiosi } from '../config/axios';

export const OrderSuccessPage = () => {
  const { id: sessionId } = useParams(); // Extract sessionId from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOrder = useSelector(selectCurrentOrder); // Get currentOrder from Redux
  const userDetails = useSelector(selectUserInfo); // Get user details from Redux
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const [order, setOrder] = useState(null); // Local state to store fetched order
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch order details using sessionId
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosi.get(`/checkout/get-order?session_id=${sessionId}`);
        setOrder(response.data.order); // Set the fetched order in local state
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to fetch order details. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (sessionId) {
      fetchOrder();
    }
  }, [sessionId]);

  // Redirect if currentOrder is missing
  useEffect(() => {
    if (!currentOrder) {
      navigate('/');
    }
  }, [currentOrder, navigate]);

  // Reset currentOrder when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetCurrentOrder());
    };
  }, [dispatch]);

  // Show loading state
  if (loading) {
    return (
      <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h6">Loading order details...</Typography>
      </Stack>
    );
  }

  // Show error state
  if (error) {
    return (
      <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Go to Home
        </Button>
      </Stack>
    );
  }

  return (
    <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Stack
        component={Paper}
        boxShadow={is480 ? 'none' : ''}
        rowGap={3}
        elevation={1}
        p={is480 ? 1 : 4}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box width={'10rem'} height={'7rem'}>
          <Lottie animationData={orderSuccessAnimation} />
        </Box>

        <Stack mt={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'} rowGap={1}>
          <Typography variant="h6" fontWeight={400}>
            Hey {userDetails?.name}
          </Typography>
          <Typography variant="h5">Your Order #{order?._id || currentOrder?._id} is confirmed</Typography>
          <Typography variant="body2" color="text.secondary">
            Thank you for shopping with us ❤️
          </Typography>
        </Stack>

        <Button
          component={Link}
          to={'/orders'}
          onClick={() => dispatch(resetCurrentOrder())}
          size={is480 ? 'small' : ''}
          variant="contained"
        >
          Check order status in my orders
        </Button>
      </Stack>
    </Stack>
  );
};