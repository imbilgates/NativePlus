import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import { ThemeProvider } from "@/context/ThemeContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaWrapper>
        <Slot />
      </SafeAreaWrapper>
    </ThemeProvider>
  );
}
