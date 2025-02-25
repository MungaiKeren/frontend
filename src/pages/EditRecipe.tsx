import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useRecipe } from '../hooks/useRecipe';
import { Category, Recipe } from '../types/recipe';
import { useUpdateRecipe } from '../hooks/useUpdateRecipe';

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recipe, isLoading, error } = useRecipe(Number(id));
  const updateRecipeMutation = useUpdateRecipe();

  const [formData, setFormData] = React.useState<Partial<Recipe>>({
    title: '',
    description: '',
    cooking_time: 0,
    prep_time: 0,
    servings: 0,
    difficulty: '',
    category: Category.OTHER,
    cuisine: '',
    calories_per_serving: 0,
    dietary_info: '',
    notes: '',
    source: '',
    ingredients: [],
    instructions: []
  });

  React.useEffect(() => {
    if (recipe) {
      setFormData(recipe);
    }
  }, [recipe]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error loading recipe</Typography>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value as Category
    }));
  };

  const handleInstructionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions?.map((instruction, i) => 
        i === index 
          ? { ...instruction, description: value }
          : instruction
      ) || []
    }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { step_number: prev.instructions.length + 1, description: '' }
      ]
    }));
  };

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions?.filter((_, i) => i !== index)
        .map((instruction, i) => ({ ...instruction, step_number: i + 1 })) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateRecipeMutation.mutateAsync({
        id: Number(id),
        recipe: formData
      });
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Edit Recipe</Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Cooking Time (minutes)"
                name="cooking_time"
                type="number"
                value={formData.cooking_time}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Prep Time (minutes)"
                name="prep_time"
                type="number"
                value={formData.prep_time}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Servings"
                name="servings"
                type="number"
                value={formData.servings}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category || ''}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  {Object.values(Category).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>Instructions</Typography>
              {formData.instructions?.map((instruction, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Step ${instruction.step_number}`}
                    value={instruction.description}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    multiline
                  />
                  <IconButton onClick={() => removeInstruction(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={addInstruction}
                variant="outlined"
                sx={{ mt: 1 }}
              >
                Add Step
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/recipes/${id}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditRecipe; 