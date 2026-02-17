import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const FAQItem = ({ question, answer }) => (
  <View style={styles.faqItem}>
    <Text style={styles.question}>❓ {question}</Text>
    <Text style={styles.answer}>{answer}</Text>
  </View>
);

export default function HelpFAQ() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="help-circle-outline" size={44} color="#fff" />
        <Text style={styles.headerTitle}>Help & FAQs</Text>
        <Text style={styles.headerSub}>
          Frequently Asked Questions & Support
        </Text>
      </View>

      {/* FAQs */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>General Questions</Text>

        <FAQItem
          question="What is this app used for?"
          answer="This app helps gyms, trainers, and members manage workouts, diet plans, schedules, and fitness activities easily."
        />

        <FAQItem
          question="Who can use this app?"
          answer="Members, trainers, and gym owners can use this app based on their assigned roles."
        />

        <FAQItem
          question="How do I change my password?"
          answer="Go to Settings → Change Password and update your password securely."
        />

        <FAQItem
          question="How do I view my diet or exercise plan?"
          answer="Navigate to Diet or Exercise section from the main menu or settings page."
        />
      </View>

      {/* Account & Security */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account & Security</Text>

        <FAQItem
          question="Is my data safe?"
          answer="Yes. Your personal data, workout details, and schedules are stored securely and are never shared without permission."
        />

        <FAQItem
          question="Can I delete my account?"
          answer="Yes. You can request account deletion from Settings → Delete Account."
        />
      </View>

      {/* Support */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Need More Help?</Text>
        <Text style={styles.supportText}>
          If your question is not listed above, please contact our support team
          or visit the help section for more guidance.
        </Text>

        <View style={styles.supportRow}>
          <Ionicons name="mail-outline" size={18} color="#1e90ff" />
          <Text style={styles.supportInfo}>support@fitnessapp.com</Text>
        </View>

        <View style={styles.supportRow}>
          <Ionicons name="call-outline" size={18} color="#1e90ff" />
          <Text style={styles.supportInfo}>+91 90000 00000</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          We are here to help you stay fit 💪
        </Text>
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
  faqItem: {
    marginBottom: 14,
  },
  question: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  answer: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
  supportText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 10,
  },
  supportRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  supportInfo: {
    fontSize: 13,
    color: "#333",
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
