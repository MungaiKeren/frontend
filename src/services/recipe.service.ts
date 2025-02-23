import api from './api';
import { Recipe } from '../types/recipe';

export const recipeService = {
  getAllRecipes: async (): Promise<Recipe[]> => {
    const response = await api.get('/api/recipes');
    return response.data;
  },

  getUserRecipes: async (): Promise<Recipe[]> => {
    const response = await api.get('/api/recipes/my-recipes');
    return response.data;
  },

  getRecipe: async (id: number): Promise<Recipe> => {
    const response = await api.get(`/api/recipes/${id}`);
    return response.data;
  },

  addToFavorites: async (recipeId: number): Promise<void> => {
    await api.post(`/api/favorites/${recipeId}`);
  },

  removeFromFavorites: async (recipeId: number): Promise<void> => {
    await api.delete(`/api/favorites/${recipeId}`);
  },

  getFavorites: async (): Promise<Recipe[]> => {
    const response = await api.get('/api/favorites');
    return response.data;
  }
};
