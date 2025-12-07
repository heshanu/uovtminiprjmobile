import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    id: "1",
    title: "Ella Rock Tour",
    location: "Ella, Sri Lanka",
    rating: "4.8",
    image: require("../../../../../assets/images/travelModes/motorbike/navi.jpg"),
    path:"areasofchoices/modeoftravel/province/southern/"
  },
  {
    id: "2",
    title: "Kandy City Walk",
    location: "Kandy, Sri Lanka",
    rating: "4.6",
    image: require("../../../../../assets/images/travelModes/motorbike/pleasurebike.jpg"),
  },
  {
    id: "3",
    title: "Sigiriya Sunrise",
    location: "Sigiriya, Sri Lanka",
    rating: "4.9",
        image: require("../../../../../assets/images/travelModes/motorbike/pulsar150.jpg"),
  },
];

export default function CardList() {
  return (

    <View style={styles.container}>
      <SafeAreaView>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => router.push("./details")}
          >
            <Image source={item.image} style={styles.image} />

            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.location}>{item.location}</Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>⭐ {item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9ff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
    color: "#111827",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 180,
  },

  cardContent: {
    padding: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  location: {
    fontSize: 14,
    color: "#6b7280",
    marginVertical: 4,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#2563eb",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 6,
  },

  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});
