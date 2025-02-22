import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        width: '100%',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 'bold',
              }}
            >
              RecipeHub
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Discover, create, and share your favorite recipes with our community
              of food lovers.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <List>
              <ListItem disablePadding>
                <Link
                  component={RouterLink}
                  to="/recipes"
                  color="text.secondary"
                  sx={{ textDecoration: 'none' }}
                >
                  All Recipes
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link
                  component={RouterLink}
                  to="/create-recipe"
                  color="text.secondary"
                  sx={{ textDecoration: 'none' }}
                >
                  Create Recipe
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link
                  component={RouterLink}
                  to="/favorites"
                  color="text.secondary"
                  sx={{ textDecoration: 'none' }}
                >
                  Favorites
                </Link>
              </ListItem>
            </List>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Categories
            </Typography>
            <List>
              {['Breakfast', 'Main Dishes', 'Desserts', 'Healthy'].map((item) => (
                <ListItem key={item} disablePadding>
                  <Link
                    href="#"
                    color="text.secondary"
                    sx={{ textDecoration: 'none' }}
                  >
                    {item}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Subscribe to our Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Get the latest recipes and cooking tips delivered to your inbox.
            </Typography>
            <Box component="form" noValidate>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter your email"
                sx={{ mb: 1 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 8 }}
        >
          © {new Date().getFullYear()} RecipeHub. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 