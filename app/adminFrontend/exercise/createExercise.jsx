// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   FlatList,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// /* ============================= */
// /* BASE URL */
// /* ============================= */
// const BASE_URL =
//   Platform.OS === "android"
//     ? "http://192.168.1.5:5000/api/exercises"
//     : "http://localhost:5000/api/exercises";

// /* ── Difficulty color map ── */
// const DIFF_COLORS = {
//   beginner: { bg: "#E8F5E9", text: "#2E7D32" },
//   intermediate: { bg: "#FFF3E0", text: "#E65100" },
//   advanced: { bg: "#FCE4EC", text: "#C62828" },
// };

// const MUSCLE_ICONS = {
//   chest: "body-outline",
//   back: "body-outline",
//   legs: "walk-outline",
//   arms: "barbell-outline",
//   shoulders: "barbell-outline",
//   abs: "body-outline",
//   core: "body-outline",
//   default: "fitness-outline",
// };

// /* ── Thumbnail placeholder with gradient-like color ── */
// function Thumbnail({ name, muscleGroup, type }) {
//   const colors = [
//     ["#FF6B6B", "#FF8E53"],
//     ["#4E54C8", "#8F94FB"],
//     ["#11998E", "#38EF7D"],
//     ["#F7971E", "#FFD200"],
//     ["#C94B4B", "#4B134F"],
//     ["#0F2027", "#203A43"],
//   ];
//   const idx = (name?.charCodeAt(0) || 0) % colors.length;
//   const [c1, c2] = colors[idx];

//   const initials = name
//     ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
//     : "EX";

//   return (
//     <View style={[styles.thumbnail, { backgroundColor: c1 }]}>
//       <View style={[styles.thumbnailOverlay, { backgroundColor: c2 + "88" }]} />
//       <Text style={styles.thumbnailInitials}>{initials}</Text>
//       {type ? (
//         <View style={styles.typePill}>
//           <Text style={styles.typePillText}>{type}</Text>
//         </View>
//       ) : null}
//     </View>
//   );
// }

// /* ── YouTube-style Exercise Card ── */
// function ExerciseCard({ item, onEdit, onDelete, index }) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(30)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: index * 80, useNativeDriver: true }),
//       Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: index * 80, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const diff = item.difficultyLevel?.toLowerCase();
//   const diffStyle = DIFF_COLORS[diff] || { bg: "#F3F4F6", text: "#555" };

//   return (
//     <Animated.View style={[{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
//       <View style={styles.ytCard}>
//         {/* Thumbnail */}
//         <Thumbnail
//           name={item.exerciseName}
//           muscleGroup={item.muscleGroup}
//           type={item.exerciseType}
//         />

//         {/* Info below thumbnail */}
//         <View style={styles.ytCardBody}>
//           <View style={styles.ytCardTop}>
//             <View style={styles.ytAvatar}>
//               <Ionicons
//                 name={MUSCLE_ICONS[item.muscleGroup?.toLowerCase()] || MUSCLE_ICONS.default}
//                 size={16}
//                 color="#1565C0"
//               />
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.ytTitle} numberOfLines={2}>
//                 {item.exerciseName}
//               </Text>
//               <Text style={styles.ytMeta}>
//                 {item.muscleGroup}
//                 {item.equipmentRequired ? ` · ${item.equipmentRequired}` : ""}
//               </Text>
//             </View>

//             {/* 3-dot menu */}
//             <TouchableOpacity
//               style={styles.menuBtn}
//               onPress={() =>
//                 Alert.alert(item.exerciseName, "Choose action", [
//                   { text: "✏️ Edit", onPress: () => onEdit(item) },
//                   { text: "🗑️ Delete", style: "destructive", onPress: () => onDelete(item._id) },
//                   { text: "Cancel", style: "cancel" },
//                 ])
//               }
//             >
//               <Ionicons name="ellipsis-vertical" size={18} color="#999" />
//             </TouchableOpacity>
//           </View>

//           {/* Description */}
//           {item.shortDescription ? (
//             <Text style={styles.ytDesc} numberOfLines={2}>
//               {item.shortDescription}
//             </Text>
//           ) : null}

