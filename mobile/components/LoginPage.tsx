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
import { useRouter } from "expo-router";
import { loginUser } from "@/services/userService";
import { useAuth } from "@/context/AuthContext";


const LoginPage = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  // Use theme.text for placeholder color. theme.name is not a color, it's a string like 'light' or 'dark'.
  // Using theme.name as a color will cause the placeholder to be invisible or default to black.

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const user = await loginUser({ email, password });
      await login(user);
      setError("");
      router.push("/(tabs)");
    } catch (err: any) {
      console.error("Login failed:", err?.response?.data || err.message);
      setError(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
      <Text style={{ color: theme.text }}>Login to your account</Text>

      <View style={styles.form}>
        {error ? (
          <Text style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</Text>
        ) : null}
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Email"
          placeholderTextColor={theme.text + "66"}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => { setEmail(text); setError(""); }}
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Password"
          placeholderTextColor={theme.text + "66"}
          secureTextEntry
          value={password}
          onChangeText={text => { setPassword(text); setError(""); }}
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>Sign In</Text>
        </TouchableOpacity>

        <Text style={[styles.footerText, { color: theme.text + "CC" }]}>
          Don’t have an account?{" "}
          <Text
            style={[styles.link, { color: theme.primary }]}
            onPress={() => router.replace("/signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
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
