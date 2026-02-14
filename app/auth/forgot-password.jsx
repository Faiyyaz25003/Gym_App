import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    // 🔐 Future: API to send reset link / OTP
    router.replace("/auth/login");
  };

  return (
    <View style={styles.container}>
      {/* 🏋️ Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2964/2964514.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>RESET PASSWORD</Text>
        <Text style={styles.subtitle}>Get back to your fitness journey 💪</Text>
      </View>

      {/* 📩 Card */}
      <View style={styles.card}>
        <Text style={styles.infoText}>
          Enter your registered email address. We’ll send you a password reset
          link.
        </Text>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* 🔥 Reset Button */}
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetText}>SEND RESET LINK</Text>
        </TouchableOpacity>

        {/* 🔙 Back to Login */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.replace("/auth/login")}
        >
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
    justifyContent: "center",
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
    fontSize: 24,
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
  infoText: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  resetBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  resetText: {
    color: "#020617",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 1,
  },
  backBtn: {
    alignItems: "center",
  },
  backText: {
    color: "#22c55e",
    fontSize: 14,
    fontWeight: "600",
  },
});
