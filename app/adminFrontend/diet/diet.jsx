import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Diet() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diet Management</Text>

      {/* Create Diet */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/adminFrontend/diet/createDiet")}
      >
        <Text style={styles.cardTitle}>➕ Create Diet</Text>
        <Text style={styles.cardDesc}>
          Create diet plan with video & description
        </Text>
      </TouchableOpacity>

      {/* View Diet */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/adminFrontend/diet/viewDiet")}
      >
        <Text style={styles.cardTitle}>📋 View Diet</Text>
        <Text style={styles.cardDesc}>View all created diet plans</Text>
      </TouchableOpacity>

      {/* Create Diet Reference */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/adminFrontend/diet/createDietReference")}
      >
        <Text style={styles.cardTitle}>🎥 Create Diet Reference</Text>
        <Text style={styles.cardDesc}>
          Add YouTube video & reference material
        </Text>
      </TouchableOpacity>

      {/* View Diet Reference */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/adminFrontend/diet/viewDietReference")}
      >
        <Text style={styles.cardTitle}>📚 View Diet Reference</Text>
        <Text style={styles.cardDesc}>
          View all diet reference videos & guides
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 70, // 👈 yaha se niche hoga
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardDesc: {
    marginTop: 5,
    color: "#666",
  },
});
