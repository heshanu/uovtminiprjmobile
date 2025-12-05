import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Customer } from "@/types/Customer";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView } from "react-native";
import { useCustomer } from "@/context";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { state, dispatch } = useCustomer();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://uovtminiprj-backend.vercel.app/allCustomers"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch customers (${response.status})`);
      }

      const data = await response.json();
      setCustomers(data.customers ?? data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 60 }} />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "#22c55e";
      case "completed":
        return "#3b82f6";
      default:
        return "#ef4444";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
    <FlatList
      data={customers}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() =>{
            dispatch({
          type: "SETCUSTOMER",
          payload: { ...item },
        });
            router.push({
              pathname: "./customer/customerDetail",
              params: { customer: JSON.stringify(item) },
            })
          }
          }>
          {/* Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusColor(item.status) },
              ]}
            >
              <Text style={styles.statusText}>
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Body */}
          <View style={styles.row}>
            <Ionicons name="location-outline" size={16} color="#6b7280" />
            <Text style={styles.text}>{item.address}</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="directions" size={16} color="#6b7280" />
            <Text style={styles.text}>{item.travelMode}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f3f4f6",
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 2,
  },

  text: {
    fontSize: 14,
    marginLeft: 8,
    color: "#374151",
  },

  error: {
    color: "#ef4444",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
