import { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Button, Box, Grid2 } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../config';
import { formatCurrency } from '../utils/formatCurrency';
import { useNavigate, useLocation } from 'react-router-dom';

interface PackageData {
  id: number;
  name: string;
  price: number;
  description: string;
  validity: string;
  isPromo: boolean;
}

function AllPackagesPage() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get('search') || '';


  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/packages`);
        let filteredPackages: PackageData[] = [];

        if (searchKeyword) {
          filteredPackages = response.data.filter((pkg: PackageData) =>
            pkg.name.toLowerCase().includes(searchKeyword.toLowerCase())
          );
          setPackages(filteredPackages);
        }else{
          setPackages(response.data);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchAllPackages();
  }, [searchKeyword]);

  const handleBuyNow = (packageId: number) => {
    navigate(`/purchase/${packageId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Semua Paket Data{!searchKeyword ? '' : ' : ' + searchKeyword}
      </Typography>
      <Grid2 container spacing={4}>
        {packages.map((pkg) => (
          <Grid2 size={{xs: 12, sm: 6, md: 4}} key={pkg.id}>
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
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}

export default AllPackagesPage;
