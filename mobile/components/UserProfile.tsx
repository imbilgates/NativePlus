import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import SignOutButton from "./SignOutButton";
import { useAuth } from "@/context/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";

const UserProfile = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const styles = createStyles(theme);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ color: theme.text, fontSize: 18 }}>
          User not logged in
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <SignOutButton />
      <ThemeSwitcher />

    </View>
  );
};

export default UserProfile;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      paddingVertical: 40,
      backgroundColor: theme.background,
      flex: 1,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: theme.primary,
    },
    name: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
    },
    email: {
      fontSize: 16,
      color: theme.text,
      marginTop: 6,
      opacity: 0.7,
    },
  });
