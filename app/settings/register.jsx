import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterMember() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [plan, setPlan] = useState("");
  const [fees, setFees] = useState("");

  const handleRegister = () => {
    if (!name || !phone || !age || !plan || !fees) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // 🔥 Yahan future me API / Database connect hoga
    Alert.alert("Success", "Member Registered Successfully");

    // Reset form
    setName("");
    setPhone("");
    setAge("");
    setPlan("");
    setFees("");

    router.back();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🔙 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Member</Text>
      </View>

      {/* 🧍 Member Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Member Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
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
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      {/* 💳 Membership Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Membership</Text>

        <TextInput
          style={styles.input}
          placeholder="Plan (Monthly / Quarterly / Yearly)"
          value={plan}
          onChangeText={setPlan}
        />

        <TextInput
          style={styles.input}
          placeholder="Fees (₹)"
          keyboardType="numeric"
          value={fees}
          onChangeText={setFees}
        />
      </View>

      {/* ✅ Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Ionicons name="person-add-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Register Member</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2a9d8f",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
