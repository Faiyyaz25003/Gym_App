import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/trainers";
const IMAGE_URL = "http://localhost:5000/uploads/";

export default function TrainerScreen() {
  const [trainers, setTrainers] = useState([]);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    specialization: "",
    experience: "",
    certification: "",
    shiftTiming: "",
    salary: "",
    joiningDate: "",
    status: "Active",
  });

  const fetchTrainers = async () => {
    const res = await axios.get(`${BASE_URL}/all`);
    setTrainers(res.data);
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) {
      formData.append("photo", {
        uri: image,
        name: "trainer.jpg",
        type: "image/jpeg",
      });
    }

    if (editingId) {
      await axios.put(`${BASE_URL}/update/${editingId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Trainer Updated");
    } else {
      await axios.post(`${BASE_URL}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Trainer Created");
    }

    setEditingId(null);
    setImage(null);
    fetchTrainers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/delete/${id}`);
    fetchTrainers();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trainer Form</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text>Select Photo</Text>
        )}
      </TouchableOpacity>

      {Object.keys(form).map((key) => (
        <TextInput
          key={key}
          placeholder={key}
          style={styles.input}
          onChangeText={(text) => setForm({ ...form, [key]: text })}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {editingId ? "Update Trainer" : "Save Trainer"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>Trainer List</Text>

      <FlatList
        data={trainers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.photo && (
              <Image
                source={{ uri: IMAGE_URL + item.photo }}
                style={styles.listImage}
              />
            )}
            <Text>{item.fullName}</Text>
            <Text>{item.specialization}</Text>

            <TouchableOpacity
              onPress={() => {
                setEditingId(item._id);
                setForm(item);
              }}
              style={styles.editBtn}
            >
              <Text>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDelete(item._id)}
              style={styles.deleteBtn}
            >
              <Text style={{ color: "#fff" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: { color: "#fff" },
  imagePicker: {
    height: 120,
    width: 120,
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  image: { width: 120, height: 120 },
  card: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  listImage: { width: 80, height: 80, marginBottom: 5 },
  editBtn: {
    backgroundColor: "yellow",
    padding: 6,
    marginTop: 5,
  },
  deleteBtn: {
    backgroundColor: "red",
    padding: 6,
    marginTop: 5,
  },
});
