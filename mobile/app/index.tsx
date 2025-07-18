import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Login = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ThemeSwitcher />
      <Text style={[styles.welcomeText, { color: theme.text }]}>
        Welcome to the App
      </Text>

      <Text style={[styles.subtitle, { color: theme.text + "AA" }]}>
        Let’s get you started
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
        ]}
        onPress={() => router.push("/(auth)")}
      >
        <Text style={styles.buttonText}>Let’s Go!</Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 32,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: Platform.OS === "android" ? 5 : 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 1,
  },
});
