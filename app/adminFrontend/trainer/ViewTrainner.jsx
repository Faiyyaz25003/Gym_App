

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/trainers";
const IMAGE_URL = "http://localhost:5000/uploads/";

/* ─── Status Pill ──────────────────────────────────────────────── */
const StatusPill = ({ status }) => {
  const cfg = (() => {
    const s = (status || "").toLowerCase();
    if (s === "active")
      return {
        label: "Active",
        fg: "#16a34a",
        bg: "#dcfce7",
        border: "#bbf7d0",
      };
    if (s === "inactive")
      return {
        label: "Inactive",
        fg: "#dc2626",
        bg: "#fee2e2",
        border: "#fecaca",
      };
    return {
      label: "Unknown",
      fg: "#64748b",
      bg: "#f1f5f9",
      border: "#e2e8f0",
    };
  })();

  return (
    <View
      style={[
        s_pill.wrap,
        { backgroundColor: cfg.bg, borderColor: cfg.border },
      ]}
    >
      <View style={[s_pill.dot, { backgroundColor: cfg.fg }]} />
      <Text style={[s_pill.text, { color: cfg.fg }]}>{cfg.label}</Text>
    </View>
  );
};

const s_pill = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  text: { fontSize: 11, fontWeight: "700", letterSpacing: 0.3 },
});

/* ─── Info Chip ────────────────────────────────────────────────── */
const Chip = ({ icon, label, value }) => (
  <View style={s_chip.wrap}>
    <Text style={s_chip.icon}>{icon}</Text>
    <View>
      <Text style={s_chip.label}>{label}</Text>
      <Text style={s_chip.val} numberOfLines={1}>
        {value}
      </Text>
    </View>
  </View>
);

const s_chip = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    width: "100%",
  },
  icon: { fontSize: 16, marginRight: 10, width: 22 },
  label: {
    fontSize: 9,
    color: "#94a3b8",
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  val: {
    fontSize: 12,
    color: "#1e293b",
    fontWeight: "600",
    marginTop: 1,
    flexShrink: 1,
  },
});

