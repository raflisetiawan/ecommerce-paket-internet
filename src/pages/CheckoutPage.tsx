import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { formatCurrency } from '../utils/formatCurrency';
import { fetchPackage, postOrder } from '../services/checkoutService';
import { PackageData } from '../types/checkout';
import { useAuthStore } from '../stores/authStore';

const paymentMethods = [
  { value: 'bank_transfer', label: 'Transfer Bank' },
  { value: 'credit_card', label: 'Kartu Kredit' },
  { value: 'e_wallet', label: 'Dompet Digital' }
];

function CheckoutPage() {
  const { packageId } = useParams<{ packageId: string }>();
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<string>('');
  const [error, setError] = useState<string>('');
  const userState = useAuthStore((state) => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    const getPackage = async () => {
      try {
        const response = await fetchPackage(packageId);
        
        setSelectedPackage(response);
      } catch (error) {
        console.error('Error fetching package:', error);
      }
    };
    
    if (packageId) {
      getPackage();
    }
  }, [packageId]);

  const handleConfirmPurchase = async () => {
    if (!paymentMethod || !paymentDetails) {
      setError('Harap pilih metode pembayaran dan isi detail pembayaran.');
      return;
    }

    try {
      if(userState !== null && packageId !== undefined){
       const response = await postOrder({
          userId: userState.id,
          paymentMethod,
          packageId,
          purchaseDate: Date.now()
        })
        navigate(`/thankyou/${response.id}`);
      }
    } catch (error) {
      console.error('Error during purchase:', error);
    }
  };

  if (!selectedPackage) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Konfirmasi Pembelian
      </Typography>
      <Box sx={{ p: 4, border: '1px solid #ccc', borderRadius: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {selectedPackage.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Deskripsi: {selectedPackage.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Masa Aktif: {selectedPackage.validity}
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          Total Harga: {formatCurrency(selectedPackage.price)}
        </Typography>

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="payment-method-label">Metode Pembayaran</InputLabel>
          <Select
            labelId="payment-method-label"
            id="payment-method"
            value={paymentMethod}
            label="Metode Pembayaran"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            {paymentMethods.map((method) => (
              <MenuItem key={method.value} value={method.value}>
                {method.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {paymentMethod && (
          <TextField
            fullWidth
            label={
              paymentMethod === 'bank_transfer'
                ? 'Nomor Rekening'
                : paymentMethod === 'credit_card'
                ? 'Nomor Kartu Kredit'
                : 'ID Dompet Digital'
            }
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            sx={{ my: 2 }}
          />
        )}

        {error && <Typography color="error">{error}</Typography>}

        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmPurchase}
          fullWidth
        >
          Konfirmasi Pembelian
        </Button>
      </Box>
    </Container>
  );
}

export default CheckoutPage;
