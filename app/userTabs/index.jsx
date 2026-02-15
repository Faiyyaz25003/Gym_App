
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🔽 Added spacing from top */}
      <View style={styles.header}>
        <Text style={styles.heading}>🏋️ Gym Admin Panel</Text>
        <Text style={styles.subHeading}>Manage everything easily</Text>
      </View>

      {/* Dashboard */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/home/dashboard")}
      >
        <View style={styles.row}>
          <Ionicons name="speedometer" size={26} color="#ff4757" />
          <View>
            <Text style={styles.title}>Dashboard Overview</Text>
            <Text style={styles.sub}>Todays Stats & Summary</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Achievements */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/home/achievements")}
      >
        <View style={styles.row}>
          <Ionicons name="trophy" size={26} color="#ff9f43" />
          <View>
            <Text style={styles.title}>Achievements</Text>
            <Text style={styles.sub}>Awards & Member Highlights</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Exercise */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/home/exercise")}
      >
        <View style={styles.row}>
          <Ionicons name="barbell" size={26} color="#1e90ff" />
          <View>
            <Text style={styles.title}>Exercise Reference</Text>
            <Text style={styles.sub}>Workout Guides & Plans</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Schedule */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/home/schedule")}
      >
        <View style={styles.row}>
          <Ionicons name="calendar" size={26} color="#2ed573" />
          <View>
            <Text style={styles.title}>Weekly Schedule</Text>
            <Text style={styles.sub}>Recent Members & Timings</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },

  /* ✅ New header wrapper */
  header: {
    marginTop: 20, // 👈 yahi se niche gaya
    marginBottom: 25,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
  },
  subHeading: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
  },
  sub: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },
});
