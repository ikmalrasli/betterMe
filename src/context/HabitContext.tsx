import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createHabit,
  loadAppData,
  resetHabit,
  updateDayStatus,
} from '../storage/storage';
import { AppData, DayStatus, HabitType } from '../types';

interface HabitContextValue {
  data: AppData;
  isLoading: boolean;
  startHabit: (name: string, type: HabitType) => Promise<void>;
  clearHabit: () => Promise<void>;
  toggleToday: (dateKey: string) => Promise<void>;
}

const HabitContext = createContext<HabitContextValue | null>(null);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>({ activeHabit: null, archive: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAppData()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  const startHabit = useCallback(async (name: string, type: HabitType) => {
    const next = await createHabit(name, type);
    setData(next);
  }, []);

  const clearHabit = useCallback(async () => {
    const next = await resetHabit();
    setData(next);
  }, []);

  const toggleToday = useCallback(async (dateKey: string) => {
    const fresh = await loadAppData();
    const current = fresh.activeHabit?.history[dateKey];
    let nextStatus: DayStatus | undefined;

    if (current === undefined) nextStatus = 'success';
    else if (current === 'success') nextStatus = 'failed';
    else nextStatus = undefined;

    const next = await updateDayStatus(dateKey, nextStatus);
    setData(next);
  }, []);

  const value = useMemo(
    () => ({ data, isLoading, startHabit, clearHabit, toggleToday }),
    [data, isLoading, startHabit, clearHabit, toggleToday]
  );

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
}

export function useHabit() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabit must be used within HabitProvider');
  }
  return context;
}
