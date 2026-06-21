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

// ============================
// | TESTING FUNCTIONS BELOW  |
// ============================

export async function updateStartDate(newDate: string): Promise<AppData> {
  console.log(`Updating start date to: ${newDate}`);
  // 1. Get the entire AppData object
  const data = await loadAppData();

  // 2. Safety check: ensure activeHabit exists
  if (!data.activeHabit) {
    console.warn("No active habit found to update.");
    return data;
  }

  // 3. Create a new object with the updated startDate
  const updated: AppData = {
    ...data,
    activeHabit: {
      ...data.activeHabit,
      startDate: newDate,
    },
  };

  // 4. Save the full object back to the STORAGE_KEY
  await saveAppData(updated);

  return updated;
}

export const viewStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.table(result); // This displays your storage formatted as a neat table in DevTools!
  } catch (error) {
    console.error("Error loading AsyncStorage keys", error);
  }
};