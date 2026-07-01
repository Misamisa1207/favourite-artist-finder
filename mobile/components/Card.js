import { Pressable, View, Text, Image, StyleSheet } from "react-native";

const ArtistCard = ({artist, onPress}) => {
  return(
    <Pressable style={StyleSheet.card} onPress={onPress}>
      <View>
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.fans}>{artist.nb_fan}</Text>
      </View>

      {artist.picture_medium && (
        <Image 
          source={{uri: artist.picture_medium}}
          style={styles.image}
        />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
});

export default ArtistCard;