import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function AddTrainer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = () => {
    if (!name || !phone || !email) {
      Alert.alert("Error", "Please fill all required fields!");
      return;
    }

    const trainerData = {
      name,
      phone,
      email,
      experience,
      specialization,
      salary,
    };

    console.log("Trainer Added:", trainerData);

    Alert.alert("Success ✅", "Trainer Added Successfully!");

    // Reset form
    setName("");
    setPhone("");
    setEmail("");
    setExperience("");
    setSpecialization("");
    setSalary("");
  };

  return (
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
        placeholder="Specialization (e.g. Cardio, Yoga)"
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Trainer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 13,
    textAlign: "left",
  },
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
