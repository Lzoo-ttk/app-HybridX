"use client";

import { Lightbulb, Battery, Scale, Moon, Target, Repeat } from "lucide-react";

export function Tips() {
  const tips = [
    {
      icon: <Battery className="w-6 h-6" />,
      title: "Fadiga e Recuperação",
      content: "Se sentir muito cansado, reduza a intensidade ou tire um dia extra de descanso. Overtraining prejudica seus resultados.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Equilíbrio Cardio x Força",
      content: "Faça cardio após musculação, ou em dias separados. Cardio antes pode comprometer seu desempenho na força.",
      color: "from-[#FF006E] to-[#8338EC]"
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "Importância do Descanso",
      content: "Durma 7-9h por noite. É no descanso que seus músculos crescem e seu corpo se recupera. Sem sono, sem progresso.",
      color: "from-[#8338EC] to-[#3A86FF]"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Mantenha a Motivação",
      content: "Defina metas pequenas e celebre cada conquista. Progresso é progresso, não importa o tamanho.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Repeat className="w-6 h-6" />,
      title: "Consistência > Perfeição",
      content: "É melhor treinar 80% bem 5x por semana do que 100% perfeito 2x. Consistência traz resultados reais.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Alimentação Simples",
      content: "Não precisa ser perfeito. Foque em: proteína em cada refeição, vegetais, água e evite ultraprocessados.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">Dicas Rápidas</h2>
        <p className="text-gray-400 text-base mt-2">
          Principais dores do treino híbrido
        </p>
      </div>

      {/* Cards de Dicas */}
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-[#1A1A1A] rounded-3xl shadow-xl overflow-hidden border border-white/5"
          >
            {/* Header colorido */}
            <div className={`bg-gradient-to-r ${tip.color} p-5 text-white`}>
              <div className="flex items-center gap-3">
                {tip.icon}
                <h3 className="font-bold text-lg">{tip.title}</h3>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-5">
              <p className="text-gray-300 text-base leading-relaxed">
                {tip.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Card Extra de Motivação */}
      <div className="bg-gradient-to-br from-[#FF006E] via-[#8338EC] to-[#3A86FF] rounded-3xl p-8 text-white shadow-2xl">
        <div className="text-center">
          <div className="text-5xl mb-4">💪</div>
          <h3 className="text-2xl font-bold mb-3">Você está no caminho certo!</h3>
          <p className="text-base text-white/90 leading-relaxed">
            Treino híbrido é sobre equilíbrio. Seja paciente com seu corpo e os resultados virão.
          </p>
        </div>
      </div>
    </div>
  );
}
