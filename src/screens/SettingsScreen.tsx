import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../constants/theme';
import { useHabit } from '../context/HabitContext';
import { formatIdentity, getHabitTypeLabel } from '../utils/stats';
import { updateSetting } from '../storage/storage';

export default function SettingsScreen() {
  const { data, clearHabit } = useHabit();
  const habit = data.activeHabit!;

  const handleFirstDayOfWeekChange = () => {
    const newFirstDayOfWeek = data.settings.firstDayOfWeek === 'sunday' ? 'monday' : 'sunday';
    updateSetting('firstDayOfWeek', newFirstDayOfWeek);
    console.log(`First day of week changed to: ${data.settings.firstDayOfWeek}`);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset / Change Habit',
      'This will clear your current habit and return you to onboarding. Your tracking history will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => clearHabit(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Active Identity</Text>
          <Text style={styles.cardValue}>{formatIdentity(habit.name)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Habit Type</Text>
          <Text style={styles.cardValue}>{getHabitTypeLabel(habit.type)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Journey Started</Text>
          <Text style={styles.cardValue}>
            {new Date(habit.startDate + 'T12:00:00').toLocaleDateString(
              'default',
              { month: 'long', day: 'numeric', year: 'numeric' }
            )}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Days Tracked</Text>
          <Text style={styles.cardValue}>
            {Object.keys(habit.history).length}
          </Text>
        </View>

        <Pressable style={styles.card} onPress={handleFirstDayOfWeekChange}>
          <Text style={styles.cardLabel}>First Day of Week</Text>
          <Text style={styles.cardValue}>
            {data.settings.firstDayOfWeek === 'sunday' ? 'Sunday' : 'Monday'}
          </Text>
        </Pressable>

        <Pressable style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset / Change Habit</Text>
        </Pressable>

        <Text style={styles.footer}>
          MVP mode — no graveyard or graduation mechanics yet.
        </Text>
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
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  cardLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: colors.failureMuted,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.failure,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  resetButtonText: {
    color: colors.negative,
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    color: colors.textDim,
    fontSize: 13,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
