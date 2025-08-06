import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    profileImage: user?.profileImage || "",
    dateOfBirth: (user as any)?.dateOfBirth ? new Date((user as any).dateOfBirth) : null,
  });

  // Reset form data when modal opens or user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        profileImage: user.profileImage || "",
        dateOfBirth: (user as any)?.dateOfBirth ? new Date((user as any).dateOfBirth) : null,
      });
    }
  }, [user, isVisible]);

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to access your photo library');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setFormData({ ...formData, profileImage: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setFormData({ ...formData, dateOfBirth: selectedDate });
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Select Date of Birth";
    return date.toLocaleDateString();
  };

  const handleUpdate = async () => {
    if (!user?._id) return;

    // Validate required fields
    if (!formData.name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    setLoading(true);
    try {
      // Prepare update data with proper date formatting
      const finalUpdateData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString() : undefined
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
      style={styles.bottomModal}
      backdropOpacity={0.4}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.bottomModalContent}>
          <View style={styles.dragIndicator} />
          <Text style={styles.modalTitle}>Edit Profile</Text>
          
          {/* Profile Image Section */}
          <View style={styles.imageSection}>
            <Pressable onPress={pickImage} style={styles.imageContainer}>
              {formData.profileImage ? (
                <Image source={{ uri: formData.profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>📷</Text>
                  <Text style={styles.placeholderSubText}>Tap to add photo</Text>
                </View>
              )}
              <View style={styles.imageOverlay}>
                <Text style={styles.imageOverlayText}>📷</Text>
              </View>
            </Pressable>
          </View>
          
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={theme.textSecondary}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>
          
          {/* Date of Birth Section */}
          <View style={styles.inputContainer}>
            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(!showDatePicker)}
            >
              <Text style={[styles.dateInputText, { color: formData.dateOfBirth ? theme.text : theme.textSecondary }]}>
                {formatDate(formData.dateOfBirth)}
              </Text>
              <Text style={styles.dateIcon}>📅</Text>
            </TouchableOpacity>
            
            {/* Inline Date Picker */}
            {showDatePicker && (
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={formData.dateOfBirth || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  style={styles.inlineDatePicker}
                />
                <TouchableOpacity
                  style={styles.datePickerDoneButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.datePickerDoneText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Action Buttons */}
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
      </KeyboardAvoidingView>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    keyboardAvoidingView: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    bottomModalContent: {
      backgroundColor: theme.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.18,
      shadowRadius: 12,
      elevation: 8,
    },
    dragIndicator: {
      width: 48,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#ccc',
      alignSelf: 'center',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.text,
      textAlign: "center",
      marginBottom: 24,
    },
    imageSection: {
      alignItems: "center",
      marginBottom: 24,
    },
    imageContainer: {
      position: "relative",
      borderRadius: 60,
      overflow: "hidden",
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: theme.primary,
    },
    placeholderImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      fontSize: 32,
      marginBottom: 4,
    },
    placeholderSubText: {
      color: theme.textSecondary,
      fontSize: 12,
      textAlign: "center",
    },
    imageOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center",
      opacity: 0,
    },
    imageOverlayText: {
      fontSize: 24,
      color: "white",
    },
    inputContainer: {
      marginBottom: 20,
    },
    fieldLabel: {
      fontSize: 16,
      color: theme.text,
      marginBottom: 8,
      fontWeight: "600",
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.surface,
    },
    dateInput: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 16,
      backgroundColor: theme.surface,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dateInputText: {
      fontSize: 16,
      flex: 1,
    },
    dateIcon: {
      fontSize: 20,
    },
    datePickerContainer: {
      marginTop: 12,
      backgroundColor: theme.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 16,
    },
    inlineDatePicker: {
      height: 200,
    },
    datePickerDoneButton: {
      backgroundColor: theme.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 12,
    },
    datePickerDoneText: {
      color: theme.background,
      fontSize: 16,
      fontWeight: "600",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
      gap: 12,
    },
    button: {
      flex: 1,
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelButton: {
      backgroundColor: theme.error,
    },
    updateButton: {
      backgroundColor: theme.primary,
    },
    cancelButtonText: {
      color: theme.background,
      fontSize: 16,
      fontWeight: "600",
    },
    updateButtonText: {
      color: theme.background,
      fontSize: 16,
      fontWeight: "600",
    },
  });

export default EditProfileModal; 