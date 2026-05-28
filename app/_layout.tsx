import { Stack } from 'expo-router';
import '../src/core/config/polyfill';
import '../global.css'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
    </Stack>
  );
}