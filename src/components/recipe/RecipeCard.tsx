import { Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Button, Box } from '@mui/material'
import { Recipe } from '../../types/recipe'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../services/api'

interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/api/recipes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myRecipes'] })
    },
  })

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteMutation.mutate(recipe.id)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/recipes/${recipe.id}/edit`)
  }

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/recipes/${recipe.id}`)}>
        <CardMedia
          component="img"
          height="200"
          image={recipe.featured_image || '/default-recipe-image.jpg'}
          alt={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {recipe.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.description?.slice(0, 100)}
            {recipe.description && recipe.description.length > 100 ? '...' : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" color="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default RecipeCard
