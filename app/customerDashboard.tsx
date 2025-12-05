import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Customer } from "@/types/Customer";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCustomer } from "@/context";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useCustomer();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://uovtminiprj-backend.vercel.app/allCustomers"
      );
      const data = await response.json();
      setCustomers(data.customers ?? data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCustomers();
    setRefreshing(false);
  };

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

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#6366f1"
        style={{ marginTop: 80 }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customers</Text>
        <Text style={styles.headerSubtitle}>
          {customers.length} active records
        </Text>
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6366f1"
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => {
                dispatch({
                  type: "SETCUSTOMER",
                  payload: { ...item },
                });
                router.push({
                  pathname: "./customer/customerDetail",
                  params: { customer: JSON.stringify(item) },
                });
              }}
            >
              {/* Avatar + Header */}
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
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
              </View>

              {/* Details */}
              <View style={styles.row}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color="#6b7280"
                />
                <Text style={styles.text}>{item.address}</Text>
              </View>

              <View style={styles.row}>
                <MaterialIcons
                  name="directions"
                  size={16}
                  color="#6b7280"
                />
                <Text style={styles.text}>{item.travelMode}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No customers found 🚫
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  header: {
    padding: 20,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1e1b4b",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },

  statusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  text: {
    fontSize: 14,
    marginLeft: 8,
    color: "#374151",
  },

  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 60,
    fontSize: 15,
  },

  error: {
    color: "#ef4444",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
