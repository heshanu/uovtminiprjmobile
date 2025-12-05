import React, { useState } from "react";
import { List } from "react-native-paper";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import { router } from "expo-router";

export default function MotorBike({ customer }: { customer: any }) {
  const [tasks] = useState([
    { id: "1", title: "Mode of Travel", icon: "car", color: "#38bdf8",path:"../../assets/images/travelModes/navi.jpg" },
    { id: "2", title: "Hotel Accommodation", icon: "home", color: "#f97316",path:"../../assets/images/travelModes/pleasurebike.jpg" },
    { id: "3", title: "Food Cuisine", icon: "food", color: "#22c55e",path:"../../assets/images/travelModes/pulsar.jpg" },
    { id: "4", title: "Beverages", icon: "cup", color: "#a855f7" },
    { id: "5", title: "Host Areas in Sri Lanka", icon: "map-marker", color: "#ef4444" },
    { id: "6", title: "Customer Locations", icon: "map", color: "#14b8a6" },
    { id: "7", title: "Total Trip Calculation", icon: "calculator", color: "#6366f1" },
  ]);

  const directToPath = (path: any) => {
    console.log("Navigating to:", path);
    // Navigation logic would go here
    router.replace(path);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <List.Section>
        <List.Accordion
          title="Choose Your Travel Preferences"
          titleStyle={styles.accordionTitle}
          style={styles.accordion}
          left={(props) => (
            <List.Icon {...props} icon="map" color="#4f46e5" />
          )}
        >
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              activeOpacity={0.7}
              onPress={() => directToPath(task.path)}
            >
              <View style={[styles.itemCard, { borderLeftColor: task.color }]}>
                <List.Item
                  title={task.title}
                  titleStyle={styles.itemTitle}
                  left={(props) => (
                    <List.Icon {...props} icon={task.icon} color={task.color} />
                  )}
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" color="#9ca3af" />
                  )}
                />
                
              </View>
            </TouchableOpacity>
          ))}
        </List.Accordion>
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  accordion: {
    backgroundColor: "#eef2ff",
    borderRadius: 16,
    paddingVertical: 4,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#312e81",
  },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginVertical: 6,
    marginHorizontal: 10,
    borderLeftWidth: 5,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
});
