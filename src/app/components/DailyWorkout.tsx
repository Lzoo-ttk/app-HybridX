"use client";

import { useState } from "react";
import type { UserProfile, WorkoutPlan, DailyLog } from "../types";
import { CheckCircle2, Dumbbell, Heart, Flame } from "lucide-react";

interface DailyWorkoutProps {
  userProfile: UserProfile;
  workoutPlan: WorkoutPlan;
  onComplete: (log: DailyLog) => void;
}

export function DailyWorkout({ userProfile, workoutPlan, onComplete }: DailyWorkoutProps) {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [energy, setEnergy] = useState(3);
  const [mood, setMood] = useState<"great" | "good" | "ok" | "tired">("good");

  // Pegar treino do dia atual
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1; // Ajustar domingo
  const todayWorkout = workoutPlan.workouts[dayIndex];

  const handleComplete = () => {
    const log: DailyLog = {
      date: new Date().toISOString(),
      completed: true,
      energy,
      mood
    };
    onComplete(log);
    setShowCompleteModal(false);
  };

  const getWorkoutIcon = () => {
    switch (todayWorkout.type) {
      case "strength":
        return <Dumbbell className="w-7 h-7" />;
      case "cardio":
        return <Heart className="w-7 h-7" />;
      case "hybrid":
        return <Flame className="w-7 h-7" />;
      default:
        return <CheckCircle2 className="w-7 h-7" />;
    }
  };

  const getWorkoutColor = () => {
    switch (todayWorkout.type) {
      case "strength":
        return "from-[#00FF7F] to-[#004D00]";
      case "cardio":
        return "from-[#00FF7F]/80 to-[#004D00]/80";
      case "hybrid":
        return "from-[#00FF7F] to-[#004D00]";
      default:
        return "from-gray-600 to-gray-800";
    }
  };

  const getWorkoutLabel = () => {
    switch (todayWorkout.type) {
      case "strength":
        return "Força";
      case "cardio":
        return "Cardio";
      case "hybrid":
        return "Híbrido";
      default:
        return "Descanso";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Card do Treino do Dia */}
      <div className={`bg-gradient-to-br ${getWorkoutColor()} rounded-3xl p-6 text-white shadow-2xl shadow-[#00FF7F]/20`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {getWorkoutIcon()}
          </div>
          <div>
            <p className="text-sm opacity-90 font-medium">Treino de Hoje</p>
            <h2 className="text-3xl font-bold">{todayWorkout.day}</h2>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-medium">
            {getWorkoutLabel()}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-medium">
            {todayWorkout.duration}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-medium">
            {todayWorkout.difficulty}
          </div>
        </div>
      </div>

      {/* Exercícios */}
      <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-[#00FF7F]/10">
        <h3 className="text-xl font-bold text-white mb-5">
          Exercícios
        </h3>
        <ul className="space-y-4">
          {todayWorkout.exercises.map((exercise, index) => (
            <li
              key={index}
              className="flex items-start gap-4 text-gray-300"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00FF7F] to-[#004D00] text-[#0D0D0D] flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <span className="text-base leading-relaxed">{exercise}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sugestão Alimentar */}
      <div className="bg-gradient-to-br from-[#00FF7F]/10 to-[#004D00]/10 border border-[#00FF7F]/20 rounded-3xl p-6">
        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <span>🥗</span>
          Alimentação
        </h3>
        <p className="text-gray-300 text-base leading-relaxed">
          {workoutPlan.dietSuggestion}
        </p>
      </div>

      {/* Botão Concluir */}
      <button
        onClick={() => setShowCompleteModal(true)}
        className="w-full bg-gradient-to-r from-[#00FF7F] to-[#004D00] hover:opacity-90 text-[#0D0D0D] font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-[#00FF7F]/30 text-lg"
      >
        <CheckCircle2 className="w-6 h-6" />
        Concluir Treino
      </button>

      {/* Modal de Conclusão */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1A1A1A] rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-[#00FF7F]/10">
            <h3 className="text-2xl font-bold text-white mb-6">
              Como foi o treino?
            </h3>

            {/* Nível de Energia */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Nível de energia
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setEnergy(level)}
                    className={`flex-1 h-14 rounded-xl border-2 font-bold text-lg transition-all ${
                      energy === level
                        ? "border-[#00FF7F] bg-gradient-to-br from-[#00FF7F] to-[#004D00] text-[#0D0D0D] shadow-lg shadow-[#00FF7F]/30"
                        : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                1 = Muito cansado | 5 = Muita energia
              </p>
            </div>

            {/* Humor */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Como se sente?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "great" as const, label: "Ótimo", emoji: "😄" },
                  { value: "good" as const, label: "Bem", emoji: "🙂" },
                  { value: "ok" as const, label: "Ok", emoji: "😐" },
                  { value: "tired" as const, label: "Cansado", emoji: "😴" }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMood(option.value)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      mood === option.value
                        ? "border-[#00FF7F] bg-gradient-to-br from-[#00FF7F]/10 to-[#004D00]/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="text-sm font-semibold text-white">
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCompleteModal(false)}
                className="flex-1 border-2 border-white/10 bg-white/5 text-gray-300 font-semibold py-4 rounded-xl hover:bg-white/10 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 bg-gradient-to-r from-[#00FF7F] to-[#004D00] hover:opacity-90 text-[#0D0D0D] font-semibold py-4 rounded-xl transition-all shadow-lg shadow-[#00FF7F]/20"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
