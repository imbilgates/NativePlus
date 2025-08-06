import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { updateUser as updateUserService } from "@/services/userService";

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isVisible,
  onClose,
  onUpdate,
}) => {
  const { theme } = useTheme();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profileImage: user?.profileImage || "",
    dateOfBirth: (user as any)?.dateOfBirth || "",
  });

  // Reset form data when modal opens or user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profileImage: user.profileImage || "",
        dateOfBirth: (user as any)?.dateOfBirth || "",
      });
    }
  }, [user, isVisible]);

  const handleUpdate = async () => {
    if (!user?._id) return;

    // Validate required fields
    if (!formData.name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    setLoading(true);
    try {
      // Prepare update data with proper date formatting, excluding email
      const { email, ...updateData } = formData;
      const finalUpdateData = {
        ...updateData,
        dateOfBirth: updateData.dateOfBirth ? new Date(updateData.dateOfBirth).toISOString() : undefined
      };

      const updatedUser = await updateUserService(user._id, finalUpdateData);
      await updateUser(updatedUser);
      Alert.alert("Success", "Profile updated successfully!");
      onUpdate();
      onClose();
    } catch (error: any) {
      console.error("Update error:", error);
      const errorMessage = error?.response?.data?.error || "Failed to update profile";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const styles = createStyles(theme);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Edit Profile</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={theme.textSecondary}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        
        <Text style={styles.fieldLabel}>Email (cannot be changed)</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          placeholder="Email"
          placeholderTextColor={theme.textSecondary}
          value={formData.email}
          editable={false}
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Profile Image URL"
          placeholderTextColor={theme.textSecondary}
          value={formData.profileImage}
          onChangeText={(text) => setFormData({ ...formData, profileImage: text })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD) - Optional"
          placeholderTextColor={theme.textSecondary}
          value={formData.dateOfBirth}
          onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.background} size="small" />
            ) : (
              <Text style={styles.updateButtonText}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: theme.background,
      borderRadius: 20,
      padding: 20,
      width: "90%",
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.text,
      textAlign: "center",
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.surface,
    },
    disabledInput: {
      opacity: 0.7,
      backgroundColor: theme.border,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    button: {
      flex: 1,
      padding: 15,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: theme.error,
    },
    updateButton: {
      backgroundColor: theme.primary,
    },
    cancelButtonText: {
      color: theme.background,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
    },
    updateButtonText: {
      color: theme.background,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
    },
    fieldLabel: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 5,
      marginTop: 10,
    },
  });

export default EditProfileModal; 