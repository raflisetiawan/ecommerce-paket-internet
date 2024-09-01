import { Container, Grid2 } from "@mui/material";
import Register from "../components/Auth/Register";

function RegisterPage() {
    return ( <>
    <Container maxWidth="lg">
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Grid2 size={{xs: 12, md: 6}}>
          <Register />
        </Grid2>
      </Grid2>
    </Container>
    </> );
}

export default RegisterPage;