import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

// Custom Components
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

/**
 * NotFoundScreen Component:
 * Displays a message for when a user navigates to a non-existent route.
 */
export default function NotFoundScreen() {
  return (
    <>
      {/* Configure the screen title */}
      <Stack.Screen options={{ title: 'Oops!' }} />

      {/* Main Content */}
      <ThemedView style={styles.container}>
        {/* Display error message */}
        <ThemedText type="title">This screen doesn't exist.</ThemedText>

        {/* Link to navigate back to the home screen */}
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

// Styles for the NotFoundScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
