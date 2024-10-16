// /app/index.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const StarterPage: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Button title="Register" onPress={() => router.push('/register')} />
      <Button title="Log In" onPress={() => router.push('/login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa', 
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#00796b',
    fontWeight: 'bold',
  },
});

export default StarterPage;
