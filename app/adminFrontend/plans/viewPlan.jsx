
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ⚠️ Replace with your PC IPv4 address
const BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.1.5:5000/api/plans"
    : "http://localhost:5000/api/plans";

/* ── Animated Plan Card ── */
function PlanCard({ item, onDelete, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Color accent per card based on index
  const accents = ["#E63946", "#1565C0", "#2E7D32", "#6A1B9A", "#E65100"];
  const accent = accents[index % accents.length];

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Left accent bar */}
      <View style={[styles.accentBar, { backgroundColor: accent }]} />

      <View style={styles.cardInner}>
        {/* Header Row */}
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.planName, { color: accent }]}>
              {item.planName}
            </Text>
            <Text style={styles.planId}>ID: {item.planId}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceSymbol}>₹</Text>
            <Text style={styles.priceValue}>{item.price}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: accent + "40" }]} />

        {/* Info Grid */}
        <View style={styles.infoGrid}>
          <InfoChip
            icon="time-outline"
            label="Duration"
            value={item.duration}
            accent={accent}
          />
          <InfoChip
            icon="trophy-outline"
            label="Goal"
            value={item.goalType}
            accent={accent}
          />
          <InfoChip
            icon="barbell-outline"
            label="Workout"
            value={item.workoutFrequency}
            accent={accent}
          />
          <InfoChip
            icon="key-outline"
            label="Access"
            value={item.accessType}
            accent={accent}
          />
          <InfoChip
            icon="person-outline"
            label="Trainer"
            value={item.trainerSupport}
            accent={accent}
          />
          <InfoChip
            icon="nutrition-outline"
            label="Diet"
            value={item.dietPlan}
            accent={accent}
          />
          <InfoChip
            icon="people-outline"
            label="Group"
            value={item.groupClasses}
            accent={accent}
          />
          <InfoChip
            icon="stats-chart-outline"
            label="Tracking"
            value={item.progressTracking}
            accent={accent}
          />
        </View>

        {/* Description */}
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}

        {/* Footer Row */}
        <View style={styles.cardFooter}>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor:
                    item.status === "active" ? "#2E7D32" : "#C62828",
                },
              ]}
            />
            <Text style={styles.statusText}>{item.status?.toUpperCase()}</Text>
            {item.isPopular && (
              <View style={[styles.popularBadge, { borderColor: accent }]}>
                <Text style={[styles.popularText, { color: accent }]}>
                  🔥 POPULAR
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.deleteBtn, { borderColor: "#FF4444" }]}
            onPress={() => onDelete(item._id)}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={18} color="#C62828" />
            <Text style={styles.deleteBtnText}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

/* ── Small info chip ── */
function InfoChip({ icon, label, value, accent }) {
  if (!value) return null;
  return (
    <View style={styles.chip}>
      <Ionicons
        name={icon}
        size={13}
        color={accent}
        style={{ marginRight: 4 }}
      />
      <Text style={styles.chipLabel}>{label}: </Text>
      <Text style={styles.chipValue}>{value}</Text>
    </View>
  );
}

/* ── Main Screen ── */
export default function ViewPlansScreen() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      setPlans(res.data);
    } catch (error) {
      Alert.alert("Error", "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const deletePlan = (id) => {
    Alert.alert("Delete Plan", "Are you sure you want to delete this plan?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${BASE_URL}/${id}`);
            fetchPlans();
          } catch (error) {
            Alert.alert("Error", "Could not delete plan");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#E63946" />
        <Text style={styles.loaderText}>Loading Plans...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>⚡ POWERFIT GYM</Text>
          <Text style={styles.headerTitle}>Membership Plans</Text>
        </View>
        <TouchableOpacity style={styles.refreshBtn} onPress={fetchPlans}>
          <Ionicons name="refresh-outline" size={22} color="#E63946" />
        </TouchableOpacity>
      </View>

      {/* Count badge */}
      <View style={styles.countRow}>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{plans.length} PLANS AVAILABLE</Text>
        </View>
      </View>

      {plans.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="barbell-outline" size={60} color="#CCCCCC" />
          <Text style={styles.emptyText}>No Plans Found</Text>
          <Text style={styles.emptySubText}>
            Add your first membership plan
          </Text>
        </View>
      ) : (
        <FlatList
          data={plans}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <PlanCard item={item} onDelete={deletePlan} index={index} />
          )}
          contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

/* ── Styles ── */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  /* Loader */
  loaderContainer: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loaderText: {
    color: "#888",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    fontSize: 14,
    letterSpacing: 2,
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  headerEyebrow: {
    color: "#E63946",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    marginBottom: 4,
  },
  headerTitle: {
    color: "#1A1A2E",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  refreshBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#E63946",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
  },

  /* Count */
  countRow: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  countBadge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
    borderLeftWidth: 3,
    borderLeftColor: "#E63946",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  countText: {
    color: "#555",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },

  /* Card */
  cardWrapper: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  accentBar: {
    width: 4,
  },
  cardInner: {
    flex: 1,
    padding: 16,
  },

  /* Card Header */
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  planName: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.3,
    textTransform: "uppercase",
  },
  planId: {
    color: "#AAAAAA",
    fontSize: 11,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    marginTop: 2,
    letterSpacing: 1,
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F5F6FA",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  priceSymbol: {
    color: "#999",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  priceValue: {
    color: "#1A1A2E",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -1,
  },

  divider: {
    height: 1,
    marginBottom: 12,
  },

  /* Info Grid */
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  chipLabel: {
    color: "#999",
    fontSize: 11,
    fontWeight: "600",
  },
  chipValue: {
    color: "#333",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  /* Description */
  description: {
    color: "#888",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
    fontStyle: "italic",
  },

  /* Footer */
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    color: "#999",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  popularBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  popularText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFF5F5",
  },
  deleteBtnText: {
    color: "#C62828",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  /* Empty State */
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  emptyText: {
    color: "#BBBBBB",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1,
  },
  emptySubText: {
    color: "#CCCCCC",
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
