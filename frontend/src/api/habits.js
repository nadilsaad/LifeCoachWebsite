import { api } from "./client";

export function getTodayHabits() {
  return api("/habits/today");
}

export function getHabits() {
  return api("/habits");
}

export function createHabit(payload) {
  return api("/habits", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateHabitLog(habitId, payload) {
  return api(`/habits/${habitId}/log`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}