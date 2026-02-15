import { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const trainersData = [
  {
    id: "1",
    name: "Rahul Sharma",
    role: "Cardio Trainer",
    experience: "5 Years",
  },
  {
    id: "2",
    name: "Neha Verma",
    role: "Yoga Trainer",
    experience: "3 Years",
  },
  {
    id: "3",
    name: "Aman Khan",
    role: "Weight Trainer",
    experience: "6 Years",
  },
  {
    id: "4",
    name: "Priya Singh",
    role: "Zumba Trainer",
    experience: "4 Years",
  },
];

export default function Trainers() {
  const [search, setSearch] = useState("");

  const filteredData = trainersData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={32} color="#2563eb" />
      </View>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
      <Text style={styles.exp}>{item.experience}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>👥 View Trainers</Text>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#6b7280" />
        <TextInput
          placeholder="Search trainer..."
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Trainers Grid */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 16,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  role: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  exp: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
});
