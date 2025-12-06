import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView } from "react-native";

export default function Home() {
  const { state } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView>
      {/* Top Header */}
      <View style={styles.headerWrap}>
        <Text style={styles.welcome}>Hello 👋</Text>
        <Text style={styles.title}>GuideBuddy</Text>
        <Text style={styles.subtitle}>Plan • Explore • Enjoy</Text>
      </View>

      {/* Featured */}
      <Text style={styles.sectionTitle}>Featured</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={260}
        decelerationRate="fast"
      >
        {[
          {
            title: "Travel Planner",
            desc: "Smart trip planning",
            img: require("../../assets/images/card1.jpg"),
          },
          {
            title: "Task Manager",
            desc: "Organize your day",
            img: require("../../assets/images/card2.jpg"),
          },
          {
            title: "Fitness Tracker",
            desc: "Track your goals",
            img: require("../../assets/images/card3.jpg"),
          },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCard}
            activeOpacity={0.85}
          >
            <Image source={item.img} style={styles.featureImage} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDesc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <TouchableOpacity style={styles.actionCard} activeOpacity={0.75}>
        <Text style={styles.actionEmoji}>🌍</Text>
        <Text style={styles.actionText}>Explore Places</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard} activeOpacity={0.75}>
        <Text style={styles.actionEmoji}>🧭</Text>
        <Text style={styles.actionText}>Plan a Trip</Text>
      </TouchableOpacity>

      {/* Auth CTA */}
      {!state.isLoggedIn ? (
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace("/(auth)/login")}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/(auth)/guideRegister")}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryText}>Become a Guide</Text>
        </TouchableOpacity>
      )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9ff",
    padding: 20,
  },

  headerWrap: {
    marginBottom: 30,
  },

  welcome: {
    fontSize: 16,
    color: "#6b7280",
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginVertical: 15,
  },

  /* Featured Cards */
  featureCard: {
    width: 250,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },

  featureImage: {
    width: "100%",
    height: 150,
  },

  featureText: {
    padding: 14,
  },

  featureTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  featureDesc: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 3,
  },

  /* Action Cards */
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },

  actionEmoji: {
    fontSize: 22,
    marginRight: 14,
  },

  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },

  /* Buttons */
  primaryButton: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 16,
    marginTop: 25,
    marginBottom: 40,
  },

  secondaryButton: {
    backgroundColor: "#16a34a",
    padding: 18,
    borderRadius: 16,
    marginTop: 25,
    marginBottom: 40,
  },

  primaryText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
