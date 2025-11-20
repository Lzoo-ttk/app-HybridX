"use client";

import type { UserProfile } from "../types";
import { User, Target, TrendingUp, Calendar, RotateCcw } from "lucide-react";

interface ProfileProps {
  userProfile: UserProfile;
  onReset: () => void;
}

export function Profile({ userProfile, onReset }: ProfileProps) {
  const getGoalLabel = () => {
    switch (userProfile.goal) {
      case "lose": return "Emagrecer";
      case "gain": return "Ganhar Massa";
      case "maintain": return "Manter Forma";
    }
  };

  const getLevelLabel = () => {
    switch (userProfile.level) {
      case "beginner": return "Iniciante";
      case "intermediate": return "Intermediário";
      case "advanced": return "Avançado";
    }
  };

  const getDietLabel = () => {
    switch (userProfile.dietPreference) {
      case "balanced": return "Balanceada";
      case "low-carb": return "Low Carb";
      case "high-protein": return "Alta Proteína";
      case "vegetarian": return "Vegetariana";
      default: return "Balanceada";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-[#00FF7F] to-[#004D00] flex items-center justify-center shadow-2xl shadow-[#00FF7F]/30">
          <User className="w-12 h-12 text-[#0D0D0D]" strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-bold text-white">{userProfile.name}</h2>
        <p className="text-gray-400 text-base mt-2">Atleta HybridX</p>
      </div>

      {/* Informações do Perfil */}
      <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-[#00FF7F]/10 space-y-4">
        <h3 className="text-xl font-bold text-white mb-5">Informações</h3>

        {/* Objetivo */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF7F]/20 to-[#004D00]/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-[#00FF7F]" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Objetivo</div>
              <div className="font-semibold text-white">{getGoalLabel()}</div>
            </div>
          </div>
        </div>

        {/* Nível */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF7F]/20 to-[#004D00]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#00FF7F]" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Nível</div>
              <div className="font-semibold text-white">{getLevelLabel()}</div>
            </div>
          </div>
        </div>

        {/* Frequência */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF7F]/20 to-[#004D00]/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#00FF7F]" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Frequência</div>
              <div className="font-semibold text-white">{userProfile.daysPerWeek}x por semana</div>
            </div>
          </div>
        </div>

        {/* Dieta */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF7F]/20 to-[#004D00]/20 flex items-center justify-center text-xl">
              🥗
            </div>
            <div>
              <div className="text-xs text-gray-400">Dieta</div>
              <div className="font-semibold text-white">{getDietLabel()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-[#00FF7F]/10">
        <h3 className="text-xl font-bold text-white mb-5">Conquistas</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "🔥", label: "Iniciante", desc: "Primeiro treino" },
            { icon: "💪", label: "Dedicado", desc: "7 dias seguidos" },
            { icon: "⭐", label: "Consistente", desc: "30 dias" }
          ].map((achievement, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-[#00FF7F]/30 transition-all"
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <div className="text-xs font-semibold text-white mb-1">
                {achievement.label}
              </div>
              <div className="text-[10px] text-gray-500">
                {achievement.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#00FF7F]/10 to-[#004D00]/10 border border-[#00FF7F]/20 rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-[#00FF7F] mb-1">0</div>
          <div className="text-sm text-gray-400">Treinos Totais</div>
        </div>
        <div className="bg-gradient-to-br from-[#00FF7F]/10 to-[#004D00]/10 border border-[#00FF7F]/20 rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-[#00FF7F] mb-1">0</div>
          <div className="text-sm text-gray-400">Dias de Streak</div>
        </div>
      </div>

      {/* Botão Resetar */}
      <button
        onClick={onReset}
        className="w-full border-2 border-red-500/30 bg-red-500/10 text-red-400 font-semibold py-4 rounded-2xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        Recomeçar do Zero
      </button>
    </div>
  );
}
