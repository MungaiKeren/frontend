export enum Category {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  DESSERT = "dessert",
  SNACK = "snack",
  APPETIZER = "appetizer",
  BEVERAGE = "beverage"
}

export interface Recipe {
  id: number;
  title: string;
  description?: string;
  cooking_time: number;
  prep_time?: number;
  total_time?: number;
  servings: number;
  difficulty?: string;
  category?: Category;
  cuisine?: string;
  featured_image?: string;
  additional_images?: string[];
  calories_per_serving?: number;
  is_featured?: boolean;
  is_published?: boolean;
  dietary_info?: string;
  notes?: string;
  source?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  ingredients: RecipeIngredient[];
  instructions: Instruction[];
  user: User;
}

export interface RecipeIngredient {
  ingredient_id: number;
  quantity: number;
  notes?: string;
  ingredient: Ingredient;
}

export interface Ingredient {
  id: number;
  name: string;
  unit: string;
}

export interface Instruction {
  id: number;
  step_number: number;
  description: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  created_at: string;
} 