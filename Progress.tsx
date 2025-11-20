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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Seu Progresso</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Acompanhe sua evolução
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total de Treinos */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-5 text-white shadow-lg">
          <Calendar className="w-8 h-8 mb-3 opacity-90" />
          <div className="text-3xl font-bold mb-1">{totalWorkouts}</div>
          <div className="text-sm opacity-90">Treinos feitos</div>
        </div>

        {/* Energia Média */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white shadow-lg">
          <Zap className="w-8 h-8 mb-3 opacity-90" />
          <div className="text-3xl font-bold mb-1">{averageEnergy}</div>
          <div className="text-sm opacity-90">Energia média</div>
        </div>
      </div>

      {/* Humor Predominante */}
      {logs.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Como você tem se sentido
            </h3>
          </div>
          <div className="text-center py-4">
            <div className="text-5xl mb-3">
              {mostCommonMood[0] === "great" && "😄"}
              {mostCommonMood[0] === "good" && "🙂"}
              {mostCommonMood[0] === "ok" && "😐"}
              {mostCommonMood[0] === "tired" && "😴"}
            </div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              {moodLabels[mostCommonMood[0] as keyof typeof moodLabels]}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {mostCommonMood[1]} {mostCommonMood[1] === 1 ? "vez" : "vezes"}
            </div>
          </div>
        </div>
      )}

      {/* Últimos 7 Dias */}
      {last7Days.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Últimos 7 dias
          </h3>
          <div className="space-y-3">
            {last7Days.map((log, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    {log.mood === "great" && "😄"}
                    {log.mood === "good" && "🙂"}
                    {log.mood === "ok" && "😐"}
                    {log.mood === "tired" && "😴"}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(log.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short"
                      })}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Energia: {log.energy}/5
                    </div>
                  </div>
                </div>
                {log.completed && (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem se não houver dados */}
      {logs.length === 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Comece a treinar!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Complete seu primeiro treino para ver seu progresso aqui
          </p>
        </div>
      )}

      {/* Perfil do Usuário */}
      {userProfile && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Seu Plano
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Objetivo</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {userProfile.goal === "lose" && "Emagrecer"}
                {userProfile.goal === "gain" && "Ganhar massa"}
                {userProfile.goal === "maintain" && "Manter forma"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Nível</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {userProfile.level === "beginner" && "Iniciante"}
                {userProfile.level === "intermediate" && "Intermediário"}
                {userProfile.level === "advanced" && "Avançado"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Frequência</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {userProfile.daysPerWeek}x por semana
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Botão Resetar */}
      <button
        onClick={onReset}
        className="w-full border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-semibold py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        Recomeçar do Zero
      </button>
    </div>
  );
}
