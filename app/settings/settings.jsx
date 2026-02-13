

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SettingItem = ({ icon, title, onPress, danger }) => (
  <TouchableOpacity
    style={[styles.item, danger && styles.dangerItem]}
    onPress={onPress}
  >
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={22} color={danger ? "#e63946" : "#444"} />
      <Text style={[styles.itemText, danger && { color: "#e63946" }]}>
        {title}
      </Text>
    </View>
    {!danger && <Ionicons name="chevron-forward" size={20} color="#999" />}
  </TouchableOpacity>
);

export default function Settings() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>⚙️ Settings</Text>

      {/* 👤 Account */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingItem
          icon="person-outline"
          title="Profile"
          onPress={() => router.push("/profile")}
        />
        <SettingItem
          icon="lock-closed-outline"
          title="Change Password"
          onPress={() => router.push("/changePassword")}
        />
      </View>

      {/* 🔔 Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <SettingItem icon="notifications-outline" title="Workout Reminders" />
        <SettingItem icon="fast-food-outline" title="Diet Reminders" />
        <SettingItem icon="calendar-outline" title="Schedule Alerts" />
      </View>

      {/* 🎨 App Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <SettingItem icon="moon-outline" title="Dark Mode" />
        <SettingItem icon="language-outline" title="Language" />
        <SettingItem icon="options-outline" title="Units & Display" />
      </View>

      {/* 🏋️ Fitness */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fitness</Text>
        <SettingItem
          icon="nutrition-outline"
          title="Diet Settings"
          onPress={() => router.push("/diet")}
        />
        <SettingItem
          icon="barbell-outline"
          title="Exercise Preferences"
          onPress={() => router.push("/home/exercise")}
        />
      </View>

      {/* 📄 Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingItem
          icon="information-circle-outline"
          title="About App"
          onPress={() => router.push("/settings/about")}
        />
        <SettingItem icon="help-circle-outline" title="Help & FAQ" />
        <SettingItem icon="document-text-outline" title="Privacy Policy" />
      </View>

      {/* 🚪 Account Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Actions</Text>
        <SettingItem icon="log-out-outline" title="Logout" danger />
        <SettingItem icon="trash-outline" title="Delete Account" danger />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 6,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderColor: "#eee",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  dangerItem: {
    backgroundColor: "#fff5f5",
  },
});
