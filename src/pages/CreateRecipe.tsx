import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
  Box,
  MenuItem,
  Stack,
} from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { Category, Ingredient } from '../types/recipe'
import api from '../services/api'

interface RecipeFormData {
  title: string
  description: string
  cooking_time: number
  prep_time?: number
  servings: number
  difficulty?: string
  category?: Category
  cuisine?: string
  dietary_info?: string
  ingredients: {
    ingredient_id: number
    quantity: number
    notes?: string
    ingredient?: {
      name: string
      unit: string
    }
  }[]
  instructions: {
    step_number: number
    description: string
  }[]
  featured_image?: File
  additional_images?: File[]
}

const CreateRecipe = () => {
  const navigate = useNavigate()
  const [previewImages, setPreviewImages] = useState<{
    featured?: string
    additional: string[]
  }>({ additional: [] })

  const { register, control, handleSubmit, formState: { errors } } = useForm<RecipeFormData>({
    defaultValues: {
      ingredients: [{ ingredient_id: 0, quantity: 0 }],
      instructions: [{ step_number: 1, description: '' }],
    }
  })

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = 
    useFieldArray({ control, name: 'ingredients' })

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = 
    useFieldArray({ control, name: 'instructions' })

  // Fetch available ingredients
  const { data: ingredients } = useQuery<Ingredient[]>({
    queryKey: ['ingredients'],
    queryFn: () => api.get('/api/ingredients').then(res => res.data),
  })

  const createRecipeMutation = useMutation({
    mutationFn: async (data: RecipeFormData) => {
      const formData = new FormData()
      
      // Append basic recipe data
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'featured_image' && key !== 'additional_images' && 
            key !== 'ingredients' && key !== 'instructions') {
          formData.append(key, value.toString())
        }
      })

      // Append ingredients and instructions as JSON strings
      formData.append('ingredients', JSON.stringify(data.ingredients))
      formData.append('instructions', JSON.stringify(data.instructions))

      // Append images
      if (data.featured_image) {
        formData.append('featured_image', data.featured_image)
      }
      if (data.additional_images) {
        Array.from(data.additional_images).forEach(image => {
          formData.append('additional_images', image)
        })
      }

      return api.post('/api/recipes/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },
    onSuccess: () => {
      navigate('/my-recipes')
    },
  })

  const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>, type: 'featured' | 'additional') => {
    const files = event.target.files
    if (!files) return

    if (type === 'featured' && files[0]) {
      setPreviewImages(prev => ({
        ...prev,
        featured: URL.createObjectURL(files[0])
      }))
    } else if (type === 'additional') {
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file))
      setPreviewImages(prev => ({
        ...prev,
        additional: [...prev.additional, ...newPreviews]
      }))
    }
  }

  const onSubmit = (data: RecipeFormData) => {
    createRecipeMutation.mutate(data)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Recipe
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Basic Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input
                    {...register('title', { required: 'Title is required' })}
                    label="Recipe Title"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    {...register('description')}
                    label="Description"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Input
                    {...register('cooking_time', { required: 'Cooking time is required' })}
                    label="Cooking Time (minutes)"
                    type="number"
                    error={!!errors.cooking_time}
                    helperText={errors.cooking_time?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Input
                    {...register('prep_time')}
                    label="Prep Time (minutes)"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Input
                    {...register('servings', { required: 'Servings is required' })}
                    label="Servings"
                    type="number"
                    error={!!errors.servings}
                    helperText={errors.servings?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Input
                        select
                        label="Category"
                        {...field}
                      >
                        {Object.values(Category).map((category) => (
                          <MenuItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </MenuItem>
                        ))}
                      </Input>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Input
                    {...register('cuisine')}
                    label="Cuisine"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Ingredients Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Ingredients</Typography>
              {ingredientFields.map((field, index) => (
                <Box key={field.id} sx={{ mb: 2, display: 'flex', gap: 2 }}>
                  <Controller
                    name={`ingredients.${index}.ingredient_id`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        select
                        label="Ingredient"
                        {...field}
                        sx={{ flexGrow: 1 }}
                      >
                        {ingredients?.map((ing) => (
                          <MenuItem key={ing.id} value={ing.id}>
                            {ing.name} ({ing.unit})
                          </MenuItem>
                        ))}
                      </Input>
                    )}
                  />
                  <Input
                    {...register(`ingredients.${index}.quantity`)}
                    label="Quantity"
                    type="number"
                    sx={{ width: '150px' }}
                  />
                  <Input
                    {...register(`ingredients.${index}.notes`)}
                    label="Notes"
                    placeholder="e.g., finely chopped"
                    sx={{ flexGrow: 1 }}
                  />
                  <IconButton 
                    onClick={() => removeIngredient(index)}
                    disabled={ingredientFields.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => appendIngredient({ 
                  ingredient_id: 0, 
                  quantity: 0 
                })}
              >
                Add Ingredient
              </Button>
            </Paper>
          </Grid>

          {/* Instructions Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Instructions</Typography>
              {instructionFields.map((field, index) => (
                <Box key={field.id} sx={{ mb: 2, display: 'flex', gap: 2 }}>
                  <Typography sx={{ minWidth: '30px', pt: 2 }}>
                    {index + 1}.
                  </Typography>
                  <Input
                    {...register(`instructions.${index}.description`)}
                    label="Step Description"
                    multiline
                    rows={2}
                    sx={{ flexGrow: 1 }}
                  />
                  <IconButton onClick={() => removeInstruction(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => appendInstruction({ 
                  step_number: instructionFields.length + 1,
                  description: ''
                })}
              >
                Add Step
              </Button>
            </Paper>
          </Grid>

          {/* Images Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Images</Typography>
              <Stack spacing={2}>
                <Box>
                  <input
                    accept="image/*"
                    type="file"
                    id="featured-image"
                    hidden
                    onChange={(e) => handleImagePreview(e, 'featured')}
                  />
                  <label htmlFor="featured-image">
                    <Button component="span">
                      Upload Featured Image
                    </Button>
                  </label>
                  {previewImages.featured && (
                    <Box sx={{ mt: 2 }}>
                      <img 
                        src={previewImages.featured} 
                        alt="Featured preview" 
                        style={{ maxWidth: '200px' }}
                      />
                    </Box>
                  )}
                </Box>

                <Box>
                  <input
                    accept="image/*"
                    type="file"
                    id="additional-images"
                    hidden
                    multiple
                    onChange={(e) => handleImagePreview(e, 'additional')}
                  />
                  <label htmlFor="additional-images">
                    <Button component="span">
                      Upload Additional Images
                    </Button>
                  </label>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {previewImages.additional.map((preview, index) => (
                      <Grid item key={index}>
                        <img 
                          src={preview} 
                          alt={`Additional ${index + 1}`} 
                          style={{ maxWidth: '150px' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              isLoading={createRecipeMutation.isPending}
            >
              Create Recipe
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default CreateRecipe
