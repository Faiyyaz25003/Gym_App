import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // 🔐 Future: API / validation logic
    router.replace("/login");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* 🏋️ Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2964/2964514.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>JOIN THE GYM</Text>
        <Text style={styles.subtitle}>
          Build Muscle • Burn Fat • Stay Strong
        </Text>
      </View>

      {/* 📋 Form Card */}
      <View style={styles.card}>
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={20} color="#888" />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#999"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="call-outline" size={20} color="#888" />
          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#888" />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* 🔥 Register Button */}
        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        {/* 🔙 Login Redirect */}
        <View style={styles.loginBox}>
          <Text style={{ color: "#94a3b8" }}>Already a member?</Text>
          <TouchableOpacity onPress={() => router.replace("/auth/login")}>
            <Text style={styles.loginText}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#22c55e",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 6,
  },
  card: {
    backgroundColor: "#020617",
    borderRadius: 16,
    padding: 20,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  registerBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#020617",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  loginBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#22c55e",
    fontWeight: "600",
  },
});
