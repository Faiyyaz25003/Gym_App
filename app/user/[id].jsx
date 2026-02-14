import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function EnquiryDetails() {
  const { name, message, date } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Ionicons name="chatbubble-ellipses" size={90} color="#ff4757" />

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.date}>{date}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Message</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  date: {
    color: "#9ca3af",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
    color: "#374151",
  },
});
