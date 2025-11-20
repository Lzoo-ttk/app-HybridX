"use client";

import type { DailyLog, UserProfile } from "../types";
import { Calendar, Zap, TrendingUp, Award } from "lucide-react";

interface WeeklySummaryProps {
  logs: DailyLog[];
  userProfile: UserProfile | null;
}

export function WeeklySummary({ logs, userProfile }: WeeklySummaryProps) {
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

  // Calcular streak (dias consecutivos)
  const calculateStreak = () => {
    if (logs.length === 0) return 0;
    let streak = 0;
    const today = new Date();
    
    for (let i = logs.length - 1; i >= 0; i--) {
      const logDate = new Date(logs[i].date);
      const diffDays = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak && logs[i].completed) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const streak = calculateStreak();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">Resumo Semanal</h2>
        <p className="text-gray-400 text-base mt-2">
          Acompanhe sua evolução
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total de Treinos */}
        <div className="bg-gradient-to-br from-[#00FF7F] to-[#004D00] rounded-3xl p-6 text-white shadow-2xl shadow-[#00FF7F]/20">
          <Calendar className="w-10 h-10 mb-4 opacity-90" />
          <div className="text-4xl font-bold mb-2">{totalWorkouts}</div>
          <div className="text-sm opacity-90 font-medium">Treinos feitos</div>
        </div>

        {/* Energia Média */}
        <div className="bg-gradient-to-br from-[#004D00] to-[#00FF7F] rounded-3xl p-6 text-white shadow-2xl shadow-[#00FF7F]/20">
          <Zap className="w-10 h-10 mb-4 opacity-90" />
          <div className="text-4xl font-bold mb-2">{averageEnergy}</div>
          <div className="text-sm opacity-90 font-medium">Energia média</div>
        </div>
      </div>

      {/* Streak */}
      <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-[#00FF7F]/10">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-[#00FF7F]" />
          <h3 className="text-xl font-bold text-white">Sequência Atual</h3>
        </div>
        <div className="text-center py-6">
          <div className="text-6xl font-bold text-[#00FF7F] mb-2">
            {streak}
          </div>
          <div className="text-gray-400">
            {streak === 1 ? "dia consecutivo" : "dias consecutivos"}
          </div>
        </div>
      </div>

      {/* Humor Predominante */}
      {logs.length > 0 && (
        <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-[#00FF7F]/10">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="w-6 h-6 text-[#00FF7F]" />
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

      {/* Gráfico de Progresso Semanal */}
      {last7Days.length > 0 && (
        <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-[#00FF7F]/10">
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
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00FF7F]/20 to-[#004D00]/20 flex items-center justify-center text-2xl">
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
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00FF7F] to-[#004D00] flex items-center justify-center shadow-lg shadow-[#00FF7F]/20">
                    <span className="text-[#0D0D0D] text-sm font-bold">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem se não houver dados */}
      {logs.length === 0 && (
        <div className="bg-gradient-to-br from-[#00FF7F]/10 to-[#004D00]/10 border border-[#00FF7F]/20 rounded-3xl p-10 text-center">
          <div className="text-6xl mb-5">📊</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Comece a treinar!
          </h3>
          <p className="text-gray-400 text-base">
            Complete seu primeiro treino para ver seu progresso aqui
          </p>
        </div>
      )}

      {/* Metas da Semana */}
      {userProfile && (
        <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-[#00FF7F]/10">
          <h3 className="text-xl font-bold text-white mb-5">
            Seu Plano Semanal
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
              <span className="text-gray-400 text-sm font-medium">Meta de treinos</span>
              <span className="font-semibold text-white">
                {totalWorkouts} / {userProfile.daysPerWeek} treinos
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
              <span className="text-gray-400 text-sm font-medium">Progresso</span>
              <span className="font-semibold text-[#00FF7F]">
                {Math.round((totalWorkouts / userProfile.daysPerWeek) * 100)}%
              </span>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mt-5">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00FF7F] to-[#004D00] rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalWorkouts / userProfile.daysPerWeek) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
