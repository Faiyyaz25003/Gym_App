import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function UserProfile() {
  const { name, phone, age, plan, fees } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle" size={110} color="#ff4757" />

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.phone}>{phone}</Text>

      <View style={styles.card}>
        <Detail icon="calendar" label="Age" value={age} />
        <Detail icon="fitness" label="Plan" value={plan} />
        <Detail icon="cash" label="Fees" value={`₹${fees}`} />
      </View>
    </View>
  );
}

function Detail({ icon, label, value }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={20} color="#555" />
      <Text style={styles.text}>
        {label}: <Text style={styles.bold}>{value}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  phone: { color: "#6b7280", marginBottom: 20 },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  text: { marginLeft: 10, fontSize: 16 },
  bold: { fontWeight: "bold" },
});
