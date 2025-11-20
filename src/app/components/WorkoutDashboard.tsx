"use client";

import type { UserProfile, WorkoutPlan } from "../types";
import { DailyWorkout } from "./DailyWorkout";

interface WorkoutDashboardProps {
  userProfile: UserProfile;
  workoutPlan: WorkoutPlan;
  onComplete: (log: any) => void;
}

export function WorkoutDashboard({ userProfile, workoutPlan, onComplete }: WorkoutDashboardProps) {
  return (
    <div>
      <DailyWorkout 
        userProfile={userProfile}
        workoutPlan={workoutPlan}
        onComplete={onComplete}
      />
    </div>
  );
}
