"use client";

import type { DailyLog, UserProfile } from "../types";
import { Calendar, Zap, TrendingUp, RotateCcw } from "lucide-react";

interface ProgressProps {
  logs: DailyLog[];
  userProfile: UserProfile | null;
  onReset: () => void;
}

export function Progress({ logs, userProfile, onReset }: ProgressProps) {
  // Calcular estatísticas
  const totalWorkouts = logs.filter(log => log.completed).length;
  const averageEnergy = logs.length > 0
    ? (logs.reduce((sum, log) => sum + log.energy, 0) / logs.length).toFixed(1)
    : "0";

  const moodCounts = {
    great: logs.filter(l => l.mood === "great").length,
    good: logs.filter(l => l.mood === "good").length,
    ok: logs.filter(l => l.mood === "ok").length,
    tired: logs.filter(l => l.mood === "tired").length
  };

  const mostCommonMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
  const moodLabels = {
    great: "Ótimo",
    good: "Bem",
    ok: "Ok",
    tired: "Cansado"
  };

  // Últimos 7 dias
  const last7Days = logs.slice(-7);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">Seu Progresso</h2>
        <p className="text-gray-400 text-base mt-2">
          Acompanhe sua evolução
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total de Treinos */}
        <div className="bg-gradient-to-br from-[#FF006E] to-[#8338EC] rounded-3xl p-6 text-white shadow-2xl">
          <Calendar className="w-10 h-10 mb-4 opacity-90" />
          <div className="text-4xl font-bold mb-2">{totalWorkouts}</div>
          <div className="text-sm opacity-90 font-medium">Treinos feitos</div>
        </div>

        {/* Energia Média */}
        <div className="bg-gradient-to-br from-[#8338EC] to-[#3A86FF] rounded-3xl p-6 text-white shadow-2xl">
          <Zap className="w-10 h-10 mb-4 opacity-90" />
          <div className="text-4xl font-bold mb-2">{averageEnergy}</div>
          <div className="text-sm opacity-90 font-medium">Energia média</div>
        </div>
      </div>

      {/* Humor Predominante */}
      {logs.length > 0 && (
        <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-white/5">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="w-6 h-6 text-gray-400" />
            <h3 className="text-xl font-bold text-white">
              Como você tem se sentido
            </h3>
          </div>
          <div className="text-center py-6">
            <div className="text-6xl mb-4">
              {mostCommonMood[0] === "great" && "😄"}
              {mostCommonMood[0] === "good" && "🙂"}
              {mostCommonMood[0] === "ok" && "😐"}
              {mostCommonMood[0] === "tired" && "😴"}
            </div>
            <div className="text-2xl font-bold text-white">
              {moodLabels[mostCommonMood[0] as keyof typeof moodLabels]}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {mostCommonMood[1]} {mostCommonMood[1] === 1 ? "vez" : "vezes"}
            </div>
          </div>
        </div>
      )}

      {/* Últimos 7 Dias */}
      {last7Days.length > 0 && (
        <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-5">
            Últimos 7 dias
          </h3>
          <div className="space-y-3">
            {last7Days.map((log, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF006E]/20 to-[#8338EC]/20 flex items-center justify-center text-2xl">
                    {log.mood === "great" && "😄"}
                    {log.mood === "good" && "🙂"}
                    {log.mood === "ok" && "😐"}
                    {log.mood === "tired" && "😴"}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">
                      {new Date(log.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short"
                      })}
                    </div>
                    <div className="text-sm text-gray-400">
                      Energia: {log.energy}/5
                    </div>
                  </div>
                </div>
                {log.completed && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem se não houver dados */}
      {logs.length === 0 && (
        <div className="bg-gradient-to-br from-[#FF006E]/10 to-[#8338EC]/10 border border-[#FF006E]/20 rounded-3xl p-10 text-center">
          <div className="text-6xl mb-5">📊</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Comece a treinar!
          </h3>
          <p className="text-gray-400 text-base">
            Complete seu primeiro treino para ver seu progresso aqui
          </p>
        </div>
      )}

      {/* Perfil do Usuário */}
      {userProfile && (
        <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-5">
            Seu Plano
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
              <span className="text-gray-400 text-sm font-medium">Objetivo</span>
              <span className="font-semibold text-white">
                {userProfile.goal === "lose" && "Emagrecer"}
                {userProfile.goal === "gain" && "Ganhar massa"}
                {userProfile.goal === "maintain" && "Manter forma"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
              <span className="text-gray-400 text-sm font-medium">Nível</span>
              <span className="font-semibold text-white">
                {userProfile.level === "beginner" && "Iniciante"}
                {userProfile.level === "intermediate" && "Intermediário"}
                {userProfile.level === "advanced" && "Avançado"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
              <span className="text-gray-400 text-sm font-medium">Frequência</span>
              <span className="font-semibold text-white">
                {userProfile.daysPerWeek}x por semana
              </span>
            </div>
          </div>
        </div>
      )}

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
