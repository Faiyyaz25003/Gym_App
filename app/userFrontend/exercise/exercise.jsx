import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* ============================= */
/* BASE URL — change IP if Android */
/* ============================= */
const BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.1.5:5000/api/exercises"
    : "http://localhost:5000/api/exercises";

/* ── Constants ── */
const DIFF_COLORS = {
  beginner: { bg: "#E8F5E9", text: "#2E7D32" },
  intermediate: { bg: "#FFF3E0", text: "#E65100" },
  advanced: { bg: "#FCE4EC", text: "#C62828" },
};

const MUSCLE_ICONS = {
  chest: "body-outline",
  back: "body-outline",
  legs: "walk-outline",
  arms: "barbell-outline",
  shoulders: "barbell-outline",
  abs: "body-outline",
  core: "body-outline",
  default: "fitness-outline",
};

const THUMB_COLORS = [
  ["#FF6B6B", "#FF8E53"],
  ["#4E54C8", "#8F94FB"],
  ["#11998E", "#38EF7D"],
  ["#F7971E", "#FFD200"],
  ["#C94B4B", "#4B134F"],
  ["#1A1A2E", "#16213E"],
];

/* ── Thumbnail ── */
function Thumbnail({ name, type }) {
  const idx = (name?.charCodeAt(0) || 0) % THUMB_COLORS.length;
  const [c1, c2] = THUMB_COLORS[idx];
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "EX";

  return (
    <View style={[styles.thumbnail, { backgroundColor: c1 }]}>
      <View style={[styles.thumbnailOverlay, { backgroundColor: c2 + "88" }]} />
      <Text style={styles.thumbnailInitials}>{initials}</Text>
      {type ? (
        <View style={styles.typePill}>
          <Text style={styles.typePillText}>{type}</Text>
        </View>
      ) : null}
    </View>
  );
}

