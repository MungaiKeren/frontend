import { useQuery } from '@tanstack/react-query';
import { recipeService } from '../services/recipe.service';

export const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: recipeService.getAllRecipes
  });
};
