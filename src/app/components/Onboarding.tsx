"use client";

import { useState } from "react";
import type { UserProfile, Goal, Level } from "../types";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [level, setLevel] = useState<Level>("beginner");
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [dietPreference, setDietPreference] = useState<"balanced" | "low-carb" | "high-protein" | "vegetarian">("balanced");

  const handleSubmit = () => {
    onComplete({ 
      name,
      goal, 
      level, 
      daysPerWeek,
      dietPreference
    });
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="bg-[#1A1A1A] rounded-3xl shadow-2xl p-8 w-full max-w-md border border-[#00FF7F]/10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00FF7F] to-[#004D00] flex items-center justify-center shadow-lg shadow-[#00FF7F]/20">
            <Zap className="w-8 h-8 text-[#0D0D0D]" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-[#00FF7F]">HybridX</h1>
          <p className="text-gray-400 mt-2">Configure seu perfil</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all ${
                s <= step ? "bg-gradient-to-r from-[#00FF7F] to-[#004D00]" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Nome */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Como você se chama?
              </h2>
              <p className="text-sm text-gray-400">
                Vamos personalizar sua experiência
              </p>
            </div>

            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full px-6 py-4 bg-[#0D0D0D] border-2 border-[#00FF7F]/20 rounded-2xl text-white placeholder-gray-500 focus:border-[#00FF7F] focus:outline-none transition-all"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-[#00FF7F] to-[#004D00] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-[#0D0D0D] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00FF7F]/20"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Objetivo */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Qual seu objetivo?
              </h2>
              <p className="text-sm text-gray-400">
                Escolha o que melhor descreve sua meta
              </p>
            </div>

            <div className="space-y-3">
              {[
                { value: "lose" as Goal, label: "Emagrecer", desc: "Perder gordura e definir", icon: "🔥" },
                { value: "gain" as Goal, label: "Ganhar massa", desc: "Aumentar músculos", icon: "💪" },
                { value: "maintain" as Goal, label: "Manter forma", desc: "Saúde e condicionamento", icon: "⚡" }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGoal(option.value)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                    goal === option.value
                      ? "border-[#00FF7F] bg-[#00FF7F]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{option.icon}</span>
                    <div className="font-bold text-white text-lg">{option.label}</div>
                  </div>
                  <div className="text-sm text-gray-400 ml-11">{option.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-white/10 bg-white/5 text-gray-300 font-bold py-4 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-gradient-to-r from-[#00FF7F] to-[#004D00] hover:opacity-90 text-[#0D0D0D] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00FF7F]/20"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Nível */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Qual seu nível atual?
              </h2>
              <p className="text-sm text-gray-400">
                Seja honesto para ter o melhor plano
              </p>
            </div>

            <div className="space-y-3">
              {[
                { value: "beginner" as Level, label: "Iniciante", desc: "Pouca ou nenhuma experiência", icon: "🌱" },
                { value: "intermediate" as Level, label: "Intermediário", desc: "Treino há alguns meses", icon: "🚀" },
                { value: "advanced" as Level, label: "Avançado", desc: "Treino há mais de 1 ano", icon: "⭐" }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLevel(option.value)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                    level === option.value
                      ? "border-[#00FF7F] bg-[#00FF7F]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{option.icon}</span>
                    <div className="font-bold text-white text-lg">{option.label}</div>
                  </div>
                  <div className="text-sm text-gray-400 ml-11">{option.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-white/10 bg-white/5 text-gray-300 font-bold py-4 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-gradient-to-r from-[#00FF7F] to-[#004D00] hover:opacity-90 text-[#0D0D0D] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00FF7F]/20"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Frequência e Dieta */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Últimas configurações
              </h2>
              <p className="text-sm text-gray-400">
                Defina sua frequência e preferência alimentar
              </p>
            </div>

            {/* Frequência */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Dias de treino por semana
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[3, 4, 5, 6].map((days) => (
                  <button
                    key={days}
                    onClick={() => setDaysPerWeek(days)}
                    className={`aspect-square rounded-2xl border-2 font-bold text-3xl transition-all ${
                      daysPerWeek === days
                        ? "border-[#00FF7F] bg-gradient-to-br from-[#00FF7F] to-[#004D00] text-[#0D0D0D] shadow-lg shadow-[#00FF7F]/30"
                        : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {days}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferência de Dieta */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Preferência alimentar
              </label>
              <div className="space-y-2">
                {[
                  { value: "balanced" as const, label: "Balanceada", icon: "⚖️" },
                  { value: "low-carb" as const, label: "Low Carb", icon: "🥑" },
                  { value: "high-protein" as const, label: "Alta Proteína", icon: "🍗" },
                  { value: "vegetarian" as const, label: "Vegetariana", icon: "🥗" }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDietPreference(option.value)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                      dietPreference === option.value
                        ? "border-[#00FF7F] bg-[#00FF7F]/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span className="font-semibold text-white">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 border-2 border-white/10 bg-white/5 text-gray-300 font-bold py-4 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-[#00FF7F] to-[#004D00] hover:opacity-90 text-[#0D0D0D] font-bold py-4 rounded-2xl transition-all shadow-2xl"
              >
                Criar meu plano
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
