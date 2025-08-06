import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import SignOutButton from "./SignOutButton";
import { useAuth } from "@/context/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";
import EditProfileModal from "./EditProfileModal";

const UserProfile = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const styles = createStyles(theme);

  // Format date of birth for display
  const formatDateOfBirth = (dateString?: string) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return "Invalid date";
    }
  };

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
      <Text style={styles.dob}>Date of Birth: {formatDateOfBirth(user.dateOfBirth)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditModalVisible(true)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <SignOutButton />
      </View>

      <EditProfileModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdate={() => {
          // Refresh user data if needed
          setIsEditModalVisible(false);
        }}
      />
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
    dob: {
      fontSize: 14,
      color: theme.text,
      marginTop: 8,
      opacity: 0.6,
    },
    editButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
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
    editButtonText: {
      color: theme.background,
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      marginTop: 20,
      marginBottom: 20,
      width: "100%",
      paddingHorizontal: 20,
    },
  });
