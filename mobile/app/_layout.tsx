import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <SafeAreaWrapper>
          <Slot />
        </SafeAreaWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}
