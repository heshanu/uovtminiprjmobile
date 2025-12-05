import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '../context/AuthContext';
import { CustomerProvider } from '@/context';
import { SafeAreaView, ScrollView } from "react-native";
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
    <CustomerProvider>
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="login" options={{ title: 'Login' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      </SafeAreaView>
    </CustomerProvider>
    </AuthProvider>
  );
}
