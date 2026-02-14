import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{children}</Text>
  </View>
);

export default function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark-outline" size={44} color="#fff" />
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <Text style={styles.headerSub}>Your privacy is important to us</Text>
      </View>

      {/* Introduction */}
      <Section title="1. Introduction">
        This Privacy Policy explains how we collect, use, and protect your
        personal information when you use our Fitness Management Application.
      </Section>

      {/* Information Collected */}
      <Section title="2. Information We Collect">
        We may collect personal information such as your name, email address,
        phone number, profile photo, login credentials, workout preferences,
        diet plans, schedules, and attendance records.
      </Section>

      {/* Usage */}
      <Section title="3. How We Use Your Information">
        Your information is used for account management, workout and diet
        planning, trainer-member communication, notifications, reminders, and
        improving overall app performance.
      </Section>

      {/* Security */}
      <Section title="4. Data Security">
        We use secure authentication systems and industry-standard security
        measures to protect your data from unauthorized access, misuse, or
        disclosure.
      </Section>

      {/* Data Sharing */}
      <Section title="5. Data Sharing">
        We do not sell or trade your personal information. Your data may only be
        shared with your assigned trainer or gym administration for operational
        purposes.
      </Section>

      {/* Notifications & Permissions */}
      <Section title="6. Notifications & Permissions">
        The app may request permission for push notifications, reminders, and
        profile photo uploads. These permissions are used only to improve your
        app experience.
      </Section>

      {/* User Rights */}
      <Section title="7. Your Rights">
        You have the right to view, update, or delete your personal information.
        You can also change your password or request account deletion at any
        time from the Settings page.
      </Section>

      {/* Data Retention */}
      <Section title="8. Data Retention">
        We retain your data only as long as necessary to provide services and
        maintain proper account functionality.
      </Section>

      {/* Children's Privacy */}
      <Section title="9. Children's Privacy">
        This application is not intended for users under the age of 13.
      </Section>

      {/* Policy Updates */}
      <Section title="10. Policy Updates">
        We may update this Privacy Policy from time to time. Any major changes
        will be communicated within the app.
      </Section>

      {/* Contact */}
      <Section title="11. Contact Us">
        If you have any questions regarding this Privacy Policy, please contact
        us at: support@fitnessapp.com
      </Section>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Fitness Management App</Text>
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
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  headerSub: {
    color: "#e0e0e0",
    fontSize: 13,
    marginTop: 4,
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
  footer: {
    alignItems: "center",
    marginVertical: 30,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
});
