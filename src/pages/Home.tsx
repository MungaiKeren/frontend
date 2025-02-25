import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Button,
  Grid,
  IconButton
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import fimage from "../assets/images/veg.jpg";
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useRecipes } from '../hooks/useRecipes';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useQueryClient } from '@tanstack/react-query';
import { recipeService } from '../services/recipe.service';
import { useQuery } from '@tanstack/react-query';

// Add this near the top of the component
const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: recipes, isLoading, error } = useRecipes();
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: recipeService.getFavorites
  });

  const isFavorite = (recipeId: number) => {
    return favorites.some(fav => fav.id === recipeId);
  };

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
                    height: 300,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      '& .MuiBox-root': {
                        background: 'rgba(0, 0, 0, 0.7)',
                      },
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s ease-in-out',
                      boxShadow: 3
                    }
                  }}
                >
                  {/* Background Image */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }
                    }}
                  >
                    {recipe.featured_image ? (
                      <img src={recipe.featured_image} alt={recipe.title} />
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

                  {/* Overlay Content */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      transition: 'background 0.3s ease'
                    }}
                  >
                    {/* Favorite Button */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isFavorite(recipe.id)) {
                          recipeService.removeFromFavorites(recipe.id);
                        } else {
                          recipeService.addToFavorites(recipe.id);
                        }
                        queryClient.invalidateQueries({ queryKey: ['favorites'] });
                      }}
                    >
                      {isFavorite(recipe.id) ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>

                    {/* Title and Description */}
                    <Link
                      to={`/recipes/${recipe.id}`}
                      style={{ 
                        textDecoration: 'none', 
                        color: 'inherit',
                        display: 'block'
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{ 
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                          fontWeight: 'bold'
                        }}
                      >
                        {recipe.title}
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                        }}
                      >
                        {recipe.description}
                      </Typography>
                    </Link>
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
