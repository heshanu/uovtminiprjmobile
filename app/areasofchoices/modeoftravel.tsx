import React, { useState } from "react";
import { List } from "react-native-paper";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";

export default function ModeofTravel( customer: any) {

  const [tasks] = useState([
    { id: "1", title: "Motorbike", icon: "motorbike", color: "#38bdf8",path:'./methods/mootorbike' },
    { id: "2", title: "Bicycle", icon: "bike", color: "#f97316" },
    { id: "3", title: "Car", icon: "car", color: "#22c55e" },
    { id: "4", title: "Van", icon: "van", color: "#a855f7" },
    { id: "5", title: "Tuktuk", icon: "rickshaw", color: "#ef4444" },
    { id: "6", title: "Train", icon: "train", color: "#14b8a6" },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <List.Section>
        <List.Accordion
          title=""
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
              onPress={() => console.log(task.title)}
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
