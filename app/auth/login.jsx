import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 🔐 Yaha future me API / Auth logic aayega
    router.replace("/tabs/home"); // login ke baad home
  };

  return (
    <View style={styles.container}>
      {/* 🏋️ Logo / Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2964/2964514.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>GYM FIT PRO</Text>
        <Text style={styles.subtitle}>Train Hard • Stay Strong • Be Fit</Text>
      </View>

      {/* 📩 Form */}
      <View style={styles.form}>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput
            placeholder="Email or Username"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
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

        {/* Forgot */}
        <TouchableOpacity
          style={styles.forgot}
          onPress={() => router.push("/auth/forgot-password")}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* 🔥 Login Button */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        {/* 🆕 Register */}
        <View style={styles.registerBox}>
          <Text style={{ color: "#777" }}>New Member?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text style={styles.registerText}> Register Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#22c55e",
    letterSpacing: 2,
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: 6,
    fontSize: 13,
  },
  form: {
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
    marginBottom: 16,
  },
  input: {
    marginLeft: 10,
    color: "#fff",
    flex: 1,
    fontSize: 15,
  },
  forgot: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#22c55e",
    fontSize: 13,
  },
  loginBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 18,
  },
  loginText: {
    color: "#020617",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  registerBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "#22c55e",
    fontWeight: "600",
  },
});
