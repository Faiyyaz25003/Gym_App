import { FlatList, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";

const members = [
  { id: "1", name: "Rahul Sharma", plan: "Monthly" },
  { id: "2", name: "Aman Khan", plan: "Quarterly" },
  { id: "3", name: "Neha Verma", plan: "Yearly" },
];

export default function ViewMembers() {
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.plan.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👥 Members</Text>

      {/* 🔍 Search Bar */}
      <TextInput
        placeholder="Search member or plan..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        placeholderTextColor="#999"
      />

      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.plan}>Plan: {item.plan}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No members found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 12,
    marginTop: 32,
  },
  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 14,
    elevation: 2,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  plan: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 40,
  },
});
