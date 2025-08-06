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

      {/* 
        The StatusBar style is set to "light" for dark backgrounds so the text/icons are visible.
        "forest" is included because its background is also dark, so we want light content.
        If you want to generalize, you could check the background color or add a property to the theme.
      */}
      <StatusBar style={theme.name === "dark" || theme.name === "forest" || theme.name === "coffee" ? "light" : "dark"} />
      {children}
    </View>
  );
};

export default SafeAreaWrapper;
