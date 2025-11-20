import type { UserProfile, WorkoutPlan, DailyWorkout } from "../types";

const strengthExercises = {
  beginner: [
    "Agachamento livre - 3x12",
    "Flexão de braço - 3x10",
    "Remada com halteres - 3x12",
    "Prancha - 3x30s"
  ],
  intermediate: [
    "Agachamento com peso - 4x10",
    "Supino reto - 4x10",
    "Levantamento terra - 3x8",
    "Desenvolvimento - 3x12",
    "Prancha - 3x45s"
  ],
  advanced: [
    "Agachamento pesado - 5x8",
    "Supino inclinado - 4x8",
    "Levantamento terra - 4x6",
    "Barra fixa - 4x10",
    "Desenvolvimento - 4x10"
  ]
};

const cardioExercises = {
  beginner: [
    "Caminhada rápida - 20 min",
    "Polichinelos - 3x30s",
    "Escada - 10 min"
  ],
  intermediate: [
    "Corrida leve - 25 min",
    "Burpees - 3x15",
    "Pular corda - 10 min"
  ],
  advanced: [
    "Corrida intervalada - 30 min",
    "Burpees - 4x20",
    "Sprint - 8x100m"
  ]
};

const hybridExercises = {
  beginner: [
    "Agachamento - 3x12",
    "Corrida leve - 10 min",
    "Flexão - 3x8",
    "Polichinelos - 2x30s"
  ],
  intermediate: [
    "Agachamento com peso - 3x10",
    "Corrida - 15 min",
    "Supino - 3x10",
    "Burpees - 3x12"
  ],
  advanced: [
    "Agachamento pesado - 4x8",
    "Corrida intervalada - 20 min",
    "Levantamento terra - 3x8",
    "Burpees - 4x15"
  ]
};

const dietSuggestions = {
  lose: "Foque em proteínas magras, vegetais e reduza carboidratos simples. Beba bastante água.",
  gain: "Aumente proteínas (frango, ovos, peixe) e carboidratos complexos (arroz, batata). Coma a cada 3h.",
  maintain: "Mantenha equilíbrio: proteínas, carboidratos e gorduras boas. Evite excessos."
};

export function generateWeeklyPlan(profile: UserProfile): WorkoutPlan {
  const { level, daysPerWeek, goal } = profile;
  const workouts: DailyWorkout[] = [];
  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  // Distribuição de treinos baseado nos dias por semana
  const workoutPattern = getWorkoutPattern(daysPerWeek);

  days.forEach((day, index) => {
    const workoutType = workoutPattern[index];
    
    if (workoutType === "rest") {
      workouts.push({
        day,
        type: "rest",
        exercises: ["Descanso ativo ou alongamento leve"],
        duration: "15-20 min",
        difficulty: "Fácil"
      });
    } else if (workoutType === "strength") {
      workouts.push({
        day,
        type: "strength",
        exercises: strengthExercises[level],
        duration: level === "beginner" ? "30-40 min" : level === "intermediate" ? "40-50 min" : "50-60 min",
        difficulty: level === "beginner" ? "Moderado" : level === "intermediate" ? "Intenso" : "Intenso"
      });
    } else if (workoutType === "cardio") {
      workouts.push({
        day,
        type: "cardio",
        exercises: cardioExercises[level],
        duration: level === "beginner" ? "20-30 min" : level === "intermediate" ? "30-40 min" : "40-50 min",
        difficulty: level === "beginner" ? "Fácil" : "Moderado"
      });
    } else {
      workouts.push({
        day,
        type: "hybrid",
        exercises: hybridExercises[level],
        duration: level === "beginner" ? "35-45 min" : level === "intermediate" ? "45-55 min" : "55-70 min",
        difficulty: level === "beginner" ? "Moderado" : "Intenso"
      });
    }
  });

  return {
    workouts,
    dietSuggestion: dietSuggestions[goal]
  };
}

function getWorkoutPattern(daysPerWeek: number): ("strength" | "cardio" | "hybrid" | "rest")[] {
  // Padrões simples de treino baseado nos dias
  const patterns: Record<number, ("strength" | "cardio" | "hybrid" | "rest")[]> = {
    3: ["strength", "rest", "cardio", "rest", "hybrid", "rest", "rest"],
    4: ["strength", "cardio", "rest", "hybrid", "strength", "rest", "rest"],
    5: ["strength", "cardio", "hybrid", "rest", "strength", "cardio", "rest"],
    6: ["strength", "cardio", "hybrid", "strength", "cardio", "hybrid", "rest"]
  };

  return patterns[daysPerWeek] || patterns[3];
}
