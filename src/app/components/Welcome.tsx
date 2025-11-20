"use client";

import { ArrowRight, Zap } from "lucide-react";

interface WelcomeProps {
  onComplete: () => void;
}

export function Welcome({ onComplete }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo Premium */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-[#00FF7F] to-[#004D00] flex items-center justify-center shadow-2xl shadow-[#00FF7F]/30 animate-pulse">
            <Zap className="w-16 h-16 text-[#0D0D0D]" strokeWidth={2.5} />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-3xl bg-[#00FF7F]/20 blur-3xl -z-10"></div>
        </div>

        {/* Título */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-[#00FF7F] tracking-tight">
            HybridX
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Seu treino híbrido profissional
          </p>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Musculação + Cardio em um único plano personalizado
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 pt-4">
          {[
            { icon: "💪", text: "Planos personalizados" },
            { icon: "🥗", text: "Dieta balanceada" },
            { icon: "📊", text: "Acompanhamento completo" }
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-[#00FF7F]/5 border border-[#00FF7F]/10 rounded-2xl backdrop-blur-sm"
            >
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-gray-300 font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-[#00FF7F] to-[#004D00] hover:opacity-90 text-[#0D0D0D] font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-[#00FF7F]/30 text-lg group"
        >
          Começar Agora
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-xs text-gray-600 pt-4">
          Minimalista • Tech • Premium
        </p>
      </div>
    </div>
  );
}
