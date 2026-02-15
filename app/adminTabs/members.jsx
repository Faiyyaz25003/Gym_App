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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>🏋️ Gym Admin Panel</Text>
        <Text style={styles.subHeading}>Manage members easily</Text>
      </View>

      {/* ➕ Add Member */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("settings/register")}
      >
        <View style={styles.row}>
          <Ionicons name="person-add" size={26} color="#1e90ff" />
          <View>
            <Text style={styles.title}>Add Member</Text>
            <Text style={styles.sub}>Register new gym member</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* 👥 View Members */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/member/ViewMembers")}
      >
        <View style={styles.row}>
          <Ionicons name="people" size={26} color="#2ed573" />
          <View>
            <Text style={styles.title}>View Members</Text>
            <Text style={styles.sub}>All registered members</Text>
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
  header: {
    marginTop: 20,
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