//           {/* Tags Row */}
//           <View style={styles.tagsRow}>
//             {item.difficultyLevel ? (
//               <View style={[styles.tag, { backgroundColor: diffStyle.bg }]}>
//                 <Text style={[styles.tagText, { color: diffStyle.text }]}>
//                   {item.difficultyLevel}
//                 </Text>
//               </View>
//             ) : null}
//             {item.muscleGroup ? (
//               <View style={[styles.tag, { backgroundColor: "#E3F2FD" }]}>
//                 <Text style={[styles.tagText, { color: "#1565C0" }]}>
//                   {item.muscleGroup}
//                 </Text>
//               </View>
//             ) : null}
//             {item.exerciseType ? (
//               <View style={[styles.tag, { backgroundColor: "#F3E5F5" }]}>
//                 <Text style={[styles.tagText, { color: "#6A1B9A" }]}>
//                   {item.exerciseType}
//                 </Text>
//               </View>
//             ) : null}
//           </View>
//         </View>
//       </View>
//     </Animated.View>
//   );
// }

// /* ── Form Field ── */
// function FormField({ label, value, onChange, placeholder, multiline }) {
//   const [focused, setFocused] = useState(false);
//   return (
//     <View style={styles.fieldWrapper}>
//       <Text style={styles.fieldLabel}>{label}</Text>
//       <TextInput
//         style={[styles.fieldInput, focused && styles.fieldInputFocused, multiline && { height: 80, textAlignVertical: "top" }]}
//         value={value}
//         onChangeText={onChange}
//         placeholder={placeholder || label}
//         placeholderTextColor="#BBBBBB"
//         multiline={multiline}
//         onFocus={() => setFocused(true)}
//         onBlur={() => setFocused(false)}
//       />
//     </View>
//   );
// }

// /* ── TAB BAR ── */
// function TabBar({ active, onSelect }) {
//   return (
//     <View style={styles.tabBar}>
//       {["view", "create"].map((tab) => (
//         <TouchableOpacity
//           key={tab}
//           style={[styles.tab, active === tab && styles.tabActive]}
//           onPress={() => onSelect(tab)}
//         >
//           <Ionicons
//             name={tab === "view" ? "play-circle-outline" : "add-circle-outline"}
//             size={18}
//             color={active === tab ? "#1565C0" : "#AAA"}
//             style={{ marginRight: 6 }}
//           />
//           <Text style={[styles.tabText, active === tab && styles.tabTextActive]}>
//             {tab === "view" ? "Exercises" : "Add New"}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

// /* ── MAIN SCREEN ── */
// export default function ExerciseScreen() {
//   const [tab, setTab] = useState("view");
//   const [exercises, setExercises] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState("");

//   const emptyForm = {
//     exerciseName: "",
//     video: "",
//     shortDescription: "",
//     muscleGroup: "",
//     equipmentRequired: "",
//     difficultyLevel: "",
//     exerciseType: "",
//   };
//   const [form, setForm] = useState(emptyForm);

//   const fetchExercises = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(BASE_URL);
//       setExercises(res.data);
//     } catch {
//       Alert.alert("Error", "Cannot connect to server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchExercises(); }, []);

//   const handleSubmit = async () => {
//     if (!form.exerciseName.trim()) {
//       Alert.alert("Required", "Exercise name is required");
//       return;
//     }
//     try {
//       if (editingId) {
//         await axios.put(`${BASE_URL}/${editingId}`, form);
//         setEditingId(null);
//         Alert.alert("✅ Updated", "Exercise updated successfully");
//       } else {
//         await axios.post(BASE_URL, form);
//         Alert.alert("✅ Added", "Exercise added successfully");
//       }
//       setForm(emptyForm);
//       fetchExercises();
//       setTab("view");
//     } catch {
//       Alert.alert("Error", "Something went wrong");
//     }
//   };

//   const deleteExercise = (id) => {
//     Alert.alert("Delete Exercise", "Are you sure?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete", style: "destructive",
//         onPress: async () => {
//           try {
//             await axios.delete(`${BASE_URL}/${id}`);
//             fetchExercises();
//           } catch {
//             Alert.alert("Error", "Delete failed");
//           }
//         },
//       },
//     ]);
//   };

