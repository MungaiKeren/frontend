import { 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Button,
  Skeleton,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import React from 'react';
import { Category } from '../types/recipe';

const Recipes = () => {
  const { data: recipes, isLoading, error } = useRecipes();
  const [selectedCategory, setSelectedCategory] = React.useState<Category | 'ALL'>('ALL');

  const handleCategoryChange = (_event: React.SyntheticEvent, newValue: Category | 'ALL') => {
    setSelectedCategory(newValue);
  };

  const filteredRecipes = React.useMemo(() => {
    if (!recipes) return [];
    if (selectedCategory === 'ALL') return recipes;
    return recipes.filter(recipe => 
      recipe.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [recipes, selectedCategory]);

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>     
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={selectedCategory} 
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All" value="ALL" />
          {Object.values(Category).map((category) => (
            <Tab 
              key={category} 
              label={category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} 
              value={category.toLowerCase()} 
            />
          ))}
        </Tabs>
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
          filteredRecipes.map((recipe) => (
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
                      WebkitLineClamp: 3,
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
  );
};

export default Recipes;
