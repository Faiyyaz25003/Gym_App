import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Replace with your local network IP if testing on a real device
const BASE_URL = "http://localhost:5000/api/trainers";

export default function AddTrainer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📸 Pick Image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Denied", "You need to allow access to images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) setImage(result.assets[0]);
  };

  // 📨 Submit Trainer
  const handleSubmit = async () => {
    if (!name || !phone || !email) {
      Alert.alert("Error", "Please fill all required fields!");
      return;
    }

    // Validate numeric fields
    if (experience && isNaN(experience)) {
      Alert.alert("Error", "Experience must be a number!");
      return;
    }
    if (salary && isNaN(salary)) {
      Alert.alert("Error", "Salary must be a number!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("experience", experience);
    formData.append("specialization", specialization);
    formData.append("salary", salary);

    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: `trainer_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
    }

    try {
      const res = await axios.post(`${BASE_URL}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      Alert.alert("Success ✅", "Trainer Added Successfully!");

      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setExperience("");
      setSpecialization("");
      setSalary("");
      setImage(null);
    } catch (err) {
      console.error(err);
      Alert.alert("Error ❌", "Failed to add trainer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>➕ Add Trainer</Text>

        <TextInput
          style={styles.input}
          placeholder="Trainer Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Experience (Years)"
          keyboardType="numeric"
          value={experience}
          onChangeText={setExperience}
        />
        <TextInput
          style={styles.input}
          placeholder="Specialization"
          value={specialization}
          onChangeText={setSpecialization}
        />
        <TextInput
          style={styles.input}
          placeholder="Salary"
          keyboardType="numeric"
          value={salary}
          onChangeText={setSalary}
        />

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Text style={{ color: "#fff" }}>
            {image ? "Change Image" : "Pick Image"}
          </Text>
        </TouchableOpacity>

        {image && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: image.uri }} style={styles.preview} />
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: "#93c5fd" }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Adding..." : "Add Trainer"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f9fafb" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  imagePicker: {
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  previewContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 200,
  },
});
