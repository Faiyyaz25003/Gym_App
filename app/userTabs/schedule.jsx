import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScheduleScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Schedule</Text>

      {/* Create Schedule Card */}
      <TouchableOpacity
        style={[styles.card, styles.createCard]}
        onPress={() => router.push("/schedule/createSchedule")}
      >
        <Text style={styles.cardTitle}>➕ Create Schedule</Text>
        <Text style={styles.cardDesc}>Add new workout / diet schedule</Text>
      </TouchableOpacity>

      {/* View Schedule Card */}
      <TouchableOpacity
        style={[styles.card, styles.viewCard]}
        onPress={() => router.push("/schedule/viewSchedule")}
      >
        <Text style={styles.cardTitle}>📖 View Schedule</Text>
        <Text style={styles.cardDesc}>See your saved schedules</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
    paddingHorizontal: 20,
    paddingTop: 40, // 🔥 top spacing
    justifyContent: "flex-start", // 🔥 top align
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 30,
    color: "#111",
  },
  card: {
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 4,
  },
  createCard: {
    backgroundColor: "#ffffff",
  },
  viewCard: {
    backgroundColor: "#ffffff",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  cardDesc: {
    fontSize: 14,
    marginTop: 6,
    color: "#666",
  },
});
