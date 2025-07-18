import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const _layout = () => {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: theme.background,
            borderTopColor: theme.background,
          },
        ],
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.primary,
        tabBarLabelStyle: [styles.tabBarLabel, { color: theme.text }],
        tabBarIcon: ({ focused, color }) => (
          <Ionicons
            name={getIconName(route.name, focused)}
            size={22}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default _layout;

const getIconName = (
  routeName: string,
  focused: boolean = false
): keyof typeof Ionicons.glyphMap => {
  switch (routeName) {
    case "index":
      return focused ? "home" : "home-outline";
    case "profile":
      return focused ? "person" : "person-outline";
    default:
      return "ellipse";
  }
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 10,
    elevation: 10,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    borderTopWidth: 1,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});
