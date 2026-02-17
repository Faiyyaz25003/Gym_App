import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Plans() {
  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      duration: "1 Month",
      price: "₹999",
      features: ["Gym Access", "Basic Workout Plan"],
    },
    {
      id: 2,
      name: "Standard Plan",
      duration: "3 Months",
      price: "₹2499",
      features: ["Gym Access", "Diet Plan", "Workout Plan"],
    },
    {
      id: 3,
      name: "Premium Plan",
      duration: "12 Months",
      price: "₹7999",
      features: ["Gym Access", "Personal Trainer", "Diet Plan", "Workout Plan"],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>💪 Gym Packages</Text>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.card}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.duration}>{plan.duration}</Text>
          <Text style={styles.price}>{plan.price}</Text>

          <View style={styles.features}>
            {plan.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Choose Plan</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  duration: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff4757",
    marginVertical: 10,
  },
  features: {
    marginBottom: 15,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#ff4757",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
