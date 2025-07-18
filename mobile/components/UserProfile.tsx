import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import SignOutButton from './SignOutButton';

const UserProfile = () => {
  const { theme } = useTheme();

  const user = {
    name: 'Bilgates Dev',
    email: 'bilgates@example.com',
    image: 'https://i.pravatar.cc/300',
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <SignOutButton />
    </View>
  );
};

export default UserProfile;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
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
      fontWeight: 'bold',
      color: theme.text,
    },
    email: {
      fontSize: 16,
      color: theme.text,
      marginTop: 6,
      opacity: 0.7,
    },
  });
