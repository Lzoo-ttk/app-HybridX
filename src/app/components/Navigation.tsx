"use client";

import { Home, TrendingUp, Lightbulb } from "lucide-react";

interface NavigationProps {
  currentScreen: "daily" | "progress" | "tips";
  onNavigate: (screen: "daily" | "progress" | "tips") => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { id: "daily" as const, label: "Hoje", icon: Home },
    { id: "progress" as const, label: "Progresso", icon: TrendingUp },
    { id: "tips" as const, label: "Dicas", icon: Lightbulb }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-white/10 backdrop-blur-xl">
      <div className="max-w-md mx-auto flex">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-4 transition-all duration-300 ${
                isActive
                  ? "text-[#FF006E]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? "scale-110" : ""} transition-transform duration-300`} />
              <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-12 h-1 bg-gradient-to-r from-[#FF006E] to-[#8338EC] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
