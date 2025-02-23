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
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {recipe.description}
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  mt: 2 
                }}>
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
                      // Refetch the favorites query to update the list
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
