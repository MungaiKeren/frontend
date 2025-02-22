import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Button,
  Grid 
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Home = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 4,
          width: '100%'
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2
                }}
              >
                Welcome to RecipeHub
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4 }}
              >
                Discover, create, and share your favorite recipes
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                color="secondary"
                startIcon={<RestaurantIcon />}
                sx={{ mr: 2 }}
              >
                Browse Recipes
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                color="inherit"
              >
                Create Recipe
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* You can add an image here later */}
              <Box 
                sx={{ 
                  height: 300, 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6">Featured Image</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Featured Section */}
      <Container maxWidth={false} sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4 }}
        >
          Featured Recipes
        </Typography>
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <Paper
                sx={{
                  p: 3,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Recipe {item}
                </Typography>
                <Button variant="text" color="primary">
                  View Recipe
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
