import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import {useAuth } from "../../context/AuthContext";

export default function Home() {
   const { state, dispatch } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <Text style={styles.header}>Welcome</Text>

      {/* Featured */}
      <Text style={styles.section}>Featured</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        <View style={styles.card}>
          <Image source={require("../../assets/images/card1.jpg")} style={styles.image} />
          <Text style={styles.cardTitle}>Travel Planner</Text>
          <Text style={styles.cardDesc}>Plan trips easily</Text>
        </View>

        <View style={styles.card}>
          <Image source={require("../../assets/images/card2.jpg")} style={styles.image} />
          <Text style={styles.cardTitle}>Task Manager</Text>
          <Text style={styles.cardDesc}>Stay productive</Text>
        </View>

        <View style={styles.card}>
          <Image source={require("../../assets/images/card3.jpg")} style={styles.image} />
          <Text style={styles.cardTitle}>Fitness Tracker</Text>
          <Text style={styles.cardDesc}>Track progress</Text>
        </View>

      </ScrollView>

      {/* Quick Actions */}
      <Text style={styles.section}>Quick Actions</Text>

      <TouchableOpacity style={styles.simpleCard}>
        <Text style={styles.simpleText}>🌍 Explore Places</Text>
      </TouchableOpacity>

      {/* Login Button */}
      {!state.isLoggedIn? <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(auth)/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>:
       <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(auth)/guideRegister")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc",
    padding: 20,
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  section: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },

  card: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginRight: 15,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 120,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    paddingHorizontal: 10,
  },

  cardDesc: {
    fontSize: 13,
    color: "#777",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  simpleCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  simpleText: {
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