/* ── Exercise Card ── */
function ExerciseCard({ item, index, onEdit, onDelete }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 70,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const diff = item.difficultyLevel?.toLowerCase();
  const diffStyle = DIFF_COLORS[diff] || { bg: "#F3F4F6", text: "#777" };
  const muscleIcon =
    MUSCLE_ICONS[item.muscleGroup?.toLowerCase()] || MUSCLE_ICONS.default;

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <View style={styles.card}>
        {/* Thumbnail */}
        <Thumbnail name={item.exerciseName} type={item.exerciseType} />

        {/* Body */}
        <View style={styles.cardBody}>
          {/* Top row */}
          <View style={styles.cardTop}>
            <View style={styles.avatar}>
              <Ionicons name={muscleIcon} size={16} color="#1565C0" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.exerciseName}
              </Text>
              <Text style={styles.cardMeta}>
                {item.muscleGroup}
                {item.equipmentRequired ? ` · ${item.equipmentRequired}` : ""}
              </Text>
            </View>

            {/* 3-dot menu */}
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() =>
                Alert.alert(item.exerciseName, "Choose action", [
                  { text: "✏️ Edit", onPress: () => onEdit(item) },
                  {
                    text: "🗑️ Delete",
                    style: "destructive",
                    onPress: () => onDelete(item._id),
                  },
                  { text: "Cancel", style: "cancel" },
                ])
              }
            >
              <Ionicons name="ellipsis-vertical" size={18} color="#BBBBBB" />
            </TouchableOpacity>
          </View>

          {/* Description */}
          {item.shortDescription ? (
            <Text style={styles.cardDesc} numberOfLines={2}>
              {item.shortDescription}
            </Text>
          ) : null}

          {/* Tags */}
          <View style={styles.tagsRow}>
            {item.difficultyLevel ? (
              <View style={[styles.tag, { backgroundColor: diffStyle.bg }]}>
                <Text style={[styles.tagText, { color: diffStyle.text }]}>
                  {item.difficultyLevel}
                </Text>
              </View>
            ) : null}
            {item.muscleGroup ? (
              <View style={[styles.tag, { backgroundColor: "#E3F2FD" }]}>
                <Text style={[styles.tagText, { color: "#1565C0" }]}>
                  {item.muscleGroup}
                </Text>
              </View>
            ) : null}
            {item.exerciseType ? (
              <View style={[styles.tag, { backgroundColor: "#F3E5F5" }]}>
                <Text style={[styles.tagText, { color: "#6A1B9A" }]}>
                  {item.exerciseType}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

/* ── MAIN SCREEN ── */
export default function ExerciseViewScreen({ navigation }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchExercises = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      setExercises(res.data);
    } catch {
      Alert.alert("Error", "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExercises();
    // Refresh when navigating back to this screen
    const unsubscribe = navigation?.addListener("focus", fetchExercises);
    return unsubscribe;
  }, [fetchExercises, navigation]);

  const deleteExercise = (id) => {
    Alert.alert("Delete Exercise", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${BASE_URL}/${id}`);
            fetchExercises();
          } catch {
            Alert.alert("Error", "Delete failed");
          }
        },
      },
    ]);
  };

  const handleEdit = (item) => {
    // Navigate to form screen passing item for editing
    navigation?.navigate("ExerciseForm", { item });
  };

  const handleAdd = () => {
    navigation?.navigate("ExerciseForm");
  };

  const filtered = exercises.filter(
    (e) =>
      e.exerciseName?.toLowerCase().includes(search.toLowerCase()) ||
      e.muscleGroup?.toLowerCase().includes(search.toLowerCase()) ||
      e.exerciseType?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerEyebrow}>💪 GYM PORTAL</Text>
          <Text style={styles.headerTitle}>Exercise Library</Text>
        </View>
        <TouchableOpacity style={styles.refreshBtn} onPress={fetchExercises}>
          <Ionicons name="refresh-outline" size={20} color="#1565C0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons
          name="search-outline"
          size={18}
          color="#BBBBBB"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, muscle, type..."
          placeholderTextColor="#CCCCCC"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color="#CCCCCC" />
          </TouchableOpacity>
        )}
      </View>

      {/* Count row */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>
          {filtered.length} exercise{filtered.length !== 1 ? "s" : ""}
          {search.length > 0 ? ` for "${search}"` : ""}
        </Text>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#1565C0" />
          <Text style={styles.loadingText}>Loading exercises...</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.centerBox}>
          <Ionicons name="barbell-outline" size={60} color="#DDDDDD" />
          <Text style={styles.emptyTitle}>
            {search ? "No results found" : "No exercises yet"}
          </Text>
          <Text style={styles.emptySubtitle}>
            {search ? "Try a different keyword" : "Add your first exercise"}
          </Text>
          {!search && (
            <TouchableOpacity style={styles.emptyAddBtn} onPress={handleAdd}>
              <Ionicons
                name="add-circle-outline"
                size={18}
                color="#FFF"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.emptyAddBtnText}>Add Exercise</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <ExerciseCard
              item={item}
              index={index}
              onEdit={handleEdit}
              onDelete={deleteExercise}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Add Button */}
      {exercises.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAdd}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

/* ── STYLES ── */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 58,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    gap: 10,
  },
  headerEyebrow: {
    color: "#1565C0",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    marginBottom: 2,
  },
  headerTitle: {
    color: "#1A1A2E",
    fontSize: 24,
    fontWeight: "900",
  },
  refreshBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1565C0",
    justifyContent: "center",
    alignItems: "center",
  },

  /* Search */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 14,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  /* Count */
  countRow: {
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  countText: {
    color: "#AAAAAA",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Center (loader / empty) */
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingBottom: 60,
  },
  loadingText: {
    color: "#AAAAAA",
    fontSize: 13,
    letterSpacing: 1,
  },
  emptyTitle: {
    color: "#CCCCCC",
    fontSize: 18,
    fontWeight: "800",
  },
  emptySubtitle: {
    color: "#DDDDDD",
    fontSize: 13,
  },
  emptyAddBtn: {
    backgroundColor: "#1565C0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 10,
    marginTop: 6,
    shadowColor: "#1565C0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  emptyAddBtnText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 14,
  },

  /* List */
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 90,
  },

  /* Card */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  /* Thumbnail */
  thumbnail: {
    height: 155,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  thumbnailInitials: {
    color: "#FFFFFF",
    fontSize: 54,
    fontWeight: "900",
    letterSpacing: -2,
    opacity: 0.85,
  },
  typePill: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  typePillText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  /* Card body */
  cardBody: {
    padding: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 1,
  },
  cardTitle: {
    color: "#1A1A2E",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20,
  },
  cardMeta: {
    color: "#AAAAAA",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  menuBtn: {
    padding: 4,
    marginLeft: 4,
  },
  cardDesc: {
    color: "#999",
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 8,
  },

  /* Tags */
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  /* FAB */
  fab: {
    position: "absolute",
    bottom: 28,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1565C0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1565C0",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
});
