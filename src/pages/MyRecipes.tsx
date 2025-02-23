import { useQuery } from '@tanstack/react-query'
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material'
import RecipeCard from '../components/recipe/RecipeCard'
import { Recipe } from '../types/recipe'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const MyRecipes = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const { data: recipes, isLoading, error } = useQuery<Recipe[]>({
    queryKey: ['myRecipes'],
    queryFn: () => api.get('/api/recipes/my-recipes').then(res => res.data),
  })

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Error loading recipes</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Recipes
      </Typography>
      
      {recipes && recipes.length > 0 ? (
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          You haven't created any recipes yet.
        </Typography>
      )}
    </Container>
  )
}

export default MyRecipes
