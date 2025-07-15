// Required imports
import 'react-native-reanimated';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GlobalProvider } from '../components/contexts/globalContext';

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

/**
 * The RootLayout component sets up the application's theme and navigation structure.
 */
export default function RootLayout() {
  // Determine the current color scheme (light or dark)
  const colorScheme = useColorScheme();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide the splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Return null until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            {/* Tab-based navigation */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Login screen */}
            <Stack.Screen name="login" options={{ headerShown: false }} />

            {/* Additional screens */}
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </GlobalProvider>
    </GestureHandlerRootView>
  );
}
