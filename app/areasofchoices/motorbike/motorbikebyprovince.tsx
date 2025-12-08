import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { List, Dialog, Button, Portal } from "react-native-paper";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Areas() {
  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const tasks = [
    { id: "1", title: "Galle", icon: "motorbike", color: "#3674B5", path: "/areasofchoices/motorbike/province/southern/gallebike" },
    { id: "2", title: "Hikkaduwa", icon: "motorbike", color: "#3674B5", path: "areasofchoices/motorbike/province/southern/hikkaduwabike"},
    { id: "1", title: "Galle", icon: "motorbike", color: "#3674B5", path: "/areasofchoices/motorbike/province/southern/gallebike" },
    { id: "3", title: "Matara", icon: "motorbike", color: "#3674B5", path: "/areasofchoices/matara" },
    { id: "4", title: "Nuwara Eliya", icon: "motorbike", color: "#3674B5", path: "/areasofchoices/nuwara" },
    { id: "5", title: "Jaffna", icon: "motorbike", color: "#3674B5", path: "/areasofchoices/jaffna" },
    { id: "6", title: "Gampaha", icon: "motorbike", color: "#3674B5", path: "/areasofchoices/gampaha" },
  ];

  const openDialog = (task: any) => {
    setSelectedTask(task);
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
    setSelectedTask(null);
  };

  const proceed = () => {
    if (selectedTask?.path) {
      router.push(selectedTask.path);
    }
    closeDialog();
  };

  return (
     <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <List.Section>
        <List.Accordion
          title="Choose Your Destination"
          titleStyle={styles.accordionTitle}
          style={styles.accordion}
          left={(props) => (
            <List.Icon {...props} icon="map" color="#4f46e5" />
          )}
        >
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              activeOpacity={0.8}
              onPress={() => openDialog(task)}
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

      <Portal>
        <Dialog visible={visible} onDismiss={closeDialog}>
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to proceed to{" "}
              <Text style={{ fontWeight: "bold" }}>
                {selectedTask?.title}
              </Text>
              ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            <Button onPress={proceed}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  </SafeAreaView>
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
