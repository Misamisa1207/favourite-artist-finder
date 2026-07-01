import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Artist Finder" }} />
      <Stack.Screen name="results" options={{ title: "Search Results" }} />
      <Stack.Screen name="artist/[id]" options={{ title: "Artist Detail" }} />
    </Stack>
  );
}