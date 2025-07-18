import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar"; 

interface SafeAreaWrapperProps {
  children: React.ReactNode;
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: theme.background,
      }}
    >
      <StatusBar style={theme.name === "dark" || theme.name === "forest" ? "light" : "dark"} />
      {children}
    </View>
  );
};

export default SafeAreaWrapper;
