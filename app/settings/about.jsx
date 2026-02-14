import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InfoItem = ({ icon, title, description }) => (
  <View style={styles.infoItem}>
    <View style={styles.iconBox}>
      <Ionicons name={icon} size={22} color="#1e90ff" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoDesc}>{description}</Text>
    </View>
  </View>
);

export default function AboutApp() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* App Header */}
      <View style={styles.header}>
        <Ionicons name="barbell-outline" size={48} color="#fff" />
        <Text style={styles.appName}>Fitness Management App</Text>
        <Text style={styles.tagline}>Train Smart. Stay Fit.</Text>
      </View>

      {/* Introduction */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About the App</Text>
        <Text style={styles.text}>
          This fitness application is designed to help gyms, trainers, and
          members manage workouts, diet plans, schedules, and fitness activities
          in one simple and easy-to-use platform.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        <InfoItem
          icon="people-outline"
          title="Member & Trainer Management"
          description="Manage members, trainers, and their fitness activities efficiently."
        />
        <InfoItem
          icon="calendar-outline"
          title="Workout & Schedule Planning"
          description="Plan daily workouts, schedules, and training sessions."
        />
        <InfoItem
          icon="nutrition-outline"
          title="Diet & Exercise Reference"
          description="Access diet plans and exercise references anytime."
        />
        <InfoItem
          icon="notifications-outline"
          title="Smart Notifications"
          description="Get reminders for workouts, diets, and schedules."
        />
        <InfoItem
          icon="lock-closed-outline"
          title="Secure System"
          description="Your data is protected with secure authentication."
        />
      </View>

      {/* Who Can Use */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Who Can Use This App?</Text>
        <Text style={styles.text}>
          • Members – Track workouts, diet plans, and schedules{"\n"}• Trainers
          – Manage members and assign workouts & diet plans{"\n"}• Gym Owners –
          Monitor and manage overall gym operations
        </Text>
      </View>

      {/* Goal */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Our Goal</Text>
        <Text style={styles.text}>
          Our goal is to simplify fitness management by connecting trainers and
          members through a smart, efficient, and user-friendly platform.
        </Text>
      </View>

      {/* Privacy */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Privacy & Data Security</Text>
        <Text style={styles.text}>
          We respect your privacy. All personal data, workout information, and
          schedules are stored securely and are never shared without your
          consent.
        </Text>
      </View>

      {/* Version */}
      <View style={styles.footer}>
        <Text style={styles.version}>App Version 1.0.0</Text>
        <Text style={styles.version}>© 2026 Fitness App</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  header: {
    backgroundColor: "#E8380D",
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  appName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  tagline: {
    color: "#e0e0e0",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eef4ff",
    justifyContent: "center",
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoDesc: {
    fontSize: 13,
    color: "#666",
  },
  footer: {
    alignItems: "center",
    marginVertical: 30,
  },
  version: {
    fontSize: 12,
    color: "#999",
  },
});
