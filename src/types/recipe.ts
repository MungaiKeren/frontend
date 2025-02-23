export interface Recipe {
  id: number;
  title: string;
  description: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: Instruction[];
  user_id: number;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface Instruction {
  id: number;
  step: number;
  description: string;
} 