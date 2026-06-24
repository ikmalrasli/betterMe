import * as Haptics from 'expo-haptics';
import React, { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../constants/theme';
import { useHabit } from '../context/HabitContext';
import { DayStatus } from '../types';
import {
  formatDateKey,
  getDaysInMonth,
  getMonthStartDayIndex,
  todayKey,
  WEEKDAY_LABELS,
} from '../utils/date';
import {
  calculateCurrentStreak,
  calculateWinRate,
  formatIdentity,
} from '../utils/stats';

function getCellStyle(status: DayStatus | undefined, isToday: boolean) {
  if (status === 'success') {
    return { backgroundColor: colors.success, borderColor: colors.success };
  }
  if (status === 'failed') {
    return { backgroundColor: colors.failure, borderColor: colors.failure };
  }
  if (isToday) {
    return {
      backgroundColor: colors.surfaceElevated,
      borderColor: colors.accent,
    };
  }
  return { backgroundColor: colors.surface, borderColor: colors.border };
}

export default function HomeScreen() {
  const { data, toggleToday } = useHabit();
  const habit = data.activeHabit!;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = todayKey();

  const monthLabel = now.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const calendarCells = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const startOffset = getMonthStartDayIndex(year, month);
    const cells: Array<{ day: number | null; dateKey: string | null }> = [];

    // Fill in the blank days at the start of the month to align the first day correctly
    for (let i = 0; i < startOffset; i++) {
      cells.push({ day: null, dateKey: null });
    }

    // Fill in the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      cells.push({ day, dateKey: formatDateKey(date) });
    }

    // Fill in the blank days at the end of the month to complete the last week
    // This prevents the final row from stretching cells and ruining the square aspect ratio.
    const remainder = cells.length % 7;
    if (remainder !== 0) {
      const paddingNeeded = 7 - remainder;
      for (let i = 0; i < paddingNeeded; i++) {
        cells.push({ day: null, dateKey: null });
      }
    }

    return cells;
  }, [year, month]);

  // Chunk our linear array (calendarCells) into arrays of 7 days (per week) for rendering
  const weeks = useMemo(() => {
    const chunked = [];
    for (let i = 0; i < calendarCells.length; i += 7) {
      chunked.push(calendarCells.slice(i, i + 7));
    }
    return chunked;
  }, [calendarCells]);

  const winRate = calculateWinRate(habit.history);
  const currentStreak = calculateCurrentStreak(habit.history);

  const isEditableDay = (dateKey: string) =>
    dateKey >= habit.startDate && dateKey <= today;

  const handleDayPress = async (dateKey: string | null) => {
    if (!dateKey || !isEditableDay(dateKey)) return;

    const current = habit.history[dateKey];
    await toggleToday(dateKey);

    if (current !== 'success') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.identity}>{formatIdentity(habit.identity)}</Text>
          <Text style={styles.habitLabel}>{habit.name}</Text>
          <Text style={styles.monthLabel}>{monthLabel}</Text>
        </View>

        <View style={styles.weekdayRow}>
          {WEEKDAY_LABELS.map((label) => (
            <Text key={label} style={styles.weekdayLabel}>
              {label}
            </Text>
          ))}
        </View>

        <View style={styles.calendar}>
          {weeks.map((week, weekIndex) => (
            <View key={`week-${weekIndex}`} style={styles.weekRow}>
              {week.map((cell, cellIndex) => {
                if (cell.day === null) {
                  return (
                    <View
                      key={`empty-${weekIndex}-${cellIndex}`}
                      style={styles.cellEmpty}
                    />
                  );
                }

                const isToday = cell.dateKey === today;
                const isEditable = isEditableDay(cell.dateKey!);
                const status = habit.history[cell.dateKey!];
                const cellStyle = getCellStyle(status, isToday);

                return (
                  <Pressable
                    key={cell.dateKey!}
                    style={[
                      styles.cell,
                      cellStyle,
                      !isEditable && styles.cellDisabled,
                    ]}
                    onPress={() => handleDayPress(cell.dateKey)}
                    disabled={!isEditable}
                  >
                    <Text
                      style={[
                        styles.cellText,
                        (status === 'success' || status === 'failed') &&
                          styles.cellTextMarked,
                        isToday && !status && styles.cellTextToday,
                      ]}
                    >
                      {cell.day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        <Text style={styles.tapHint}>Tap a day to mark success or failure</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{winRate}%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  header: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  identity: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
  },
  habitLabel: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  monthLabel: {
    color: colors.textMuted,
    fontSize: 15,
    textTransform: 'uppercase',
  },
  weekdayRow: {
    flexDirection: 'row',
    gap: spacing.xs, // Matches the gap of the cells to ensure header alignment
    marginBottom: spacing.xs,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    color: colors.textDim,
    fontSize: 12,
    fontWeight: '600',
  },
  calendar: {
    // Removed row & wrap, it's now just a column container of rows
  },
  weekRow: {
    flexDirection: 'row',
    gap: spacing.xs, // Horizontal gaps between cells
    marginBottom: spacing.xs, // Vertical gap between rows
  },
  cell: {
    flex: 1,
    aspectRatio: 1, // Ensures perfect square
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  cellEmpty: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: 'transparent',
  },
  cellDisabled: {
    opacity: 0.5,
  },
  cellText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '500',
  },
  cellTextMarked: {
    color: colors.text,
    fontWeight: '700',
  },
  cellTextToday: {
    color: colors.accent,
    fontWeight: '700',
  },
  tapHint: {
    color: colors.textDim,
    fontSize: 13,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  statValue: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
});