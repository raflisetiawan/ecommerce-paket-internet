import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid2, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

interface PackageData {
  id: number;
  name: string;
  price: number;
  description: string;
  validity: string;
  isPromo?: boolean; 
}

function Home() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/packages`);
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  const handlePurchase = (packageId: number) => {
    navigate(`/purchase/${packageId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ flexGrow: 1, mt: 8 }}>
      {/* Section: Promo Terbaru */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
          Promo Terbaru!
        </Typography>
        <Grid2 container spacing={4}>
          {packages
            .filter((pkg) => pkg.isPromo)
            .map((pkg) => (
              <Grid2  size={{xs: 12, sm: 6, md: 4}} key={pkg.id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
                    border: '2px solid #d32f2f',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Chip label="Promo" color="secondary" sx={{ mb: 2 }} />
                    <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {pkg.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {pkg.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 2, mb: 2 }}>
                      Rp {pkg.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Masa Aktif: {pkg.validity}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handlePurchase(pkg.id)}
                      sx={{ borderRadius: 2, textTransform: 'none', px: 4, py: 1 }}
                    >
                      Beli Sekarang
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
        </Grid2>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Pilih Paket Data Internet Anda
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Dapatkan paket data internet terbaik untuk kebutuhan browsing, streaming, dan lebih banyak lagi.
        </Typography>
      </Box>
      <Grid2 container spacing={4}>
        {packages.map((pkg) => (
          <Grid2 size={{xs: 12, sm: 6, md: 4}} key={pkg.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {pkg.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {pkg.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2, mb: 2 }}>
                  Rp {pkg.price.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Masa Aktif: {pkg.validity}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePurchase(pkg.id)}
                  sx={{ borderRadius: 2, textTransform: 'none', px: 4, py: 1 }}
                >
                  Beli Sekarang
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          FAQ
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Pertanyaan umum seputar paket data internet kami
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{xs: 12, sm: 6, }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Bagaimana cara membeli paket data?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pilih paket yang Anda inginkan, klik "Beli Sekarang", dan ikuti instruksi pembayaran.
              </Typography>
            </Card>
          </Grid2>
          <Grid2 size={{xs: 12, sm: 6}}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Apa yang terjadi setelah pembelian?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Setelah pembayaran berhasil, paket data akan langsung aktif dan siap digunakan.
              </Typography>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default Home;
