import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../context/ThemeContext";
import { themes } from "../constants/theme";
import { ThemeType, ThemeName } from "../types/theme";

const ThemePicker = () => {
  const { setCustomTheme, theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>🎨 Select Theme</Text>
      <Picker
        selectedValue={theme.name}
        onValueChange={(value: ThemeName) => setCustomTheme(value)}
        style={styles.picker}
        itemStyle={Platform.OS === "ios" ? styles.item : undefined}
        mode="dropdown"
      >
        {themes.map((t) =>
          t?.name ? (
            <Picker.Item
              key={t.name}
              label={`${theme.name === t.name ? "✅ " : ""}${getThemeIcon(t.name)} ${capitalize(t.name)}`}
              value={t.name}
              color={Platform.OS === "ios" ? (theme.name === t.name ? theme.primary : "#666") : undefined}
            />
          ) : null
        )}
      </Picker>
    </View>
  );
};

export default ThemePicker;

const getThemeIcon = (name: ThemeType["name"]) => {
  switch (name) {
    case "light":
      return "🌞";
    case "dark":
      return "🌙";
    case "coffee":
      return "☕";
    case "forest":
      return "🌲";
    case "sunset":
      return "🌅";
    default:
      return "🎨";
  }
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  picker: {
    width: 220,
    height: 180,
  },
  item: {
    fontSize: 16,
    height: 180,
  },
});
