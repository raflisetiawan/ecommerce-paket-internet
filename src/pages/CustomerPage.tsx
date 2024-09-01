import { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Paper, Grid2, Divider, Avatar, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { fetchCustomerData } from '../services/customerService';
import { useAuthStore } from '../stores/authStore';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';


function CustomerPage() {
  const userState = useAuthStore((state) => state.user);
  const [purchaseHistory, setPurchaseHistory] = useState<PackagePurchaseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const getPurchaseData = async () => {
      if (userState !== null) {
        try {
          const response = await fetchCustomerData(userState);
          if(response !== undefined){
            setPurchaseHistory(response);
          }
        } catch (error) {
          console.error('Error fetching purchase data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    getPurchaseData();
  }, [userState]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Memuat data pelanggan...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Profil Pelanggan
        </Typography>
      </Box>

      {userState !== null && (
        <Paper elevation={6} sx={{ padding: 4, mb: 6, borderRadius: 2, textAlign: 'center' }}>
          <Avatar sx={{ width: 80, height: 80, margin: 'auto', mb: 2 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            {userState.username}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem>
              <ListItemText primary="Email" secondary={userState.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Nomor Telepon" secondary={userState.phoneNumber} />
            </ListItem>
          </List>
          <Button variant="contained" color="primary" sx={{ mt: 4 }}>
            Edit Profil
          </Button>
        </Paper>
      )}

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Riwayat Pembelian
        </Typography>
      </Box>

      {purchaseHistory.length > 0 ? (
        <Grid2 container spacing={4}>
          {purchaseHistory.map((history) => (
            <Grid2 key={history.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ borderRadius: 4, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', p: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    {history.packageName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    <strong>Masa Aktif:</strong> {history.validity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    <strong>Tanggal Pembelian:</strong> {format(new Date(history.purchaseDate), 'dd MMMM yyyy')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="body1" color="text.secondary" align="center">
          Belum ada riwayat pembelian.
        </Typography>
      )}
    </Container>
  );
}

export default CustomerPage;
