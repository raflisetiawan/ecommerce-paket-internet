import { Box } from "@mui/material";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function MainLayout() {
    return ( 
        <>
             <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <Outlet />
                <Footer />
             </Box>
        </>
     );
}

export default MainLayout;