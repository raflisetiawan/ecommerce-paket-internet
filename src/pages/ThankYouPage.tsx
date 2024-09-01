import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { showOrder } from '../services/checkoutService';

interface OrderDetails {
  orderId: string;
  packageName: string;
  validity: string;
  price: number;
}

function ThankYouPage() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const mockOrderDetails = async() => {
      if(orderId){
        const response = await showOrder(orderId);
        setOrderDetails(response);
      }
    }
    mockOrderDetails();
  }, [orderId]);

  const handleGoToHome = () => {
    navigate('/customer');
  };

  if (!orderDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Terima Kasih atas Pembelian Anda!
      </Typography>
      <Box sx={{ p: 4, border: '1px solid #ccc', borderRadius: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Nomor Pesanan: {orderDetails.orderId}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Paket yang Dibeli: {orderDetails.packageName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Masa Aktif: {orderDetails.validity}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total Harga: Rp {orderDetails.price.toLocaleString()}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Paket data akan segera aktif dalam 10 menit. Pastikan nomor Anda memiliki cukup saldo.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoToHome}>
        Kembali ke Beranda
      </Button>
    </Container>
  );
}

export default ThankYouPage;
