import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
  width: '100%', // Make the toolbar span the full width
  position: 'relative', // Ensure the logo stays in the right position
  borderRadius: '0', // Remove rounded corners
}));

export default function CustomAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleDrawerToggle = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleColorModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
        left: 0,
        right: 0, // Ensure AppBar touches the screen edges
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <StyledToolbar variant="dense" disableGutters>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo192.png" 
              alt="Logo" 
              style={{ width: '60px', height: '60px', marginRight: '16px' }} // Increased size and added right margin
            />
          </Box>

          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button component={Link} to="/home" sx={{ color: 'black', textTransform: 'none' }}>
                Dashboard
              </Button>
              <Button component={Link} to="/assets" sx={{ color: 'black', textTransform: 'none' }}>
                Assets
              </Button>
              <Button component={Link} to="/tracking" sx={{ color: 'black', textTransform: 'none' }}>
                Tracking
              </Button>
              <Button component={Link} to="/transactions" sx={{ color: 'black', textTransform: 'none' }}>
                Transactions
              </Button>
              <Button component={Link} to="/CreateAsset" sx={{ color: 'black', textTransform: 'none' }}>
                + Asset
              </Button>
              <Button component={Link} to="/profile" sx={{ color: 'black', textTransform: 'none' }}>
                Profile
              </Button>
            </Box>
          </Box>

          {/* Sign In & Sign Up Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button
              component={Link}
              to="/signin"
              variant="outlined"
              sx={{ color: 'black', borderColor: 'black', textTransform: 'none' }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{ backgroundColor: 'black', color: 'white', textTransform: 'none' }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Mobile Drawer */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={handleDrawerToggle(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={handleDrawerToggle(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={handleDrawerToggle(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem component={Link} to="/home" sx={{ color: 'black' }}>
                  Dashboard
                </MenuItem>
                <MenuItem component={Link} to="/assets" sx={{ color: 'black' }}>
                  Assets
                </MenuItem>
                <MenuItem component={Link} to="/tracking" sx={{ color: 'black' }}>
                  Tracking
                </MenuItem>
                <MenuItem component={Link} to="/transactions" sx={{ color: 'black' }}>
                  Transactions
                </MenuItem>
                <MenuItem component={Link} to="/CreateAsset" sx={{ color: 'black' }}>
                  + Asset
                </MenuItem>
                <MenuItem component={Link} to="/profile" sx={{ color: 'black' }}>
                  Profile
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button component={Link} to="/signup" variant="contained" fullWidth sx={{ backgroundColor: 'black', color: 'white' }}>
                    Sign Up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button component={Link} to="/signin" variant="outlined" fullWidth sx={{ color: 'black', borderColor: 'black' }}>
                    Sign In
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
