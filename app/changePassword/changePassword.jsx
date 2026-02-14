import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password does not match");
      return;
    }

    // 🔐 Backend / API yahan connect hoga
    Alert.alert("Success", "Password changed successfully");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔐 Change Password</Text>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" />
        <TextInput
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          style={styles.input}
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="key-outline" size={20} color="#666" />
        <TextInput
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="checkmark-circle-outline" size={20} color="#666" />
        <TextInput
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleChangePassword}>
        <Text style={styles.btnText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  btn: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
