import { 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Button,
  Skeleton,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { recipeService } from '../services/recipe.service';

const Favorites = () => {
  const queryClient = useQueryClient();
  const { data: favorites, isLoading, error } = useQuery({
    queryKey: ['favorites'],
    queryFn: recipeService.getFavorites
  });

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        My Favorite Recipes
      </Typography>

      <Grid container spacing={4}>
        {isLoading ? (
          // Show loading skeletons
          [...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))
        ) : error ? (
          <Grid item xs={12}>
            <Typography color="error">Error loading favorites</Typography>
          </Grid>
        ) : favorites?.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                No favorite recipes yet
              </Typography>
              <Button 
                component={Link} 
                to="/recipes" 
                variant="contained" 
                color="primary"
              >
                Browse Recipes
              </Button>
            </Paper>
          </Grid>
        ) : (
          favorites?.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Paper
                sx={{
                  p: 0,
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
                <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    component={Link}
                    to={`/recipes/${recipe.id}`}
                    fullWidth
                  >
                    View Recipe
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => {
                      recipeService.removeFromFavorites(recipe.id);
                      queryClient.invalidateQueries({ queryKey: ['favorites'] });
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Favorites;
