import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function UserDetails() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const demoUsers = [
    {
      name: "Rahul Sharma",
      phone: "9876543210",
      age: 25,
      plan: "Monthly",
      fees: 1200,
    },
    {
      name: "Amit Verma",
      phone: "9123456789",
      age: 30,
      plan: "Quarterly",
      fees: 3200,
    },
    {
      name: "Sneha Patel",
      phone: "9988776655",
      age: 22,
      plan: "Monthly",
      fees: 1200,
    },
    {
      name: "Pooja Singh",
      phone: "9012345678",
      age: 28,
      plan: "Yearly",
      fees: 11000,
    },
    {
      name: "Rohit Kumar",
      phone: "8899776655",
      age: 35,
      plan: "Quarterly",
      fees: 3000,
    },
  ];

  useEffect(() => {
    setUsers(demoUsers);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Registered Members</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map((user, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/user/[user]",
                params: user,
              })
            }
          >
            <View style={styles.row}>
              <Ionicons name="person-circle" size={42} color="#ff4757" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.phone}>{user.phone}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="fitness" size={16} color="#555" />
              <Text style={styles.infoText}>{user.plan} Plan</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f3f4f6" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },
  row: { flexDirection: "row", alignItems: "center" },
  name: { fontSize: 16, fontWeight: "700" },
  phone: { fontSize: 13, color: "#6b7280" },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  infoText: { marginLeft: 8, fontSize: 14 },
});
