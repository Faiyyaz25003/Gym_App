import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* ============================= */
/* 🔐 LOGIN COMPONENT */
/* ============================= */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);

    /* ============================= */
    /* 🔥 DUMMY USERS */
    /* ============================= */

    const dummyUsers = [
      {
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
      },
      {
        email: "user@gmail.com",
        password: "123456",
        role: "user",
      },
      {
        email: "home@gmail.com",
        password: "123456",
        role: "home",
      },
    ];

    const foundUser = dummyUsers.find(
      (user) =>
        user.email === email.trim() && user.password === password.trim(),
    );

    setTimeout(() => {
      setLoading(false);

      if (!foundUser) {
        Alert.alert("Login Failed ❌", "Invalid email or password");
        return;
      }

      Alert.alert("Success ✅", "Login Successful");

      /* ============================= */
      /* 🚀 ROLE BASED NAVIGATION */
      /* ============================= */

      switch (foundUser.role) {
        case "admin":
          router.replace("/tabs/adminTabs");
          break;
        case "user":
          router.replace("/tabs/userTabs");
          break;
        case "home":
          router.replace("/tabs/homeUserTabs");
          break;
        default:
          router.replace("/");
      }
    }, 1000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        {/* Email */}
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
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

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0f172a" />
          ) : (
            <Text style={styles.loginText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        {/* Register */}
        <View style={styles.registerBox}>
          <Text style={styles.registerLabel}>New here?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text style={styles.registerText}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

/* ============================= */
/* 🎨 STYLES */
/* ============================= */

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
