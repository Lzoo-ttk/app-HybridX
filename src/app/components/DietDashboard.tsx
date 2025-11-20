"use client";

import type { UserProfile, WorkoutPlan } from "../types";
import { Apple, Flame, Droplet } from "lucide-react";

interface DietDashboardProps {
  userProfile: UserProfile;
  workoutPlan: WorkoutPlan;
}

export function DietDashboard({ userProfile, workoutPlan }: DietDashboardProps) {
  // Calcular macros baseado no objetivo
  const getMacros = () => {
    switch (userProfile.goal) {
      case "lose":
        return { protein: 35, carbs: 30, fats: 35, calories: 1800 };
      case "gain":
        return { protein: 30, carbs: 45, fats: 25, calories: 2800 };
      default:
        return { protein: 30, carbs: 40, fats: 30, calories: 2200 };
    }
  };

  const macros = getMacros();

  // Receitas sugeridas baseadas na preferência
  const getRecipes = () => {
    const recipes = {
      breakfast: [
        { name: "Omelete com Aveia", calories: 350, protein: 25 },
        { name: "Panqueca de Banana", calories: 280, protein: 15 },
        { name: "Iogurte com Granola", calories: 320, protein: 18 }
      ],
      lunch: [
        { name: "Frango Grelhado com Batata Doce", calories: 520, protein: 45 },
        { name: "Salmão com Arroz Integral", calories: 580, protein: 42 },
        { name: "Carne Magra com Legumes", calories: 490, protein: 48 }
      ],
      dinner: [
        { name: "Peixe Assado com Salada", calories: 380, protein: 38 },
        { name: "Frango com Quinoa", calories: 420, protein: 40 },
        { name: "Omelete com Vegetais", calories: 310, protein: 28 }
      ],
      snack: [
        { name: "Shake de Proteína", calories: 180, protein: 25 },
        { name: "Pasta de Amendoim com Banana", calories: 220, protein: 8 },
        { name: "Mix de Castanhas", calories: 200, protein: 6 }
      ]
    };

    return recipes;
  };

  const recipes = getRecipes();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">Dashboard de Dieta</h2>
        <p className="text-gray-400 text-base mt-2">
          Seu plano alimentar personalizado
        </p>
      </div>

      {/* Macros Diários */}
      <div className="bg-gradient-to-br from-[#00FF7F] to-[#004D00] rounded-3xl p-6 text-white shadow-2xl shadow-[#00FF7F]/20">
        <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
          <Flame className="w-6 h-6" />
          Meta Diária
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-3xl font-bold">{macros.calories}</div>
            <div className="text-sm opacity-90 mt-1">Calorias</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-3xl font-bold">{macros.protein}%</div>
            <div className="text-sm opacity-90 mt-1">Proteína</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-3xl font-bold">{macros.carbs}%</div>
            <div className="text-sm opacity-90 mt-1">Carboidratos</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-3xl font-bold">{macros.fats}%</div>
            <div className="text-sm opacity-90 mt-1">Gorduras</div>
          </div>
        </div>
      </div>

      {/* Sugestão Geral */}
      <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-[#00FF7F]/10">
        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <Apple className="w-6 h-6 text-[#00FF7F]" />
          Dica do Dia
        </h3>
        <p className="text-gray-300 text-base leading-relaxed">
          {workoutPlan.dietSuggestion}
        </p>
      </div>

      {/* Refeições Sugeridas */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Refeições Sugeridas</h3>

        {/* Café da Manhã */}
        <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#00FF7F]/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌅</span>
            <h4 className="font-bold text-white text-lg">Café da Manhã</h4>
          </div>
          <div className="space-y-3">
            {recipes.breakfast.map((recipe, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
              >
                <div>
                  <div className="font-semibold text-white text-sm">{recipe.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {recipe.protein}g proteína
                  </div>
                </div>
                <div className="text-[#00FF7F] font-bold text-sm">
                  {recipe.calories} kcal
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Almoço */}
        <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#00FF7F]/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">☀️</span>
            <h4 className="font-bold text-white text-lg">Almoço</h4>
          </div>
          <div className="space-y-3">
            {recipes.lunch.map((recipe, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
              >
                <div>
                  <div className="font-semibold text-white text-sm">{recipe.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {recipe.protein}g proteína
                  </div>
                </div>
                <div className="text-[#00FF7F] font-bold text-sm">
                  {recipe.calories} kcal
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jantar */}
        <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#00FF7F]/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌙</span>
            <h4 className="font-bold text-white text-lg">Jantar</h4>
          </div>
          <div className="space-y-3">
            {recipes.dinner.map((recipe, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
              >
                <div>
                  <div className="font-semibold text-white text-sm">{recipe.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {recipe.protein}g proteína
                  </div>
                </div>
                <div className="text-[#00FF7F] font-bold text-sm">
                  {recipe.calories} kcal
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lanches */}
        <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#00FF7F]/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🍎</span>
            <h4 className="font-bold text-white text-lg">Lanches</h4>
          </div>
          <div className="space-y-3">
            {recipes.snack.map((recipe, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
              >
                <div>
                  <div className="font-semibold text-white text-sm">{recipe.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {recipe.protein}g proteína
                  </div>
                </div>
                <div className="text-[#00FF7F] font-bold text-sm">
                  {recipe.calories} kcal
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidratação */}
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-6">
        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <Droplet className="w-6 h-6 text-blue-400" />
          Hidratação
        </h3>
        <p className="text-gray-300 text-base leading-relaxed">
          Beba pelo menos 2-3 litros de água por dia. Mantenha-se hidratado durante os treinos!
        </p>
      </div>
    </div>
  );
}
