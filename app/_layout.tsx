import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '../context/AuthContext';
import { CustomerProvider } from '@/context';
import { SafeAreaView, ScrollView } from "react-native";
import { DarkTheme as NavigationDark, DefaultTheme as NavigationDefault, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { Slot } from "expo-router";
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
    const navTheme = isDark ? NavigationDark : NavigationDefault;
  const paperTheme = composePaperTheme(isDark);

  return (
    <AuthProvider>

    <CustomerProvider>
      <PaperProvider theme={paperTheme}>
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Slot/>
        <StatusBar style="auto" />
      </ThemeProvider>
      </SafeAreaView>
      </PaperProvider>
    </CustomerProvider>
    </AuthProvider>
  );
}
