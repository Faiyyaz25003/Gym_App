import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function CreateDietReference() {
  const [dietName, setDietName] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleSave = () => {
    console.log({
      dietName,
      description,
      youtubeUrl,
    });
    alert("Diet Reference Added Successfully 💪");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Diet Reference</Text>

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
        value={youtubeUrl}
        onChangeText={setYoutubeUrl}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Reference</Text>
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
