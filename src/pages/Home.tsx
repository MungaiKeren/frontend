import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Button,
  Grid 
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import fimage from "../assets/images/veg.jpg";
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useRecipes } from '../hooks/useRecipes';
import { useNavigate } from 'react-router-dom';

// Add this near the top of the component
const Home = () => {
  const navigate = useNavigate();

  const { data: recipes, isLoading, error } = useRecipes();

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{
          bgcolor: 'secondary.dark',
          color: 'white',
          py: 8,
          mb: 4,
          width: '100%',
          borderRadius: 0,
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
                color="primary"
                startIcon={<RestaurantIcon />}
                sx={{ mr: 2 }}
                onClick={() => navigate('/recipes')}
              >
                Browse Recipes
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                color="inherit"
                onClick={() => navigate('/create-recipe')}
              >
                Create Recipe
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src={fimage}
                sx={{ 
                  width: '100%',
                  height: 'auto',
                  maxHeight: 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
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
          {isLoading ? (
            // Show loading skeletons
            [...Array(3)].map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))
          ) : error ? (
            <Typography color="error">Error loading recipes</Typography>
          ) : (
            recipes?.slice(0, 3).map((recipe) => (
              <Grid item xs={12} md={4} key={recipe.id}>
                <Paper
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s ease-in-out',
                      boxShadow: 3
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: 200,
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    {recipe.featured_image ? (
                      <img
                        src={recipe.featured_image}
                        alt={recipe.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          bgcolor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography color="text.secondary">No image</Typography>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ p: 2, flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {recipe.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {recipe.description}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      component={Link}
                      to={`/recipes/${recipe.id}`}
                      fullWidth
                    >
                      View Recipe
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