//   const editExercise = (item) => {
//     setForm({
//       exerciseName: item.exerciseName || "",
//       video: item.video || "",
//       shortDescription: item.shortDescription || "",
//       muscleGroup: item.muscleGroup || "",
//       equipmentRequired: item.equipmentRequired || "",
//       difficultyLevel: item.difficultyLevel || "",
//       exerciseType: item.exerciseType || "",
//     });
//     setEditingId(item._id);
//     setTab("create");
//   };

//   const filtered = exercises.filter((e) =>
//     e.exerciseName?.toLowerCase().includes(search.toLowerCase()) ||
//     e.muscleGroup?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <View style={styles.screen}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.headerEyebrow}>💪 GYM PORTAL</Text>
//           <Text style={styles.headerTitle}>Exercise Library</Text>
//         </View>
//         <TouchableOpacity style={styles.refreshBtn} onPress={fetchExercises}>
//           <Ionicons name="refresh-outline" size={20} color="#1565C0" />
//         </TouchableOpacity>
//       </View>

//       {/* Tab Bar */}
//       <TabBar active={tab} onSelect={(t) => { setTab(t); if (t === "create" && !editingId) setForm(emptyForm); }} />

//       {/* ── VIEW TAB ── */}
//       {tab === "view" && (
//         <View style={{ flex: 1 }}>
//           {/* Search Bar */}
//           <View style={styles.searchBar}>
//             <Ionicons name="search-outline" size={18} color="#AAA" style={{ marginRight: 8 }} />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search exercises, muscles..."
//               placeholderTextColor="#CCC"
//               value={search}
//               onChangeText={setSearch}
//             />
//             {search.length > 0 && (
//               <TouchableOpacity onPress={() => setSearch("")}>
//                 <Ionicons name="close-circle" size={18} color="#CCC" />
//               </TouchableOpacity>
//             )}
//           </View>

//           {/* Count */}
//           <View style={styles.countRow}>
//             <Text style={styles.countText}>
//               {filtered.length} exercise{filtered.length !== 1 ? "s" : ""}
//             </Text>
//           </View>

//           {loading ? (
//             <View style={styles.loaderBox}>
//               <ActivityIndicator size="large" color="#1565C0" />
//               <Text style={styles.loaderText}>Loading exercises...</Text>
//             </View>
//           ) : filtered.length === 0 ? (
//             <View style={styles.emptyBox}>
//               <Ionicons name="barbell-outline" size={56} color="#DDD" />
//               <Text style={styles.emptyText}>No exercises found</Text>
//               <TouchableOpacity
//                 style={styles.emptyBtn}
//                 onPress={() => setTab("create")}
//               >
//                 <Text style={styles.emptyBtnText}>+ Add First Exercise</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <FlatList
//               data={filtered}
//               keyExtractor={(item) => item._id}
//               renderItem={({ item, index }) => (
//                 <ExerciseCard
//                   item={item}
//                   index={index}
//                   onEdit={editExercise}
//                   onDelete={deleteExercise}
//                 />
//               )}
//               contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 30 }}
//               showsVerticalScrollIndicator={false}
//             />
//           )}
//         </View>
//       )}

//       {/* ── CREATE / EDIT TAB ── */}
//       {tab === "create" && (
//         <ScrollView
//           style={{ flex: 1 }}
//           contentContainerStyle={styles.formContainer}
//           showsVerticalScrollIndicator={false}
//         >
//           {editingId && (
//             <View style={styles.editBanner}>
//               <Ionicons name="create-outline" size={16} color="#E65100" />
//               <Text style={styles.editBannerText}>Editing existing exercise</Text>
//               <TouchableOpacity onPress={() => { setEditingId(null); setForm(emptyForm); }}>
//                 <Text style={styles.editBannerCancel}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           <FormField label="Exercise Name *" value={form.exerciseName} onChange={(v) => setForm({ ...form, exerciseName: v })} />
//           <FormField label="Muscle Group" value={form.muscleGroup} onChange={(v) => setForm({ ...form, muscleGroup: v })} placeholder="e.g. Chest, Back, Legs" />
//           <FormField label="Difficulty Level" value={form.difficultyLevel} onChange={(v) => setForm({ ...form, difficultyLevel: v })} placeholder="Beginner / Intermediate / Advanced" />
//           <FormField label="Exercise Type" value={form.exerciseType} onChange={(v) => setForm({ ...form, exerciseType: v })} placeholder="e.g. Strength, Cardio, Flexibility" />
//           <FormField label="Equipment Required" value={form.equipmentRequired} onChange={(v) => setForm({ ...form, equipmentRequired: v })} placeholder="e.g. Dumbbells, Barbell, None" />
//           <FormField label="Video URL" value={form.video} onChange={(v) => setForm({ ...form, video: v })} placeholder="https://youtube.com/..." />
//           <FormField label="Short Description" value={form.shortDescription} onChange={(v) => setForm({ ...form, shortDescription: v })} placeholder="Brief description of the exercise..." multiline />

