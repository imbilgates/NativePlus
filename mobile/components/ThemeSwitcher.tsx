import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "../context/ThemeContext";
import { themes } from "../constants/theme";
import { ThemeType, ThemeName } from "../types/theme";

const ThemePicker = () => {
  const { setCustomTheme, theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(theme.name);

  const handleSelect = (name: ThemeName) => {
    setSelected(name);
    setCustomTheme(name);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>Selected Theme: {selected}</Text>
      <TouchableOpacity
        style={[styles.openButton, { backgroundColor: theme.primary }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.openButtonText, { color: theme.text }]}>Change Theme</Text>
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.bottomModal}
        backdropOpacity={0.4}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <View style={[styles.bottomModalContent, { backgroundColor: theme.background }]}>  
          <View style={styles.dragIndicator} />
          <Text style={[styles.modalTitle, { color: theme.text }]}>Choose a Theme</Text>
          <View style={styles.themeList}>
            {themes.map((t) =>
              t?.name ? (
                <Pressable
                  key={t.name}
                  style={({ pressed }) => [
                    styles.themeCard,
                    {
                      backgroundColor: t.background,
                      borderColor: selected === t.name ? theme.primary : 'transparent',
                      transform: [{ scale: selected === t.name ? 1.08 : 1 }],
                      shadowOpacity: selected === t.name ? 0.35 : 0.15,
                    },
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => handleSelect(t.name)}
                >
                  <Text style={styles.themeIcon}>{getThemeIcon(t.name)}</Text>
                  <Text style={[styles.themeName, { color: t.text }]}>{capitalize(t.name)}</Text>
                  {selected === t.name && <Text style={styles.check}>✅</Text>}
                </Pressable>
              ) : null
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ThemePicker;

const getThemeIcon = (name: ThemeType["name"]) => {
  switch (name) {
    case "light":
      return "🌞";
    case "dark":
      return "🌙";
    case "coffee":
      return "☕";
    case "forest":
      return "🌲";
    default:
      return "🎨";
  }
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  openButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  openButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    minWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
    letterSpacing: 1,
  },
  themeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  themeCard: {
    width: 90,
    height: 110,
    borderRadius: 18,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#fff',
  },
  themeIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  check: {
    fontSize: 18,
    marginTop: 2,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomModalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
    minWidth: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    minHeight: 320,
  },
  dragIndicator: {
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 12,
  },
});
