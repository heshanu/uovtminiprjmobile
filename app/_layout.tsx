import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '../context/AuthContext';
import { CustomerProvider } from '@/context';
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Stack, Slot, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const composePaperTheme = (isDark: boolean) =>
  isDark
    ? { ...PaperDarkTheme }
    : { ...PaperDefaultTheme, colors: { ...PaperDefaultTheme.colors } };

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const paperTheme = composePaperTheme(isDark);

  return (
    <AuthProvider>
      <CustomerProvider>
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
            <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
              <Stack
                screenOptions={{
                  headerLeft: () => (
                    <TouchableOpacity
                      style={{ marginLeft: 15 }}
                      onPress={() => router.back()}
                    >
                      <Ionicons name="arrow-back" size={24} />
                    </TouchableOpacity>
                  ),
                }}
              >
                <Slot />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </SafeAreaProvider>
        </PaperProvider>
      </CustomerProvider>
    </AuthProvider>
  );
}
