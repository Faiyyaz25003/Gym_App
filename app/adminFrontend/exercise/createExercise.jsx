import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* ============================= */
/* 🔥 BASE URL CONFIGURATION */
/* ============================= */

// ⚠️ Replace with your PC IPv4 address
const BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.1.5:5000/api/exercises" // <-- CHANGE IP
    : "http://localhost:5000/api/exercises";

/* ============================= */

export default function ExerciseScreen() {
  const [exercises, setExercises] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    exerciseName: "",
    video: "",
    shortDescription: "",
    muscleGroup: "",
    equipmentRequired: "",
    difficultyLevel: "",
    exerciseType: "",
  });

  /* ============================= */
  /* FETCH EXERCISES */
  /* ============================= */
  const fetchExercises = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      setExercises(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error.message);
      Alert.alert("Error", "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  /* ============================= */
  /* CREATE OR UPDATE */
  /* ============================= */
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(BASE_URL, form);
      }

      setForm({
        exerciseName: "",
        video: "",
        shortDescription: "",
        muscleGroup: "",
        equipmentRequired: "",
        difficultyLevel: "",
        exerciseType: "",
      });

      fetchExercises();
    } catch (error) {
      console.log("SUBMIT ERROR:", error.message);
      Alert.alert("Error", "Something went wrong");
    }
  };

  /* ============================= */
  /* DELETE */
  /* ============================= */
  const deleteExercise = (id) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await axios.delete(`${BASE_URL}/${id}`);
            fetchExercises();
          } catch (error) {
            Alert.alert("Error", "Delete failed");
          }
        },
      },
    ]);
  };

  /* ============================= */
  /* EDIT */
  /* ============================= */
  const editExercise = (item) => {
    setForm({
      exerciseName: item.exerciseName,
      video: item.video,
      shortDescription: item.shortDescription,
      muscleGroup: item.muscleGroup,
      equipmentRequired: item.equipmentRequired,
      difficultyLevel: item.difficultyLevel,
      exerciseType: item.exerciseType,
    });

    setEditingId(item._id);
  };

  /* ============================= */

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Exercise Management</Text>

      {Object.keys(form).map((key) => (
        <TextInput
          key={key}
          placeholder={key}
          value={form[key]}
          style={styles.input}
          onChangeText={(text) => setForm({ ...form, [key]: text })}
        />
      ))}

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>
          {editingId ? "Update Exercise" : "Add Exercise"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.exerciseName}</Text>
            <Text>{item.muscleGroup}</Text>
            <Text>{item.difficultyLevel}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => editExercise(item)}
                style={styles.editBtn}
              >
                <Ionicons name="create" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteExercise(item._id)}
                style={styles.deleteBtn}
              >
                <Ionicons name="trash" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

/* ============================= */
/* STYLES */
/* ============================= */

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  btn: {
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
  },
  editBtn: {
    backgroundColor: "#3498db",
    padding: 8,
    marginRight: 10,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 6,
  },
});
