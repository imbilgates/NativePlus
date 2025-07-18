import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

import { registerUser } from "@/services/userService"
import { router } from "expo-router";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      await registerUser( {
        name,
        email,
        password,
      });

      Alert.alert("Success", "Account created successfully");
      router.replace("/");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
      <Text style={{ color: theme.text }}>Join us today!</Text>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Full Name"
          placeholderTextColor={theme.text + "66"}
          onChangeText={(text) => handleChange("name", text)}
          autoCapitalize="words"
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Email"
          placeholderTextColor={theme.name + "66"}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Password"
          placeholderTextColor={theme.name + "66"}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Confirm Password"
          placeholderTextColor={theme.name + "66"}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleSignup}
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
