export type HabitType = 'positive' | 'negative';
export type DayStatus = 'success' | 'failed';

export interface ActiveHabit {
  identity: string;
  name: string;
  type: HabitType;
  startDate: string;
  history: Record<string, DayStatus>;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  firstDayOfWeek: 'sunday' | 'monday';
}

export interface AppData {
  activeHabit: ActiveHabit | null;
  archive: [];
  settings: AppSettings;
}
