import { useEffect, useState } from "react";
import {View, Text, FlatList, ActiveIndicator, Pressable, TouchableOpacity, Image, StyleSheet, ScrollView} from "react-native";
import {useLocalSearchParams, router} from "expo-router";
import ArtistCard from "../../components/Card";

const ArtistDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [artist, setArtist] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchArtist();
  }, [id]);

  const fetchArtist = async() => {
    try{
      const artistResponse = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/artists/${id}`
      );
      const artistData = await artistResponse.json();

      const relatedResponse = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/artists/${id}/related`
      );

      const relatedData = await relatedResponse.json();

      setArtist(artistData);
      setRelatedArtists(relatedData.data || []); // this is for FlatList
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  if (!artist) {
  return (
    <View style={styles.center}>
      <Text>Loading...</Text>
    </View>
  );
}

    if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6BB9F0" />
        <Text>Loading...</Text>
      </View>
    );
    }
  return(
    <View style={styles.container}>
      <Text style={styles.name}>{artist.name}</Text>
      <Image
        source={{uri: artist.picture_big}}
        style={styles.image}
      />
      <Text style={styles.fans}>
        fans: {artist.nb_fan}
      </Text>
      <Text style={styles.title}>
        Related Artists
      </Text>
      <FlatList 
        data={relatedArtists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <ArtistCard 
            artist={item}
            onPress={() => 
              router.push({
                pathname: "/artist/[id]",
                params: {id: item.id},
              })
            }
          />
        )}
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
  center: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F3A5F",
    textAlign: "center",
    marginBottom: 16,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 16,
    alignSelf: "center",
    marginBottom: 20,
  },
  fans: {
    fontSize: 16,
    color: "#5A6B7A",
    textAlign: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1F3A5F",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#EAF6FF",
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
  },
  artistName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F3A5F",
  },
});

export default ArtistDetailScreen;