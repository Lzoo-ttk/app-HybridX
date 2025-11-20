export type Goal = "lose" | "gain" | "maintain";
export type Level = "beginner" | "intermediate" | "advanced";
export type WorkoutType = "strength" | "cardio" | "hybrid" | "rest";

export interface UserProfile {
  name: string;
  goal: Goal;
  level: Level;
  daysPerWeek: number;
  dietPreference?: "balanced" | "low-carb" | "high-protein" | "vegetarian";
  restrictions?: string[];
  weight?: number;
  height?: number;
  age?: number;
}

export interface DailyWorkout {
  day: string;
  type: WorkoutType;
  exercises: string[];
  duration: string;
  difficulty: "Fácil" | "Moderado" | "Intenso";
}

export interface WorkoutPlan {
  workouts: DailyWorkout[];
  dietSuggestion: string;
}

export interface DailyLog {
  date: string;
  completed: boolean;
  energy: number; // 1-5
  mood: "great" | "good" | "ok" | "tired";
  weight?: number;
}

export interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string[];
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

export interface WeeklyProgress {
  week: string;
  workoutsCompleted: number;
  totalWorkouts: number;
  averageEnergy: number;
  weightChange?: number;
}
