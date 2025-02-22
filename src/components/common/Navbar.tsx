import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  InputBase,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Tooltip,
  Divider,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../hooks/useAuth';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const { isAuthenticated, handleLogout, user } = useAuth();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const menuItems = [
    { text: 'Recipes', path: '/recipes' },
    { text: 'Create Recipe', path: '/create-recipe' },
    { text: 'Favorites', path: '/favorites' },
  ];

  const userMenuItems = [
    { text: 'Profile', path: '/profile', icon: <PersonIcon fontSize="small" /> },
    { text: 'Settings', path: '/settings', icon: <SettingsIcon fontSize="small" /> },
    { text: 'Logout', action: () => {
      handleLogout();
      handleUserMenuClose();
    }, icon: <LogoutIcon fontSize="small" /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        RecipeHub
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={RouterLink} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search recipes..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </ListItem>
        {!isAuthenticated ? (
          <>
            <ListItem component={RouterLink} to="/login">
              <Button color="inherit">Login</Button>
            </ListItem>
            <ListItem component={RouterLink} to="/register">
              <Button variant="contained" color="secondary">
                Sign Up
              </Button>
            </ListItem>
          </>
        ) : (
          userMenuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={item.action || (() => {})}
              component={item.path ? RouterLink : 'div'}
              to={item.path || ''}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar 
        position="static" 
        color="default" 
        elevation={1}
        sx={{ width: '100%' }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              RecipeHub
            </Typography>

            {/* Mobile menu icon */}
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Mobile logo */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              RecipeHub
            </Typography>

            {/* Desktop menu items */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  sx={{ my: 2, color: 'text.primary', display: 'block' }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* Search */}
            <Search sx={{ display: { xs: 'none', md: 'block' } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search recipes..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            {/* Auth buttons or User menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {!isAuthenticated ? (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    color="inherit"
                    sx={{ ml: 1 }}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color="secondary"
                    sx={{ ml: 1 }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip title="Account settings">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>                      
                      <IconButton
                        onClick={handleUserMenuOpen}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={userMenuAnchor ? 'user-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={userMenuAnchor ? 'true' : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          <AccountCircleIcon />
                        </Avatar>
                        </IconButton>
                        <Typography sx={{ mr: 1 }}>{user?.name || 'User'}</Typography>
                    </Box>
                  </Tooltip>
                  <Menu
                    id="user-menu"
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleUserMenuClose}
                    onClick={handleUserMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    {userMenuItems.map((item) => (
                      <MenuItem
                        key={item.text}
                        onClick={item.action || (() => {})}
                        component={item.path ? RouterLink : 'div'}
                        to={item.path || ''}
                      >
                        {item.icon}
                        <Typography sx={{ ml: 1 }}>{item.text}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
