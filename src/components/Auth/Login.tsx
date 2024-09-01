import { Google, Phone } from "@mui/icons-material";
import { Container, Grid2, Card, CardContent, Typography, TextField, Button, CardActions, Divider, Box } from "@mui/material";
import { useState } from "react";
import Link from '@mui/material/Link';
import PhoneLoginDialog from './PhoneLoginDialog'; 
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormData } from "../../types/login";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";  
import { useAuthStore } from "../../stores/authStore";

function Login() {
  const [isPhoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)
  const setUser = useAuthStore((state) => state.setUser)

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const userData = await loginUser(data.email, data.password);
      setAuthenticated(true);
      setUser(userData);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("email", { type: "manual", message: "Login gagal, periksa email atau password Anda." });
    }
  };

  const handlePhoneLogin = () => {
    setPhoneDialogOpen(true);
  };

  const handlePhoneDialogClose = () => {
    setPhoneDialogOpen(false); 
  };

  return (
    <Container maxWidth="sm">
      <Grid2 container display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card sx={{ width: '100%', padding: 2 }}>
          <CardContent>
            <Typography display="flex" justifyContent="center" variant="h5" component="div" gutterBottom>
              Login E-Commerce Paket Internet
            </Typography>
            <CardActions>
              <Button
                color="whiteButtonLoginProvider"
                variant="contained"
                fullWidth
                startIcon={<Google />}
              >
                Login dengan Google
              </Button>
            </CardActions>
            <CardActions>
              <Button
                color="whiteButtonLoginProvider"
                variant="contained"
                fullWidth
                onClick={handlePhoneLogin}
                startIcon={<Phone />}
              >
                Login dengan nomor
              </Button>
            </CardActions>
            <Divider sx={{ marginY: 2 }}>atau</Divider>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Format email tidak valid"
                  }
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("password", {
                  required: "Password wajib diisi",
                  minLength: {
                    value: 6,
                    message: "Password minimal 6 karakter"
                  }
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
              <Box display="flex" justifyContent="end">
                <Typography sx={{ my: 1 }} variant="body2" component="div" gutterBottom>
                  <Link component={RouterLink} to="/forgot-password" underline="none">Lupa Password?</Link>
                </Typography>
              </Box>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Login
                </Button>
              </CardActions>
            </form>
          </CardContent>
          <Box display="flex" justifyContent="center">
            <Typography sx={{ mt: 2 }} variant="body2" component="div" gutterBottom>
              Belum punya akun? <Link component={RouterLink} to="/register" underline="none">Daftar</Link>
            </Typography>
          </Box>
        </Card>
      </Grid2>

      <PhoneLoginDialog open={isPhoneDialogOpen} onClose={handlePhoneDialogClose} />
    </Container>
  );
}

export default Login;
