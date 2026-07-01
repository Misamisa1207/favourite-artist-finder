import {useState} from "react";
import {View, Text, TextInput, Pressable, StyleSheet, Keyboard, TouchableOpacity} from "react-native";
import {router} from "expo-router";

const HomeScreen = () => {
  const [artistName, setArtistName] = useState("");

  const handleSearch = () => {
    if(!artistName.trim()){
      return;
    }
    Keyboard.dismiss();

    router.push({
      pathname: "/results",
      params: {artistName: artistName},
    });
  };

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Artist Finder</Text>
      <Text style={styles.subtitle}>
        Search your favourite artist and find similar artists.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter artist name"
        value={artistName}
        onChangeText={setArtistName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F3A5F",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#5A6B7A",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#B8DDF5",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#8ECAE6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#073B4C",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;