import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActiveHabit, AppData } from '../types';
import { todayKey } from '../utils/date';

const STORAGE_KEY = '@the_one_thing_storage';

const EMPTY_DATA: AppData = {
  activeHabit: null,
  archive: [],
};

export async function loadAppData(): Promise<AppData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_DATA;
    return JSON.parse(raw) as AppData;
  } catch {
    return EMPTY_DATA;
  }
}

export async function saveAppData(data: AppData): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function createHabit(
  name: string,
  type: ActiveHabit['type']
): Promise<AppData> {
  const data: AppData = {
    activeHabit: {
      name: name.trim(),
      type,
      startDate: todayKey(),
      history: {},
    },
    archive: [],
  };

  await saveAppData(data);
  return data;
}

export async function resetHabit(): Promise<AppData> {
  await saveAppData(EMPTY_DATA);
  return EMPTY_DATA;
}

export async function updateDayStatus(
  dateKey: string,
  nextStatus: ActiveHabit['history'][string] | undefined
): Promise<AppData> {
  const data = await loadAppData();
  if (!data.activeHabit) return data;

  const history = { ...data.activeHabit.history };

  if (nextStatus === undefined) {
    delete history[dateKey];
  } else {
    history[dateKey] = nextStatus;
  }

  const updated: AppData = {
    ...data,
    activeHabit: {
      ...data.activeHabit,
      history,
    },
  };

  await saveAppData(updated);
  return updated;
}