//           {/* Submit */}
//           <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
//             <Ionicons
//               name={editingId ? "checkmark-circle-outline" : "add-circle-outline"}
//               size={20}
//               color="white"
//               style={{ marginRight: 8 }}
//             />
//             <Text style={styles.submitBtnText}>
//               {editingId ? "Update Exercise" : "Add Exercise"}
//             </Text>
//           </TouchableOpacity>

//           {/* Reset */}
//           <TouchableOpacity
//             style={styles.resetBtn}
//             onPress={() => { setForm(emptyForm); setEditingId(null); }}
//           >
//             <Text style={styles.resetBtnText}>Clear Form</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       )}
//     </View>
//   );
// }

// /* ── STYLES ── */
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "#F8F9FB",
//   },

//   /* Header */
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 20,
//     paddingTop: 58,
//     paddingBottom: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEEEEE",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerEyebrow: {
//     color: "#1565C0",
//     fontSize: 10,
//     fontWeight: "800",
//     letterSpacing: 3,
//     fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
//     marginBottom: 3,
//   },
//   headerTitle: {
//     color: "#1A1A2E",
//     fontSize: 24,
//     fontWeight: "900",
//   },
//   refreshBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#E3F2FD",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   /* Tabs */
//   tabBar: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEEEEE",
//   },
//   tab: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 2,
//     borderBottomColor: "transparent",
//   },
//   tabActive: {
//     borderBottomColor: "#1565C0",
//   },
//   tabText: {
//     color: "#AAA",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   tabTextActive: {
//     color: "#1565C0",
//     fontWeight: "800",
//   },

//   /* Search */
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     marginHorizontal: 14,
//     marginTop: 12,
//     marginBottom: 4,
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 9,
//     borderWidth: 1,
//     borderColor: "#EEEEEE",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.04,
//     shadowRadius: 3,
//     elevation: 1,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 14,
//     color: "#333",
//   },

//   /* Count */
//   countRow: {
//     paddingHorizontal: 18,
//     paddingVertical: 6,
//   },
//   countText: {
//     color: "#AAA",
//     fontSize: 12,
//     fontWeight: "600",
//     letterSpacing: 0.5,
//   },

//   /* Loader / Empty */
//   loaderBox: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 12,
//     paddingBottom: 60,
//   },
//   loaderText: {
//     color: "#AAA",
//     fontSize: 13,
//     letterSpacing: 1,
//   },
//   emptyBox: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 12,
//     paddingBottom: 60,
//   },
//   emptyText: {
//     color: "#CCCCCC",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   emptyBtn: {
//     backgroundColor: "#1565C0",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginTop: 4,
//   },
//   emptyBtnText: {
//     color: "#FFF",
//     fontWeight: "700",
//     fontSize: 14,
//   },

//   /* ── YouTube-style card ── */
//   ytCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     marginBottom: 14,
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "#F0F0F0",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     elevation: 2,
//   },

//   /* Thumbnail */
//   thumbnail: {
//     height: 160,
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//   },
//   thumbnailOverlay: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   thumbnailInitials: {
//     color: "#FFFFFF",
//     fontSize: 52,
//     fontWeight: "900",
//     letterSpacing: -2,
//     opacity: 0.9,
//   },
//   typePill: {
//     position: "absolute",
//     bottom: 10,
//     right: 10,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 4,
//   },
//   typePillText: {
//     color: "#FFFFFF",
//     fontSize: 11,
//     fontWeight: "700",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },

