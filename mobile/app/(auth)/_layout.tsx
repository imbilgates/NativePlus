import { useTheme } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function RootLayout() {

  const { theme } = useTheme();
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "LOGIN PAGE" }} />
        <Stack.Screen name="signup" options={{ title: "REGISTER PAGE" }} />
      </Stack>
    </KeyboardAvoidingView>
  );
}
