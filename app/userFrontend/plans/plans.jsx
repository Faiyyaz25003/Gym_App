import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Plan() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic",
      duration: "1 Month",
      price: "₹999",
      priceNote: "per month",
      features: ["Gym Access", "Basic Workout Plan"],
      popular: false,
    },
    {
      id: 2,
      name: "Standard",
      duration: "3 Months",
      price: "₹2499",
      priceNote: "₹833/mo • Save 17%",
      features: ["Gym Access", "Diet Plan", "Workout Plan"],
      popular: true,
    },
    {
      id: 3,
      name: "Premium",
      duration: "12 Months",
      price: "₹7999",
      priceNote: "₹667/mo • Save 33%",
      features: ["Gym Access", "Personal Trainer", "Diet Plan", "Workout Plan"],
      popular: false,
    },
  ]);

  const handleDelete = (id) => {
    Alert.alert("Delete Plan", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          setPlans(plans.filter((plan) => plan.id !== id));
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>All Membership Plans</Text>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.card}>
          {/* Popular Badge */}
          {plan.popular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>⭐ MOST CHOSEN</Text>
            </View>
          )}

          {/* Plan Info */}
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.duration}>{plan.duration}</Text>

          <Text style={styles.price}>{plan.price}</Text>
          <Text style={styles.priceNote}>{plan.priceNote}</Text>

          {/* Features */}
          <View style={styles.featureContainer}>
            {plan.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color="#dc2626"
                />
                <Text style={styles.featureText}> {feature}</Text>
              </View>
            ))}
          </View>

          {/* Delete Button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(plan.id)}
          >
            <Text style={styles.deleteText}>Delete Plan</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  popularBadge: {
    backgroundColor: "#dc2626",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  popularText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  planName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },
  duration: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
  },

  price: {
    fontSize: 28,
    fontWeight: "900",
    color: "#dc2626",
  },
  priceNote: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 12,
  },

  featureContainer: {
    marginBottom: 15,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  featureText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },

  deleteButton: {
    backgroundColor: "#111827",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
