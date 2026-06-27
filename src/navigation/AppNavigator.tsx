import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { useHabit } from '../context/HabitContext';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootTabParamList = {
  Home: undefined;
  Stats: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{ tabBarLabel: 'Stats' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { data, isLoading } = useHabit();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data.activeHabit) {
    return <OnboardingScreen />;
  }

  return <MainTabs />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 88,
    paddingTop: 8,
    paddingBottom: 28,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
