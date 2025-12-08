import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BikeData } from "@/app/types/BikeData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import { router } from "expo-router";
import { List, Dialog, Portal,Button } from "react-native-paper";
const INITIAL_DATA:BikeData[] = [
  {
    id: "1",
    title: "Honda Navi",
    location: "Galle",
    rating: "4.8",
    image: require("../../../../../assets/images/travelModes/motorbike/navi.jpg"),
    path: "vfg",
    count: 1,
    priceperhour:100
  },
  {
    id: "2",
    title: "Pleasure",
    location: "Galle",
    rating: "4.6",
    image: require("../../../../../assets/images/travelModes/motorbike/pleasurebike.jpg"),
    count: 10,
    path: "fgf",
        priceperhour:100
  },
  {
    id: "3",
    title: "Plusar150",
    location: "Galle",
    rating: "4.9",
    image: require("../../../../../assets/images/travelModes/motorbike/pulsar150.jpg"),
    count: 5,
    path: "f",
    priceperhour:100
  },
];

export default function CardList() {
  const [data, setData] = useState(INITIAL_DATA);
  const [isVisible,setIsVisible]=useState(false);
  const [selectedVehicle,setSelectedVehicle]=useState<any>(null);

  const increment = (id: string) => {
    setData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrement = (id: string) => {
    setData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, count: item.count > 0 ? item.count - 1 : 0 } : item
      )
    );
  };

  const navigateTo=(path:any)=>{
    router.replace(path);
  }

  const openDialog = (vehicle: any) => {
   setSelectedVehicle(vehicle);
     setIsVisible(true);
  };

  const closeDialog = () => {
    setIsVisible(false);
   setSelectedVehicle(null);
  };

   const proceed = () => {
      if (selectedVehicle?.path) {
       // router.push(.path);
      }
      closeDialog();
    };

const bookNow=(item:BikeData)=>{
  openDialog;
  proceed;
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
              <Text style={styles.headerTitle}>Customers</Text>
              <Text style={styles.headerSubtitle}>
               <MaterialCommunityIcons name={"clipboard-list"}
              size={36}
              color="black"
              style={{ marginBottom: 10 }}/> {INITIAL_DATA.length} active records
              </Text>
            </View>
      <FlatList
  data={data}
  keyExtractor={(item) => item.id}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ paddingBottom: 30 }}
  renderItem={({ item }) => (
    <View style={styles.card}>
       <TouchableOpacity onPress={() => openDialog(item)}>
        <Image source={item.image} style={styles.image}/>
       </TouchableOpacity>
      {isVisible && (
  <Portal>
    <Dialog
      visible={isVisible}
      onDismiss={closeDialog}
      style={styles.dialog}
    >
      {/* Title */}
      <Dialog.Title style={styles.dialogTitle}>
        {item.title}
      </Dialog.Title>

      <Dialog.Content>
        {/* Info Row */}
        <View style={styles.infoRow}>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>
              LKR {item.priceperhour} / hour
            </Text>
          </View>

          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <MaterialCommunityIcons
            name="map-marker"
            size={18}
            color="#6366f1"
          />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        {/* Confirmation text */}
        <View style={styles.confirmBox}>
          <Text style={styles.confirmText}>
            Are you sure you want to proceed with
          </Text>
          <Text style={styles.confirmTitle}>{item.title}?</Text>
        </View>
      </Dialog.Content>

      {/* Actions */}
      <Dialog.Actions style={styles.actions}>
        <TouchableOpacity onPress={closeDialog} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={proceed} style={styles.okBtn}>
          <Text style={styles.okText}>Proceed</Text>
        </TouchableOpacity>
      </Dialog.Actions>
    </Dialog>
  </Portal>
)}


      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.locationRow}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={18}
            color="#6b7280"
          />
          <Text style={styles.location}>{item.location}</Text>
        </View>

        {/* Price */}
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>
            LKR {item.priceperhour} / hour
          </Text>
        </View>

        {/* Rating */}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>

        {/* Counter */}
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => decrement(item.id)}>
            <LinearGradient
              colors={["#FADA7A", "#F5F0CD"]}
              style={styles.counterButton}
            >
              <Text style={styles.counterText}>-</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>{item.count}</Text>
          </View>

          <TouchableOpacity onPress={() => increment(item.id)}>
            <LinearGradient
               colors={["#FADA7A", "#F5F0CD"]}
              style={styles.counterButton}
            >
              <Text style={styles.counterText}>+</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Book button */}
        <TouchableOpacity
          style={styles.bookButton}
           onPress={() => bookNow(item)}
        >
          <MaterialCommunityIcons name="book" size={20} color="#fff" />
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
/>   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    overflow: "hidden",
  },
  image: {
    padding:4,
    width: "100%",
    height: 200,
    resizeMode:"contain",
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
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
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 6,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "space-between",
  },
  counterButton: {
    padding: 14,
    borderRadius: 12,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    color:"black"
  },
  counterText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  countBadge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
  },
  countText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  priceText: {
  backgroundColor: "yellow",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,margin:5  // ensures borderRadius applies
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
locationRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  marginTop: 4,
},

priceBadge: {
  backgroundColor: "#fde68a",
  alignSelf: "flex-start",
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 999,
  marginTop: 8,
},

ratingBadge: {
  backgroundColor: "#2563eb",
  alignSelf: "flex-start",
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 999,
  marginTop: 6,
},

ratingText: {
  color: "#fff",
  fontSize: 12,
  fontWeight: "600",
},

bookButton: {
  marginTop: 16,
  backgroundColor: "#3674B5",
  borderRadius: 14,
  paddingVertical: 12,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
},

bookText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
},
dialog: {
  borderRadius: 18,
  backgroundColor: "#fff",
},

dialogTitle: {
  fontSize: 20,
  fontWeight: "800",
  color: "#1e1b4b",
},

infoRow: {
  flexDirection: "row",
  gap: 10,
  marginBottom: 12,
},
locationText: {
  fontSize: 14,
  color: "#4b5563",
},

confirmBox: {
  backgroundColor: "#f3f4f6",
  padding: 14,
  borderRadius: 14,
},

confirmText: {
  fontSize: 14,
  color: "#374151",
},

confirmTitle: {
  fontSize: 16,
  fontWeight: "800",
  color: "#1e1b4b",
  marginTop: 2,
},

actions: {
  paddingHorizontal: 16,
  paddingBottom: 12,
},

cancelBtn: {
  paddingVertical: 8,
  paddingHorizontal: 16,
},

cancelText: {
  fontSize: 14,
  color: "#ef4444",
  fontWeight: "700",
},

okBtn: {
  backgroundColor: "#578FCA",
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 10,
},

okText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "700",
},

});
