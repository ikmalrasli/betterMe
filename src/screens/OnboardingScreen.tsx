import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../constants/theme';
import { useHabit } from '../context/HabitContext';
import { HabitType } from '../types';

export default function OnboardingScreen() {
  const { startHabit } = useHabit();
  const [identity, setIdentity] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState<HabitType>('positive');

  const canSubmit = name.trim().length > 0;

  const handleStart = async () => {
    if (!canSubmit) return;
    await startHabit(identity, name, type);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.brand}>betterME</Text>
          <Text style={styles.question}>Who do you want to become?</Text>
        </View>

        <TextInput
          style={styles.input}
            placeholder="e.g. a Reader, a Non-Smoker"
          placeholderTextColor={colors.textDim}
          value={identity}
          onChangeText={setIdentity}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
        />

        <Text style={styles.sectionLabel}>Habit type</Text>
        <View style={styles.typeRow}>
          <Pressable
            style={[styles.typeButton, type === 'positive' && styles.typeActivePositive]}
            onPress={() => setType('positive')}
          >
            <Text
              style={[
                styles.typeText,
                type === 'positive' && styles.typeTextActive,
              ]}
            >
              Build
            </Text>
            <Text style={styles.typeHint}>Positive reinforcement</Text>
          </Pressable>

          <Pressable
            style={[styles.typeButton, type === 'negative' && styles.typeActiveNegative]}
            onPress={() => setType('negative')}
          >
            <Text
              style={[
                styles.typeText,
                type === 'negative' && styles.typeTextActive,
              ]}
            >
              Break
            </Text>
            <Text style={styles.typeHint}>Abstinence tracking</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>Habit {type === 'positive' ? 'Building' : 'Breaking'} Name</Text>
        <TextInput
          style={styles.input}
          placeholder={type === 'positive' ? 'e.g. Read 20 pages, Exercise' : 'e.g. No smoking, No alcohol'}
          placeholderTextColor={colors.textDim}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="done"
        />
        <Pressable
          style={[styles.startButton, !canSubmit && styles.startButtonDisabled]}
          onPress={handleStart}
          disabled={!canSubmit}
        >
          <Text style={styles.startButtonText}>Start Journey</Text>
        </Pressable>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
    gap: spacing.lg,
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  brand: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  question: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 22,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  typeRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  typeButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  typeActivePositive: {
    borderColor: colors.positive,
    backgroundColor: colors.successMuted,
  },
  typeActiveNegative: {
    borderColor: colors.negative,
    backgroundColor: colors.failureMuted,
  },
  typeText: {
    color: colors.textMuted,
    fontSize: 18,
    fontWeight: '700',
  },
  typeTextActive: {
    color: colors.text,
  },
  typeHint: {
    color: colors.textDim,
    fontSize: 12,
  },
  startButton: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  startButtonDisabled: {
    opacity: 0.4,
  },
  startButtonText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
});
