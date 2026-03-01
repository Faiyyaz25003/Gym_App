

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // ✅ Same key jo login me save kiya tha
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          console.log("❌ Token not found");
          Alert.alert("Error", "User not logged in");
          setLoading(false);
          return;
        }

        console.log("✅ Token Found:", token);

        // ⚠ IMPORTANT:
        // Agar emulator use kar rahe ho to:
        // Android → http://10.0.2.2:5000
        // Real Device → http://YOUR_PC_IP:5000

        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.log("Profile fetch error:", err.response?.data || err.message);
        Alert.alert("Error", "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e3c72" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No profile data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.fullName}</Text>
      <Text style={styles.text}>📧 Email: {user.email}</Text>
      <Text style={styles.text}>📱 Mobile: {user.mobile}</Text>
      <Text style={styles.text}>🏋 Plan: {user.membershipPlan}</Text>
      <Text style={styles.text}>💳 Payment: {user.paymentStatus}</Text>

      {user.qrCode && (
        <Image
          source={{ uri: user.qrCode }}
          style={styles.qr}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e3c72",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  qr: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});