//   /* Card body */
//   ytCardBody: {
//     padding: 12,
//   },
//   ytCardTop: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 6,
//   },
//   ytAvatar: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: "#E3F2FD",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//     marginTop: 1,
//   },
//   ytTitle: {
//     color: "#1A1A2E",
//     fontSize: 15,
//     fontWeight: "800",
//     lineHeight: 20,
//     flex: 1,
//   },
//   ytMeta: {
//     color: "#999",
//     fontSize: 12,
//     marginTop: 2,
//     fontWeight: "500",
//   },
//   menuBtn: {
//     padding: 4,
//     marginLeft: 4,
//   },
//   ytDesc: {
//     color: "#888",
//     fontSize: 12,
//     lineHeight: 17,
//     marginBottom: 8,
//   },

//   /* Tags */
//   tagsRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 6,
//   },
//   tag: {
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 20,
//   },
//   tagText: {
//     fontSize: 11,
//     fontWeight: "700",
//     textTransform: "capitalize",
//   },

//   /* Form */
//   formContainer: {
//     padding: 18,
//     paddingBottom: 40,
//   },
//   editBanner: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFF3E0",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 16,
//     gap: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: "#E65100",
//   },
//   editBannerText: {
//     flex: 1,
//     color: "#E65100",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   editBannerCancel: {
//     color: "#C62828",
//     fontSize: 13,
//     fontWeight: "700",
//   },
//   fieldWrapper: {
//     marginBottom: 14,
//   },
//   fieldLabel: {
//     color: "#555",
//     fontSize: 12,
//     fontWeight: "700",
//     marginBottom: 5,
//     letterSpacing: 0.5,
//     textTransform: "uppercase",
//   },
//   fieldInput: {
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1.5,
//     borderColor: "#E8E8E8",
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 11,
//     fontSize: 14,
//     color: "#1A1A2E",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.03,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   fieldInputFocused: {
//     borderColor: "#1565C0",
//     shadowColor: "#1565C0",
//     shadowOpacity: 0.12,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   submitBtn: {
//     backgroundColor: "#1565C0",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 15,
//     borderRadius: 12,
//     marginTop: 6,
//     shadowColor: "#1565C0",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   submitBtnText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "800",
//     letterSpacing: 0.5,
//   },
//   resetBtn: {
//     alignItems: "center",
//     padding: 12,
//     marginTop: 8,
//   },
//   resetBtnText: {
//     color: "#BBBBBB",
//     fontSize: 13,
//     fontWeight: "600",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
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

/* ── Single form field ── */
function FormField({ label, value, onChange, placeholder, multiline, icon }) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.inputRow, focused && styles.inputRowFocused]}>
        {icon && (
          <Ionicons
            name={icon}
            size={16}
            color={focused ? "#1565C0" : "#BBBBBB"}
            style={styles.inputIcon}
          />
        )}
        <TextInput
          style={[
            styles.fieldInput,
            multiline && { height: 90, textAlignVertical: "top" },
          ]}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder || label}
          placeholderTextColor="#CCCCCC"
          multiline={multiline}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
}

