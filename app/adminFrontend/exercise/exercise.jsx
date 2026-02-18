import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Exercise() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Management</Text>

      {/* Create Exercise */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/adminFrontend/exercise/createExercise")}
      >
        <View style={styles.iconBox}>
          <Ionicons name="add" size={22} color="#000" />
        </View>

        <View>
          <Text style={styles.cardTitle}>Create Exercise</Text>
          <Text style={styles.cardText}>
            Add new exercise with video & description
          </Text>
        </View>
      </TouchableOpacity>

      {/* View Exercise */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/adminFrontend/exercise/viewExercise")}
      >
        <View style={styles.iconBox}>
          <Ionicons name="eye-outline" size={22} color="#000" />
        </View>

        <View>
          <Text style={styles.cardTitle}>View Exercise</Text>
          <Text style={styles.cardText}>
            View all created exercises & videos
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9", // light gray background
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#0f172a",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 3,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },

  cardText: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 3,
  },
});
