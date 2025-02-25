import { useQuery } from '@tanstack/react-query';
import { Recipe } from '../types/recipe';
import api from '../services/api';

export const useRecipe = (id: number) => {
  return useQuery<Recipe>({
    queryKey: ['recipe', id],
    queryFn: async () => {
      const response = await api.get(`/api/recipes/${id}`);
      return response.data;
    },
  });
}; 