import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Skeleton,
  IconButton,
  Tooltip,
  CardMedia,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeService } from '../services/recipe.service';
import { Recipe } from '../types/recipe';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(false);

  // Get recipe and check favorite status
  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: async () => {
      const [recipe, favorites] = await Promise.all([
        recipeService.getRecipe(Number(id)),
        recipeService.getFavorites()
      ]);
      setIsFavorite(favorites.some(fav => fav.id === Number(id)));
      return recipe;
    },
  });

  const addToFavorites = useMutation({
    mutationFn: () => recipeService.addToFavorites(Number(id)),
    onSuccess: () => {
      setIsFavorite(true);
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const removeFromFavorites = useMutation({
    mutationFn: () => recipeService.removeFromFavorites(Number(id)),
    onSuccess: () => {
      setIsFavorite(false);
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites.mutate();
    } else {
      addToFavorites.mutate();
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Error loading recipe</Typography>
      </Container>
    );
  }

  if (!recipe) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Image Section */}
      {recipe.featured_image && (
        <Paper sx={{ mb: 4, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="400"
            image={recipe.featured_image}
            alt={recipe.title}
            sx={{ objectFit: 'cover' }}
          />
        </Paper>
      )}

      {/* Additional Images */}
      {recipe.additional_images && recipe.additional_images.length > 0 && (
        <Paper sx={{ p: 2, mb: 4 }}>
          <Grid container spacing={2}>
            {recipe.additional_images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CardMedia
                  component="img"
                  height="200"
                  image={image}
                  alt={`${recipe.title} - Additional image ${index + 1}`}
                  sx={{ 
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Header Section */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              {recipe.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              {recipe.description}
            </Typography>
          </Box>
          <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <IconButton 
              onClick={handleFavoriteClick}
              color="primary"
              sx={{ 
                '&:hover': { 
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: 'red' }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Recipe Quick Info */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Chip 
            icon={<AccessTimeIcon />} 
            label={`Prep: ${recipe.prep_time} mins`}
          />
          <Chip 
            icon={<AccessTimeIcon />} 
            label={`Cook: ${recipe.cooking_time} mins`}
          />
          <Chip 
            icon={<RestaurantIcon />} 
            label={`Serves ${recipe.servings}`}
          />
        </Box>
      </Paper>

      <Grid container spacing={4}>
        {/* Ingredients Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Ingredients
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {recipe.ingredients.map((recipeIngredient) => (
                <ListItem key={recipeIngredient.ingredient_id}>
                  <ListItemText
                    primary={recipeIngredient.ingredient.name}
                    secondary={`${recipeIngredient.quantity} ${recipeIngredient.ingredient.unit}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Instructions Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Instructions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {recipe.instructions
                .sort((a, b) => a.step_number - b.step_number)
                .map((instruction) => (
                <ListItem key={instruction.id}>
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="span">
                        Step {instruction.step_number}
                      </Typography>
                    }
                    secondary={instruction.description}
                    secondaryTypographyProps={{ 
                      sx: { mt: 1 },
                      component: 'div'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeDetail;
