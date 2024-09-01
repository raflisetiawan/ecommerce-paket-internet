import { Container, Grid2, Card, CardContent, Typography, TextField, Button, CardActions, Box, Link, Divider } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterFormData } from "../../types/login"; 
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/authService"; 
import { useAuthStore } from "../../stores/authStore";

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)
  const navigate = useNavigate();
  
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await registerUser(data.email, data.username, data.phoneNumber, data.password);
      const userData = await loginUser(response.email, response.password);
      setAuthenticated(true);
      localStorage.setItem('user', JSON.stringify({
        email: userData.email,
        id: userData.id,
        username: userData.username,
        phoneNumber: userData.phoneNumber
      }));
      navigate("/");
      
    } catch (error) {
      alert("Pendaftaran gagal!" + error);
    }
  };

  const password = watch("password");

  return (
    <Container maxWidth="sm">
      <Grid2 container display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card sx={{ width: '100%', padding: 2 }}>
          <CardContent>
            <Typography display="flex" justifyContent="center" variant="h5" component="div" gutterBottom>
              Daftar E-Commerce Paket Internet
            </Typography>

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
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("username", {
                  required: "Username wajib diisi",
                  minLength: {
                    value: 3,
                    message: "Username minimal 3 karakter"
                  }
                })}
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
              />

              <TextField
                label="Nomor HP"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                {...register("phoneNumber", {
                  required: "Nomor HP wajib diisi",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Nomor HP hanya boleh terdiri dari angka"
                  },
                  minLength: {
                    value: 10,
                    message: "Nomor HP minimal 10 digit"
                  }
                })}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber?.message}
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

              <TextField
                label="Konfirmasi Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("confirmPassword", {
                  required: "Konfirmasi password wajib diisi",
                  validate: value => value === password || "Password tidak cocok"
                })}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
              />

              <CardActions>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Daftar
                </Button>
              </CardActions>
            </form>
          </CardContent>
          <Box display="flex" justifyContent="center">
            <Typography sx={{ mt: 2 }} variant="body2" component="div" gutterBottom>
              Sudah punya akun? <Link component={RouterLink} underline="none" to="/login">Login</Link>
            </Typography>
          </Box>
        </Card>
      </Grid2>
    </Container>
  );
}

export default Register;
