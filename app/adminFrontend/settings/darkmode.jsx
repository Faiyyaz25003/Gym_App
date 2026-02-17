import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  const toggleSwitch = () => setIsDark((previousState) => !previousState);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#f5f6fa" },
      ]}
    >
      {/* 🔙 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#fff" : "#333"}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>
          Dark Mode
        </Text>
      </View>

      {/* 🌙 Toggle Section */}
      <View
        style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}
      >
        <View style={styles.row}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons
              name="moon-outline"
              size={22}
              color={isDark ? "#fff" : "#444"}
            />
            <Text
              style={{
                fontSize: 16,
                color: isDark ? "#fff" : "#333",
              }}
            >
              Enable Dark Mode
            </Text>
          </View>

          <Switch value={isDark} onValueChange={toggleSwitch} />
        </View>
      </View>

      {/* 👀 Preview */}
      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: isDark ? "#aaa" : "#555",
          }}
        >
          {isDark ? "Dark Mode is Enabled 🌙" : "Light Mode is Enabled ☀️"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    padding: 18,
    borderRadius: 14,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
