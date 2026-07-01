import { useEffect, useState } from "react";
import {View, Text, FlatList, Pressable, TouchableOpacity, Image, StyleSheet, ScrollView} from "react-native";
import {useLocalSearchParams, router} from "expo-router";

const ResultsScreen = () => {
  const { artistName } = useLocalSearchParams();

  const [artists, setArtists] = useState([]);
  
  useEffect(() => {
    fetchArtists();
  }, [])

  const fetchArtists = async() => {
    try{
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/artists/search?artistName=${artistName}`
      );

      const data = await response.json();
      setArtists(data.data || []);
    }catch(error){
      console.log("Failed to fetch artists:", error);
    }
  };

  const goToDetail = (artistId) => {
    router.push({
      pathname: "/artist/[id]",
      params: { id: artistId },
    });
  };

  return(
    <View style={styles.container}>
      <Text style={styles.searchText}>Result for: {artistName}</Text>

      <FlatList 
        data={artists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <Pressable style={styles.card} onPress={() => goToDetail(item.id)}>
            <View>
              <Text style={styles.artistName}>{item.name}</Text>
              <Text style={styles.fans}>{item.nb_fan}</Text>
            </View>

            {item.picture_medium && (
              <Image
                source={{uri: item.picture_medium}}
              />
            )}
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No artist found</Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F3A5F",
    marginBottom: 8,
  },
  searchText: {
    fontSize: 15,
    color: "#5A6B7A",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#EAF6FF",
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  artistName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F3A5F",
  },
  fans: {
    marginTop: 4,
    color: "#5A6B7A",
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#5A6B7A",
    marginTop: 30,
  },
});

export default ResultsScreen;