import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const schedules = [
  {
    id: "1",
    title: "Morning Workout",
    time: "6:00 AM",
    days: ["Mon", "Wed", "Fri"],
    note: "Chest & cardio",
  },
  {
    id: "2",
    title: "Evening Yoga",
    time: "7:30 PM",
    days: ["Tue", "Thu", "Sat"],
    note: "Stretching & breathing",
  },
];

export default function ViewSchedule() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View Schedules</Text>
      </View>

      {/* List */}
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.time}>⏰ {item.time}</Text>

            {/* Days */}
            <View style={styles.daysContainer}>
              {item.days.map((day) => (
                <View key={day} style={styles.dayChip}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>
              ))}
            </View>

            {item.note ? <Text style={styles.note}>📝 {item.note}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 13,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  time: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  dayChip: {
    backgroundColor: "#2f9e8f",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  dayText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  note: {
    fontSize: 13,
    color: "#666",
  },
});
