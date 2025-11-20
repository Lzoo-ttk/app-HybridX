"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Welcome } from "./components/Welcome";
import { Onboarding } from "./components/Onboarding";
import { WorkoutDashboard } from "./components/WorkoutDashboard";
import { DietDashboard } from "./components/DietDashboard";
import { Profile } from "./components/Profile";
import { WeeklySummary } from "./components/WeeklySummary";
import { generateWeeklyPlan } from "./utils/planGenerator";
import type { UserProfile, WorkoutPlan, DailyLog } from "./types";

export default function HybridX() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "onboarding" | "workout" | "diet" | "profile" | "summary">("welcome");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);

  // Verificar autenticação e carregar dados do Supabase
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/auth");
        return;
      }

      setUserId(session.user.id);
      await loadUserData(session.user.id);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      router.push("/auth");
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async (uid: string) => {
    try {
      // Carregar perfil
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", uid)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Erro ao carregar perfil:", profileError);
      }

      if (profileData) {
        const profile: UserProfile = {
          name: profileData.name,
          goal: profileData.goal,
          level: profileData.level,
          daysPerWeek: profileData.days_per_week,
          dietPreference: profileData.diet_preference,
          restrictions: profileData.restrictions,
          weight: profileData.weight,
          height: profileData.height,
          age: profileData.age,
        };
        setUserProfile(profile);
        setCurrentScreen("workout");

        // Carregar plano de treino
        const { data: planData } = await supabase
          .from("workout_plans")
          .select("*")
          .eq("user_id", uid)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (planData) {
          setWorkoutPlan(planData.plan_data);
        }

        // Carregar logs diários
        const { data: logsData } = await supabase
          .from("daily_logs")
          .select("*")
          .eq("user_id", uid)
          .order("date", { ascending: false });

        if (logsData) {
          const logs: DailyLog[] = logsData.map((log) => ({
            date: log.date,
            completed: log.completed,
            energy: log.energy,
            mood: log.mood as "great" | "good" | "ok" | "tired",
            weight: log.weight,
          }));
          setDailyLogs(logs);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleWelcomeComplete = () => {
    setCurrentScreen("onboarding");
  };

  const handleOnboardingComplete = async (profile: UserProfile) => {
    if (!userId) return;

    try {
      // Salvar perfil no Supabase
      const { error: profileError } = await supabase.from("profiles").upsert({
        user_id: userId,
        name: profile.name,
        goal: profile.goal,
        level: profile.level,
        days_per_week: profile.daysPerWeek,
        diet_preference: profile.dietPreference,
        restrictions: profile.restrictions,
        weight: profile.weight,
        height: profile.height,
        age: profile.age,
        updated_at: new Date().toISOString(),
      });

      if (profileError) throw profileError;

      // Gerar e salvar plano de treino
      const plan = generateWeeklyPlan(profile);
      const { error: planError } = await supabase.from("workout_plans").insert({
        user_id: userId,
        plan_data: plan,
      });

      if (planError) throw planError;

      setUserProfile(profile);
      setWorkoutPlan(plan);
      setCurrentScreen("workout");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  const handleWorkoutComplete = async (log: DailyLog) => {
    if (!userId) return;

    try {
      const { error } = await supabase.from("daily_logs").upsert({
        user_id: userId,
        date: log.date,
        completed: log.completed,
        energy: log.energy,
        mood: log.mood,
        weight: log.weight,
      });

      if (error) throw error;

      const updatedLogs = [...dailyLogs, log];
      setDailyLogs(updatedLogs);
    } catch (error) {
      console.error("Erro ao salvar log:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#00FF7F] to-[#004D00] mb-4 shadow-2xl shadow-[#00FF7F]/30 animate-pulse">
            <span className="text-4xl">⚡</span>
          </div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (currentScreen === "welcome") {
    return <Welcome onComplete={handleWelcomeComplete} />;
  }

  if (currentScreen === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="max-w-md mx-auto min-h-screen bg-[#0D0D0D]">
        {/* Header Premium */}
        <header className="bg-gradient-to-br from-[#004D00] to-[#0D0D0D] p-6 pb-8 border-b border-[#00FF7F]/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#00FF7F] tracking-tight">HybridX</h1>
              <p className="text-sm text-gray-400 mt-1">Premium Training</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00FF7F] to-[#004D00] flex items-center justify-center shadow-lg shadow-[#00FF7F]/20">
                <span className="text-2xl">⚡</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="pb-24">
          {currentScreen === "workout" && userProfile && workoutPlan && (
            <WorkoutDashboard
              userProfile={userProfile}
              workoutPlan={workoutPlan}
              onComplete={handleWorkoutComplete}
            />
          )}
          {currentScreen === "diet" && userProfile && workoutPlan && (
            <DietDashboard userProfile={userProfile} workoutPlan={workoutPlan} />
          )}
          {currentScreen === "profile" && userProfile && (
            <Profile userProfile={userProfile} onReset={handleLogout} />
          )}
          {currentScreen === "summary" && (
            <WeeklySummary logs={dailyLogs} userProfile={userProfile} />
          )}
        </div>

        {/* Navigation Premium */}
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-[#00FF7F]/10">
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="flex items-center justify-around">
              {[
                { id: "workout", label: "Treinos", icon: "💪" },
                { id: "diet", label: "Dieta", icon: "🥗" },
                { id: "summary", label: "Resumo", icon: "📊" },
                { id: "profile", label: "Perfil", icon: "👤" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id as any)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                    currentScreen === item.id
                      ? "bg-[#00FF7F]/10 text-[#00FF7F]"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