/* ── MAIN SCREEN ── */
export default function ExerciseFormScreen({ route, navigation }) {
  // If editing, item is passed via route.params
  const editItem = route?.params?.item || null;

  const emptyForm = {
    exerciseName: "",
    video: "",
    shortDescription: "",
    muscleGroup: "",
    equipmentRequired: "",
    difficultyLevel: "",
    exerciseType: "",
  };

  const [form, setForm] = useState(
    editItem
      ? {
          exerciseName: editItem.exerciseName || "",
          video: editItem.video || "",
          shortDescription: editItem.shortDescription || "",
          muscleGroup: editItem.muscleGroup || "",
          equipmentRequired: editItem.equipmentRequired || "",
          difficultyLevel: editItem.difficultyLevel || "",
          exerciseType: editItem.exerciseType || "",
        }
      : emptyForm,
  );

  const isEditing = !!editItem;

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async () => {
    if (!form.exerciseName.trim()) {
      Alert.alert("Required", "Exercise name cannot be empty");
      return;
    }
    try {
      if (isEditing) {
        await axios.put(`${BASE_URL}/${editItem._id}`, form);
        Alert.alert("✅ Updated", "Exercise updated successfully!", [
          { text: "OK", onPress: () => navigation?.goBack() },
        ]);
      } else {
        await axios.post(BASE_URL, form);
        Alert.alert("✅ Added", "Exercise added successfully!", [
          { text: "Add Another", onPress: () => setForm(emptyForm) },
          { text: "Go Back", onPress: () => navigation?.goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Check server connection.");
    }
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={22} color="#1565C0" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerEyebrow}>💪 GYM PORTAL</Text>
          <Text style={styles.headerTitle}>
            {isEditing ? "Edit Exercise" : "New Exercise"}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Edit banner */}
        {isEditing && (
          <View style={styles.editBanner}>
            <Ionicons name="create-outline" size={16} color="#E65100" />
            <Text style={styles.editBannerText}>
              Editing: {editItem.exerciseName}
            </Text>
          </View>
        )}

        {/* Section: Basic Info */}
        <Text style={styles.sectionHeading}>Basic Info</Text>

        <FormField
          label="Exercise Name *"
          value={form.exerciseName}
          onChange={(v) => update("exerciseName", v)}
          placeholder="e.g. Barbell Bench Press"
          icon="barbell-outline"
        />
        <FormField
          label="Muscle Group"
          value={form.muscleGroup}
          onChange={(v) => update("muscleGroup", v)}
          placeholder="e.g. Chest, Back, Legs"
          icon="body-outline"
        />
        <FormField
          label="Exercise Type"
          value={form.exerciseType}
          onChange={(v) => update("exerciseType", v)}
          placeholder="e.g. Strength, Cardio, Flexibility"
          icon="fitness-outline"
        />

        {/* Section: Details */}
        <Text style={styles.sectionHeading}>Details</Text>

        <FormField
          label="Difficulty Level"
          value={form.difficultyLevel}
          onChange={(v) => update("difficultyLevel", v)}
          placeholder="Beginner / Intermediate / Advanced"
          icon="stats-chart-outline"
        />
        <FormField
          label="Equipment Required"
          value={form.equipmentRequired}
          onChange={(v) => update("equipmentRequired", v)}
          placeholder="e.g. Dumbbells, Barbell, None"
          icon="construct-outline"
        />
        <FormField
          label="Video URL"
          value={form.video}
          onChange={(v) => update("video", v)}
          placeholder="https://youtube.com/..."
          icon="logo-youtube"
        />

        {/* Section: Description */}
        <Text style={styles.sectionHeading}>Description</Text>

        <FormField
          label="Short Description"
          value={form.shortDescription}
          onChange={(v) => update("shortDescription", v)}
          placeholder="Brief description of the exercise..."
          multiline
          icon="document-text-outline"
        />

        {/* Buttons */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Ionicons
            name={isEditing ? "checkmark-circle-outline" : "add-circle-outline"}
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.submitBtnText}>
            {isEditing ? "Update Exercise" : "Add Exercise"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            if (!isEditing) setForm(emptyForm);
            else navigation?.goBack();
          }}
        >
          <Text style={styles.clearBtnText}>
            {isEditing ? "Cancel" : "Clear Form"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 22,
    fontWeight: "900",
  },

  /* Form */
  formContainer: {
    padding: 18,
    paddingBottom: 50,
  },
  editBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    gap: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#E65100",
  },
  editBannerText: {
    flex: 1,
    color: "#E65100",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionHeading: {
    color: "#1565C0",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
    marginTop: 6,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    borderBottomWidth: 1,
    borderBottomColor: "#E3F2FD",
    paddingBottom: 6,
  },
  fieldWrapper: {
    marginBottom: 14,
  },
  fieldLabel: {
    color: "#555",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  inputRowFocused: {
    borderColor: "#1565C0",
    shadowColor: "#1565C0",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 8,
  },
  fieldInput: {
    flex: 1,
    paddingVertical: 11,
    fontSize: 14,
    color: "#1A1A2E",
  },

  /* Buttons */
  submitBtn: {
    backgroundColor: "#1565C0",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#1565C0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  clearBtn: {
    alignItems: "center",
    padding: 14,
    marginTop: 4,
  },
  clearBtnText: {
    color: "#BBBBBB",
    fontSize: 13,
    fontWeight: "600",
  },
});
