import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateDiet() {
  const [user, setUser] = useState("Member 1");
  const [dietName, setDietName] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSave = () => {
    // abhi dummy action
    console.log({
      user,
      dietName,
      description,
      videoUrl,
    });
    alert("Diet Created Successfully 💪");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Diet</Text>

      <Text style={styles.label}>Select Member</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={user} onValueChange={setUser}>
          <Picker.Item label="Member 1" value="Member 1" />
          <Picker.Item label="Member 2" value="Member 2" />
          <Picker.Item label="Member 3" value="Member 3" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Diet Name (e.g. Weight Loss Diet)"
        value={dietName}
        onChangeText={setDietName}
      />

      <TextInput
        style={[styles.input, { height: 90 }]}
        placeholder="Diet Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="YouTube Video URL"
        value={videoUrl}
        onChangeText={setVideoUrl}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Diet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
  },
  pickerBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
