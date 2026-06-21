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
import { formatIdentity, getHabitTypeLabel } from '../utils/stats';

export default function SettingsScreen() {
  
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
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
