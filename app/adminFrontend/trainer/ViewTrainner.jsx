import { useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* 🔹 Dummy Trainers Data */
const trainersData = [
  {
    id: "1",
    name: "Rahul Sharma",
    specialization: "Cardio Trainer",
    experience: "5 Years",
  },
  {
    id: "2",
    name: "Neha Verma",
    specialization: "Yoga Trainer",
    experience: "3 Years",
  },
  {
    id: "3",
    name: "Aman Khan",
    specialization: "Weight Trainer",
    experience: "6 Years",
  },
  {
    id: "4",
    name: "Priya Singh",
    specialization: "Zumba Trainer",
    experience: "4 Years",
  },
];

export default function ViewTrainer() {
  const [search, setSearch] = useState("");

  const filteredTrainers = trainersData.filter((trainer) =>
    trainer.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderTrainer = ({ item }) => (
    <View style={styles.card}>
      <Ionicons name="person-circle" size={50} color="#2563eb" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.text}>{item.specialization}</Text>
      <Text style={styles.exp}>{item.experience}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 View Trainers</Text>

      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6b7280" />
        <TextInput
          placeholder="Search trainer..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* 🔳 Grid Cards */}
      <FlatList
        data={filteredTrainers}
        keyExtractor={(item) => item.id}
        renderItem={renderTrainer}
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
    padding: 15,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 13,
    textAlign: "left",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 6,
    textAlign: "center",
  },
  text: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
    textAlign: "center",
  },
  exp: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
});
