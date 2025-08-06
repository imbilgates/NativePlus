import React from "react";
import { Pressable, Text, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

const SignOutButton = () => {
  const { theme } = useTheme();
  const { logout } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              router.replace("/(auth)");
            } catch (error) {
              console.error("Error signing out:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const styles = createStyles(theme);

  return (
    <Pressable style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </Pressable>
  );
};

export default SignOutButton;

const createStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.error,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      flex: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      color: theme.background,
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
  });
