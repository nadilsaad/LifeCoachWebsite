import { api } from "./client";

export function getJournalEntries() {
  return api("/journal");
}

export function createJournalEntry(payload) {
  return api("/journal", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}