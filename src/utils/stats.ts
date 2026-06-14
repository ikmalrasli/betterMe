import { ActiveHabit, DayStatus } from '../types';
import { formatDateKey } from './date';

export function calculateWinRate(history: Record<string, DayStatus>): number {
  const entries = Object.values(history);
  if (entries.length === 0) return 0;

  const successCount = entries.filter((status) => status === 'success').length;
  return Math.round((successCount / entries.length) * 100);
}

export function calculateCurrentStreak(history: Record<string, DayStatus>): number {
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 366; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = formatDateKey(date);
    const status = history[key];

    if (status === 'success') {
      streak++;
      continue;
    }

    if (status === 'failed') {
      break;
    }

    if (i === 0) {
      break;
    }

    break;
  }

  return streak;
}


export function formatIdentity(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return 'I am becoming...';

  const lower = trimmed.toLowerCase();
  if (lower.startsWith('a ') || lower.startsWith('an ')) {
    return `I am becoming ${trimmed}`;
  }

  return `I am becoming a ${trimmed}`;
}

export function getHabitTypeLabel(type: ActiveHabit['type']): string {
  return type === 'positive' ? 'Build' : 'Break';
}
