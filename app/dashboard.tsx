import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Dashboard() {
  const { state, dispatch } = useAuth();

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Customer Dashboard",
      path: "customerDashboard",
      icon: "account-group",
      color: "#6366f1",
    },
    {
      id: "2",
      title: "Customer Registration",
      icon: "account-plus",
      color: "#22c55e",
    },
    {
      id: "3",
      title: "View Analytics",
      icon: "chart-bar",
      color: "#f97316",
    },
  ]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    router.replace("/(auth)/login");
  };

  const navigateTo = (path?: any) => {
    if (path) router.push(path);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome 👋</Text>
          <Text style={styles.username}>
            {state.user?.username?.toUpperCase() || "USER"}
          </Text>
        </View>

        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <MaterialCommunityIcons name="logout" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigateTo(item.path)}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={36}
              color="#fff"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
    padding: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  welcome: {
    fontSize: 16,
    color: "#475569",
  },

  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e1b4b",
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 12,
  },

  card: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 16,
    elevation: 6,
  },

  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
