import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Trainer() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🏋️ Gym Admin Panel</Text>
      <Text style={styles.subHeading}>Manage trainers easily</Text>

      {/* Add Trainer */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/trainer/AddTrainner")}
      >
        <Ionicons name="person-add" size={26} color="#2563eb" />
        <View style={styles.textBox}>
          <Text style={styles.cardTitle}>Add Trainers</Text>
          <Text style={styles.cardSub}>Register new gym trainer</Text>
        </View>
      </TouchableOpacity>

      {/* View Trainer */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/trainer/ViewTrainner")}
      >
        <Ionicons name="people" size={26} color="#16a34a" />
        <View style={styles.textBox}>
          <Text style={styles.cardTitle}>View Trainers</Text>
          <Text style={styles.cardSub}>All registered trainers</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subHeading: {
    color: "#6b7280",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 3,
  },
  textBox: {
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSub: {
    color: "#6b7280",
    fontSize: 13,
  },
});
