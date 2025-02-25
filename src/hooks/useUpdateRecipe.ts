import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Recipe } from '../types/recipe';
import api from '../services/api';

interface UpdateRecipeVariables {
  id: number;
  recipe: Partial<Recipe>;
}

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, recipe }: UpdateRecipeVariables) => {
      const response = await api.put(`/api/recipes/${id}`, recipe);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['recipe', data.id] });
    },
  });
}; 