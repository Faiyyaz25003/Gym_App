import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from "react-native";

export default function CreatePlan() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [priceNote, setPriceNote] = useState("");
  const [features, setFeatures] = useState("");
  const [popular, setPopular] = useState(false);

  const handleCreatePlan = () => {
    if (!name || !duration || !price) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const newPlan = {
      name,
      duration,
      price,
      priceNote,
      features: features.split(",").map((f) => f.trim()),
      popular,
    };

    console.log("Created Plan:", newPlan);

    Alert.alert("Success", "Plan Created Successfully!");

    // Reset Fields
    setName("");
    setDuration("");
    setPrice("");
    setPriceNote("");
    setFeatures("");
    setPopular(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create New Plan</Text>

      <Text style={styles.label}>Plan Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter plan name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Duration *</Text>
      <TextInput
        style={styles.input}
        placeholder="1 Month / 3 Months"
        value={duration}
        onChangeText={setDuration}
      />

      <Text style={styles.label}>Price *</Text>
      <TextInput
        style={styles.input}
        placeholder="₹999"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Price Note</Text>
      <TextInput
        style={styles.input}
        placeholder="₹833/mo • Save 17%"
        value={priceNote}
        onChangeText={setPriceNote}
      />

      <Text style={styles.label}>Features (comma separated)</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Gym Access, Diet Plan, Personal Trainer"
        value={features}
        onChangeText={setFeatures}
        multiline
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Mark as Popular</Text>
        <Switch value={popular} onValueChange={setPopular} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreatePlan}>
        <Text style={styles.buttonText}>Create Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: "#f9fafb",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#dc2626",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});
