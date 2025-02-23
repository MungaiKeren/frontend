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
import { useRecipes } from '../hooks/useRecipes';

const Recipes = () => {
  const { data: recipes, isLoading, error } = useRecipes();

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          All Recipes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/recipes/create"
        >
          Create New Recipe
        </Button>
      </Box>

      <Grid container spacing={4}>
        {isLoading ? (
          // Show loading skeletons
          [...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))
        ) : error ? (
          <Typography color="error">Error loading recipes</Typography>
        ) : (
          recipes?.map((recipe) => (
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
                <Box sx={{ mt: 2 }}>
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
  );
};

export default Recipes;
