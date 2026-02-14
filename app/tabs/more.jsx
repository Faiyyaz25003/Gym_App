import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const options = [
  { title: "Diet", icon: "nutrition", route: "/diet/diet" },
  { title: "Exercise", icon: "fitness", route: "/exercise/exercise" },
  { title: "Profile", icon: "person", route: "/profile/profile" },
  { title: "Settings", icon: "settings", route: "/settings/settings" },
];

export default function More() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>More Options</Text>

      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => router.push(item.route)}
        >
          <Ionicons name={item.icon} size={22} color="#ff4757" />
          <Text style={styles.text}>{item.title}</Text>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      ))}
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
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
  },
  text: {
    flex: 1,
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "600",
  },
});
