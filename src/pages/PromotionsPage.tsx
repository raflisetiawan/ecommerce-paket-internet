import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../config';
import { formatCurrency } from '../utils/formatCurrency';

interface PackageData {
  id: number;
  name: string;
  price: number;
  description: string;
  validity: string;
  isPromo: boolean;
}

function PromotionsPage() {
  const [promoPackages, setPromoPackages] = useState<PackageData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromoPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/packages`);
        const promoPackages = response.data.filter((pkg: PackageData) => pkg.isPromo);
        setPromoPackages(promoPackages);
      } catch (error) {
        console.error('Error fetching promo packages:', error);
      }
    };

    fetchPromoPackages();
  }, []);

  const handleBuyNow = (packageId: number) => {
    navigate(`/purchase/${packageId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Promosi dan Penawaran Khusus
      </Typography>
      <Grid container spacing={4}>
        {promoPackages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {pkg.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {pkg.description}
                </Typography>
                <Typography variant="body1" color="textPrimary" sx={{ mt: 1 }}>
                  {formatCurrency(pkg.price)}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Masa Aktif: {pkg.validity}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" onClick={() => handleBuyNow(pkg.id)}>
                    Beli Sekarang
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PromotionsPage;
