import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, TextField, IconButton, Drawer, List, ListItemText, Divider, ListItemButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function Header() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    if (searchKeyword.trim().length !== 0) {
      navigate(`/packages?search=${encodeURIComponent(searchKeyword.trim())}`);
    }else{
      navigate(`/packages`);
    }
  };

  const renderButtons = () => (
    <Box>
      {isAuthenticated && (
        <Button
          color="inherit"
          component={Link}
          to="/packages"
          sx={{
            marginLeft: 2,
            color: '#fff',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#0288d1',
              transform: 'scale(1.1)',
            },
          }}
        >
          Semua Paket
        </Button>
      )}
      {isAuthenticated && (
        <Button
          color="inherit"
          component={Link}
          to="/promo"
          sx={{
            marginLeft: 2,
            color: '#fff',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#0288d1',
              transform: 'scale(1.1)',
            },
          }}
        >
          Promo
        </Button>
      )}
      {isAuthenticated && (
        <Button
          color="inherit"
          component={Link}
          to="/customer"
          sx={{
            marginLeft: 2,
            color: '#fff',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#0288d1',
              transform: 'scale(1.1)',
            },
          }}
        >
          Customer
        </Button>
      )}
      {isAuthenticated ? (
        <Button
          color="inherit"
          variant='outlined'
          onClick={handleLogout}
          sx={{
            marginLeft: 2,
            color: '#fff',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#0288d1',
              transform: 'scale(1.1)',
            },
          }}
        >
          Logout
        </Button>
      ) : (
        <>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{
              marginRight: 2,
              color: '#fff',
              fontWeight: 'bold',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#0288d1',
                transform: 'scale(1.1)',
              },
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/register"
            sx={{
              marginLeft: 2,
              color: '#fff',
              fontWeight: 'bold',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#0288d1',
                transform: 'scale(1.1)',
              },
            }}
          >
            Register
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(3,169,244,1) 50%, rgba(0,188,212,1) 100%)',
        padding: '10px 20px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 'bold',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#bbdefb',
            },
          }}
        >
          Paket Data Internet
        </Typography>

        {isMobile ? (
          <>
            {searchOpen ? (
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <TextField
                  placeholder="Cari paket data..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                  }}
                />
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => setSearchOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ) : (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => setSearchOpen(true)}
                >
                  <SearchIcon />
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              </>
            )}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  <ListItemButton component={Link} to="/">
                    <ListItemText primary="Home" />
                  </ListItemButton>
                  <ListItemButton component={Link} to="/promo">
                    <ListItemText primary="Promo"  />
                  </ListItemButton>
                  <ListItemButton component={Link} to="/packages">
                    <ListItemText primary="Semua Paket"  />
                  </ListItemButton>
                  <Divider />
                  {isAuthenticated ? (
                    <>
                      <ListItemButton component={Link} to="/customer">
                        <ListItemText primary="Customer" />
                      </ListItemButton>
                      <ListItemButton onClick={handleLogout}>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </>
                  ) : (
                    <>
                      <ListItemButton component={Link} to="/login">
                        <ListItemText primary="Login" />
                      </ListItemButton>
                      <ListItemButton component={Link} to="/register">
                        <ListItemText primary="Register" />
                      </ListItemButton>
                    </>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, mx: 4 }} component="form" onSubmit={handleSearch}>
              <TextField
                placeholder="Cari paket data..."
                variant="outlined"
                size="small"
                fullWidth
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 2,
                }}
              />
            </Box>
            {renderButtons()}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
