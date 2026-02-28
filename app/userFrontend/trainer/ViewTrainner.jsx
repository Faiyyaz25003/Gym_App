import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Update this to your PC's LAN IP when testing on real device
const BASE_URL = "http://localhost:5000/api/trainers";

export default function ViewTrainer() {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      if (res.data.success) {
        setTrainers(res.data.trainers);
      }
    } catch (err) {
      console.error("Failed to fetch trainers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderTrainer = ({ item }) => (
    <View style={styles.card}>
      {item.image ? (
        <Image
          source={{ uri: `http://192.168.1.100:5000/uploads/${item.image}` }}
          style={styles.avatar}
        />
      ) : (
        <Ionicons name="person-circle" size={60} color="#2563eb" />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Mobile:</Text> {item.phone}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>E-Mail:</Text> {item.email}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Experience:</Text>{" "}
          {item.experience} Years
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Specialization:</Text>{" "}
          {item.specialization}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 View Trainers</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6b7280" />
        <TextInput
          placeholder="Search trainer..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <FlatList
          data={filteredTrainers}
          keyExtractor={(item) => item._id}
          renderItem={renderTrainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    color: "#111827", // Darker heading color
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
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 2,
  },
});
