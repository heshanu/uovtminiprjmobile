import React, { useState } from "react";
import { List } from "react-native-paper";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import ModeofTravel from "./modeoftravel";

export default function ModeofTravelConfirm(  path: any ) {

 const navigateTo = () => {
    // Navigation logic would go here
    console.log("Navigating to:", path);
    router.replace(path);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={navigateTo}>
      <List.Section>
        <List.Accordion
          title=""
          titleStyle={styles.accordionTitle}
          style={styles.accordion}
          left={(props) => (
            <List.Icon {...props} icon="map" color="#4f46e5" />
          )}
        >
        
        < ModeofTravel customer={path} />
        </List.Accordion>
      </List.Section>
      </TouchableOpacity>
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
