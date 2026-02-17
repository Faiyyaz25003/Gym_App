import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ViewMembers() {
  // 🔥 Temporary Dummy Data (baad me database se aayega)
  const [members, setMembers] = useState([
    {
      id: "1",
      name: "Rahul Sharma",
      phone: "9876543210",
      age: "25",
      plan: "Monthly",
      fees: "1500",
    },
    {
      id: "2",
      name: "Aman Khan",
      phone: "9123456780",
      age: "28",
      plan: "Yearly",
      fees: "12000",
    },
  ]);

  const deleteMember = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: () => setMembers(members.filter((item) => item.id !== id)),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity onPress={() => deleteMember(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#e63946" />
        </TouchableOpacity>
      </View>

      <Text style={styles.detail}>📞 {item.phone}</Text>
      <Text style={styles.detail}>🎂 Age: {item.age}</Text>
      <Text style={styles.detail}>💳 Plan: {item.plan}</Text>
      <Text style={styles.detail}>💰 Fees: ₹{item.fees}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🔙 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View Members</Text>
      </View>

      {members.length === 0 ? (
        <Text style={styles.emptyText}>No Members Added Yet</Text>
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    marginTop: 13,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