/* ─── Trainer Card ─────────────────────────────────────────────── */
const TrainerCard = ({ item, onEdit, onDelete }) => {
  const initial = item.fullName?.charAt(0)?.toUpperCase() || "T";
  const joined = new Date(item.joiningDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <View style={s_card.outer}>
      {/* Left accent bar */}
      <View style={s_card.accentBar} />

      <View style={s_card.inner}>
        {/* ── Header ── */}
        <View style={s_card.header}>
          {item.photo ? (
            <Image
              source={{ uri: IMAGE_URL + item.photo }}
              style={s_card.avatar}
            />
          ) : (
            <View style={s_card.avatarFallback}>
              <Text style={s_card.avatarInitial}>{initial}</Text>
            </View>
          )}

          <View style={s_card.meta}>
            <Text style={s_card.name} numberOfLines={1}>
              {item.fullName}
            </Text>
            <Text style={s_card.spec} numberOfLines={1}>
              {item.specialization}
            </Text>
            <StatusPill status={item.status} />
          </View>

          <View style={s_card.expBox}>
            <Text style={s_card.expNum}>{item.experience}</Text>
            <Text style={s_card.expLbl}>YRS</Text>
          </View>
        </View>

        {/* ── Divider ── */}
        <View style={s_card.divider} />

        {/* ── Info Grid ── */}
        <View style={s_card.grid}>
          <Chip icon="📱" label="Mobile" value={item.mobile} />
          <Chip icon="✉️" label="Email" value={item.email} />
          <Chip icon="🕐" label="Shift" value={item.shiftTiming} />
          <Chip icon="💰" label="Salary" value={`₹${item.salary}`} />
          <Chip icon="🏅" label="Cert." value={item.certification} />
          <Chip icon="📅" label="Joined" value={joined} />
        </View>

        {/* ── Actions ── */}
        <View style={s_card.actions}>
          <TouchableOpacity
            style={s_card.editBtn}
            onPress={() => onEdit(item)}
            activeOpacity={0.8}
          >
            <Text style={s_card.editTxt}>✏️ Edit Trainer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s_card.delBtn}
            activeOpacity={0.8}
            onPress={() =>
              Alert.alert(
                "Remove Trainer",
                `Remove ${item.fullName} from the roster?`,
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => onDelete(item._id),
                  },
                ],
              )
            }
          >
            <Text style={s_card.delTxt}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const s_card = StyleSheet.create({
  outer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: "row",
    shadowColor: "#94a3b8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden",
  },
  accentBar: {
    width: 4,
    backgroundColor: "#3b82f6",
  },
  inner: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2.5,
    borderColor: "#3b82f6",
  },
  avatarFallback: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    borderColor: "#3b82f6",
  },
  avatarInitial: { color: "#1d4ed8", fontSize: 22, fontWeight: "900" },
  meta: { flex: 1, marginLeft: 12 },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.3,
  },
  spec: { fontSize: 12, color: "#64748b", marginTop: 2, fontWeight: "500" },
  expBox: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 9,
    alignItems: "center",
    minWidth: 52,
    borderWidth: 1.5,
    borderColor: "#bfdbfe",
  },
  expNum: { color: "#1d4ed8", fontSize: 20, fontWeight: "900", lineHeight: 24 },
  expLbl: {
    color: "#3b82f6",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 1,
  },
  divider: { height: 1, backgroundColor: "#f1f5f9", marginBottom: 12 },
  grid: { flexDirection: "column", marginBottom: 4 },
  actions: { flexDirection: "row", gap: 10, marginTop: 4 },
  editBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  editTxt: { color: "#ffffff", fontWeight: "700", fontSize: 13 },
  delBtn: {
    flex: 1,
    backgroundColor: "#fff1f2",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#fecdd3",
  },
  delTxt: { color: "#e11d48", fontWeight: "700", fontSize: 13 },
});

/* ─── Main Screen ──────────────────────────────────────────────── */
export default function TrainerListScreen({ navigation }) {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/all`);
      setTrainers(res.data);
    } catch {
      Alert.alert("Error", "Failed to fetch trainers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      Alert.alert("Done", "Trainer removed successfully");
      fetchTrainers();
    } catch {
      Alert.alert("Error", "Could not delete trainer");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hSub}>MANAGEMENT PANEL</Text>
          <Text style={styles.hTitle}>Trainers</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeNum}>{trainers.length}</Text>
          <Text style={styles.badgeLbl}>Total</Text>
        </View>
      </View>

      {/* ── Body ── */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadTxt}>Loading trainers…</Text>
        </View>
      ) : trainers.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>🏋️</Text>
          <Text style={styles.emptyTitle}>No Trainers Yet</Text>
          <Text style={styles.emptySub}>
            Add your first trainer to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={trainers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TrainerCard
              item={item}
              onEdit={(t) =>
                navigation.navigate("TrainerScreen", { trainer: t })
              }
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f0f6ff" },

  header: {
    backgroundColor: "#ffffff",
    paddingTop: 16,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    shadowColor: "#94a3b8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  hSub: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: 3,
    marginBottom: 3,
  },
  hTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0f172a",
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: "#eff6ff",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 9,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#bfdbfe",
  },
  badgeNum: {
    color: "#1d4ed8",
    fontWeight: "900",
    fontSize: 22,
    lineHeight: 26,
  },
  badgeLbl: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
  },

  list: { padding: 16, paddingBottom: 48 },

  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  loadTxt: { color: "#64748b", fontSize: 13, fontWeight: "600", marginTop: 8 },
  emptyIcon: { fontSize: 56, marginBottom: 6 },
  emptyTitle: { color: "#0f172a", fontSize: 18, fontWeight: "800" },
  emptySub: { color: "#64748b", fontSize: 13, fontWeight: "500" },
});