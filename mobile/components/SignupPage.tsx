// app/signup.tsx
import { router } from "expo-router";
import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

const SignupPage = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
      <Text style={{ color: theme.text }}>Join us today!</Text>

      <View style={styles.form}>
        {["Full Name", "Email", "Password", "Confirm Password"].map(
          (placeholder, index) => (
            <TextInput
              key={index}
              style={[styles.input, { color: theme.background }]}
              placeholder={placeholder}
              placeholderTextColor={theme.background}
              keyboardType={
                placeholder === "Email" ? "email-address" : "default"
              }
              secureTextEntry={placeholder.toLowerCase().includes("password")}
              autoCapitalize={placeholder === "Full Name" ? "words" : "none"}
            />
          )
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={[styles.footerText, { color: theme.text + "CC" }]}>
          Already have an account?{" "}
          <Text
            style={[styles.link, { color: theme.primary }]}
            onPress={() => router.replace("/")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  input: {
    height: 50,
    borderColor: "#dcdde1",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    fontWeight: "600",
  },
});
