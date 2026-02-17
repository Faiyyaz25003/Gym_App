import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // admin | user | outer

  const handleLogin = () => {
    const admin = { email: "admin@gym.com", password: "123456" };
    const user = { email: "user@gym.com", password: "123456" };
    const outer = { email: "outer@gym.com", password: "123456" };

    if (
      role === "admin" &&
      email === admin.email &&
      password === admin.password
    ) {
      router.replace("/adminTabs");
      return;
    }

    if (role === "user" && email === user.email && password === user.password) {
      router.replace("/userTabs");
      return;
    }

    if (
      role === "outer" &&
      email === outer.email &&
      password === outer.password
    ) {
      router.replace("/homeUserTabs");
      return;
    }

    Alert.alert("Login Failed", "Invalid credentials for selected role");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Card */}
      <View style={styles.card}>
        {/* Role Selector */}
        <View style={styles.roleBox}>
          <TouchableOpacity
            style={[styles.roleBtn, role === "admin" && styles.roleActive]}
            onPress={() => setRole("admin")}
          >
            <Ionicons name="shield-checkmark" size={18} color="#fff" />
            <Text style={styles.roleText}>Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleBtn, role === "user" && styles.roleActive]}
            onPress={() => setRole("user")}
          >
            <Ionicons name="person" size={18} color="#fff" />
            <Text style={styles.roleText}>User</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleBtn, role === "outer" && styles.roleActive]}
            onPress={() => setRole("outer")}
          >
            <Ionicons name="earth" size={18} color="#fff" />
            <Text style={styles.roleText}>Outer</Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9ca3af"
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

        {/* Login Button */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN AS {role.toUpperCase()}</Text>
        </TouchableOpacity>

        {/* Register */}
        {role !== "admin" && (
          <View style={styles.registerBox}>
            <Text style={styles.registerLabel}>New here?</Text>
            <TouchableOpacity onPress={() => router.push("/auth/register")}>
              <Text style={styles.registerText}> Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    width: 90,
    height: 90,
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#22c55e",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 6,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 22,
    borderRadius: 18,
    elevation: 8,
  },

  roleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  roleBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#334155",
    marginHorizontal: 5,
  },

  roleActive: {
    backgroundColor: "#22c55e",
  },

  roleText: {
    color: "#fff",
    fontWeight: "600",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    color: "#fff",
    fontSize: 15,
  },

  forgot: {
    alignItems: "flex-end",
    marginBottom: 20,
  },

  forgotText: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "500",
  },

  loginBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    elevation: 6,
  },

  loginText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  registerBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  registerLabel: {
    color: "#9ca3af",
  },

  registerText: {
    color: "#22c55e",
    fontWeight: "600",
  },
});
