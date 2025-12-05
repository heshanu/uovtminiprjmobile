import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,TouchableOpacity,Alert
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useRef,useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Customer } from "@/types/Customer";
import {CustomerProvider,useCustomer} from "../../context/CustomerContext";

export default function CustomerDashboard() {

  type TaskItem = {
    title: string;
    path?: string;
   color: string;
  };
  
  const [tasks, setTasks] = useState([
      { id: '1', title: 'PlanNow',color:'red',path:'areasofchoices/areas' },
      { id: '2', title: 'Update',color:'blue' },
      { id: '3', title: 'Mark as delete',color:'green' },
      { id: '4', title: 'Mark as complete',color:'orange' },
    ]);
  
  
  const params = useLocalSearchParams();
  const customer: Customer = JSON.parse(params.customer as string);

  const scale = useRef(new Animated.Value(1)).current;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString();

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const statusColor =
    customer.status === "ongoing"
      ? "#22c55e"
      : customer.status === "completed"
      ? "#3b82f6"
      : "#ef4444";

       const handlePress = (path: any) => {
        router.replace(path);
    //Alert.alert("Button Pressed", `You pressed: ${action}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <Animated.View style={[styles.headerCard, { transform: [{ scale }] }]}>
        <Text style={styles.name}>{customer.name}</Text>
        <Text style={styles.phone}>{customer.phonenum}</Text>

        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{customer.status.toUpperCase()}</Text>
        </View>
      </Animated.View>

      {/* TRIP DETAILS */}
      <Section title="Trip Details" icon="map">
        <InfoRow icon="directions-bike" label="Travel Mode" value={customer.travelMode} />
        <InfoRow icon="event" label="Start Date" value={formatDate(customer.startDate)} />
        <InfoRow icon="event-available" label="End Date" value={formatDate(customer.endDate)} />
      </Section>

      {/* ACCOMMODATION */}
      <Section title="Accommodation" icon="hotel">
        <InfoRow icon="location-on" label="Address" value={customer.address} />
        <InfoRow icon="hotel" label="Hotel" value={customer.accomadation} />
      </Section>

      {/* FOOD */}
      <Section title="Preferences" icon="restaurant">
        <InfoRow icon="restaurant" label="Food" value={customer.foodList} />
        <InfoRow icon="local-cafe" label="Beverages" value={customer.beverageList} />
      </Section>

      {/* EXPENSE */}
      <Section title="Expenses" icon="payments">
        <Text style={styles.expense}>LKR {customer.totalExpense}.00</Text>
      </Section>

     <View style={styles.buttonContainer}>
      {
        tasks.map((task) => (
        <TouchableOpacity
        key={task.id}
        style={{...styles.button,backgroundColor:task.color}}
        onPress={() => handlePress(task.path)}
        
      >
        <Ionicons name="create-outline" size={24} 
         />
        <Text style={styles.buttonText}>{task.title}</Text>
      </TouchableOpacity>
        ))
      } 
    </View>

    </ScrollView>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name={icon} size={20} color="#4CAF50" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <Pressable style={styles.infoRow}>
      <MaterialIcons name={icon} size={20} color="#6b7280" />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },

  headerCard: {
    backgroundColor: "#4CAF50",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },

  phone: {
    fontSize: 16,
    color: "#eaffea",
    marginBottom: 10,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 8,
  },

  label: {
    fontSize: 12,
    color: "#6b7280",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  expense: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ef4444",
    marginTop: 8,
  },
    buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    flexWrap: "wrap", // allows wrapping on small screens
  },
  button: {
    backgroundColor: "#4CAF50",
    width: "48%", // two buttons per row
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    paddingBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 8,
  },
});
