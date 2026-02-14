import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Messages() {
  const router = useRouter();

  const enquiries = [
    {
      id: 1,
      name: "Rahul Sharma",
      message: "I want to know about personal training plans.",
      date: "14 Feb 2026",
    },
    {
      id: 2,
      name: "Aman Verma",
      message: "Is there any discount on yearly membership?",
      date: "13 Feb 2026",
    },
    {
      id: 3,
      name: "Sneha Patel",
      message: "What are gym timings on Sunday?",
      date: "12 Feb 2026",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Enquiries</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {enquiries.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/messages/[id]",
                params: item,
              })
            }
          >
            <View style={styles.topRow}>
              <Ionicons name="person-circle" size={36} color="#ff4757" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>

            <Text style={styles.message} numberOfLines={2}>
              {item.message}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  date: {
    fontSize: 12,
    color: "#9ca3af",
  },
  message: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
});
