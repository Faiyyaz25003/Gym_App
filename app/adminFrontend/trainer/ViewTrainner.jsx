// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import {
// //   ActivityIndicator,
// //   Alert,
// //   FlatList,
// //   Image,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";

// // const BASE_URL = "http://localhost:5000/api/trainers";
// // const IMAGE_URL = "http://localhost:5000/uploads/";

// // const InfoRow = ({ icon, label, value }) => (
// //   <View style={styles.infoRow}>
// //     <Text style={styles.infoIcon}>{icon}</Text>
// //     <Text style={styles.infoLabel}>{label}</Text>
// //     <Text style={styles.infoValue}>{value}</Text>
// //   </View>
// // );

// // export default function TrainerListScreen({ navigation }) {
// //   const [trainers, setTrainers] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchTrainers = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(`${BASE_URL}/all`);
// //       setTrainers(res.data);
// //     } catch (error) {
// //       console.log(error);
// //       Alert.alert("Error", "Failed to fetch trainers");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTrainers();
// //   }, []);

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`${BASE_URL}/delete/${id}`);
// //       Alert.alert("Deleted", "Trainer deleted successfully");
// //       fetchTrainers();
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to delete trainer");
// //     }
// //   };

// //   const handleEdit = (trainer) => {
// //     navigation.navigate("TrainerScreen", { trainer });
// //   };

// //   // ✅ FIX 1: Corrected broken hex color "#059669"
// //   const getStatusConfig = (status) => {
// //     if (!status) return { color: "#94a3b8", bg: "#f1f5f9", label: "Unknown" };
// //     const s = status.toLowerCase();
// //     if (s === "active")
// //       return { color: "#059669", bg: "#d1fae5", label: "Active" };
// //     if (s === "inactive")
// //       return { color: "#dc2626", bg: "#fee2e2", label: "Inactive" };
// //     return { color: "#d97706", bg: "#fef3c7", label: status };
// //   };

// //   const renderItem = ({ item }) => {
// //     const statusConfig = getStatusConfig(item.status);

// //     return (
// //       <View style={styles.card}>
// //         {/* Top accent bar */}
// //         <View style={styles.cardAccent} />

// //         {/* Card Header */}
// //         <View style={styles.cardHeader}>
// //           {item.photo ? (
// //             <Image
// //               source={{ uri: IMAGE_URL + item.photo }}
// //               style={styles.avatar}
// //             />
// //           ) : (
// //             <View style={styles.avatarPlaceholder}>
// //               <Text style={styles.avatarInitial}>
// //                 {item.fullName?.charAt(0)?.toUpperCase() || "T"}
// //               </Text>
// //             </View>
// //           )}

// //           <View style={styles.headerInfo}>
// //             <Text style={styles.name}>{item.fullName}</Text>

// //             {/* ✅ FIX 2: Removed stray comma after specialization text */}
// //             <Text style={styles.specialization}>{item.specialization}</Text>

// //             <View
// //               style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}
// //             >
// //               <View
// //                 style={[
// //                   styles.statusDot,
// //                   { backgroundColor: statusConfig.color },
// //                 ]}
// //               />
// //               <Text style={[styles.statusText, { color: statusConfig.color }]}>
// //                 {statusConfig.label}
// //               </Text>
// //             </View>
// //           </View>

// //           <View style={styles.expBadge}>
// //             <Text style={styles.expNumber}>{item.experience}</Text>
// //             <Text style={styles.expLabel}>YRS EXP</Text>
// //           </View>
// //         </View>

// //         {/* Info Section */}
// //         <View style={styles.infoSection}>
// //           <View style={styles.infoColumn}>
// //             <InfoRow icon="📱" label="Mobile" value={item.mobile} />
// //             <InfoRow icon="✉️" label="Email" value={item.email} />
// //             <InfoRow icon="🏅" label="Cert." value={item.certification} />
// //           </View>
// //           <View style={styles.infoDividerVertical} />
// //           <View style={styles.infoColumn}>
// //             <InfoRow icon="🕐" label="Shift" value={item.shiftTiming} />
// //             <InfoRow icon="💰" label="Salary" value={`₹${item.salary}`} />
// //             <InfoRow
// //               icon="📅"
// //               label="Joined"
// //               value={new Date(item.joiningDate).toLocaleDateString("en-IN", {
// //                 day: "numeric",
// //                 month: "short",
// //                 year: "numeric",
// //               })}
// //             />
// //           </View>
// //         </View>

// //         {/* Action Buttons */}
// //         <View style={styles.buttonRow}>
// //           <TouchableOpacity
// //             style={styles.editBtn}
// //             onPress={() => handleEdit(item)}
// //             activeOpacity={0.75}
// //           >
// //             <Text style={styles.editBtnText}>✏️ Edit Trainer</Text>
// //           </TouchableOpacity>

// //           {/* ✅ FIX 3: Removed stray leading comma from "Delete Trainer" */}
// //           <TouchableOpacity
// //             style={styles.deleteBtn}
// //             activeOpacity={0.75}
// //             onPress={() =>
// //               Alert.alert(
// //                 "Delete Trainer",
// //                 `Are you sure you want to remove ${item.fullName}?`,
// //                 [
// //                   { text: "Cancel", style: "cancel" },
// //                   {
// //                     text: "Delete",
// //                     style: "destructive",
// //                     onPress: () => handleDelete(item._id),
// //                   },
// //                 ],
// //               )
// //             }
// //           >
// //             <Text style={styles.deleteBtnText}>🗑️ Delete</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     );
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle="light-content" backgroundColor="#0a0f1e" />

// //       {/* Header */}
// //       <View style={styles.header}>
// //         <View>
// //           <Text style={styles.headerSubtitle}>MANAGEMENT PANEL</Text>
// //           <Text style={styles.headerTitle}>Trainers</Text>
// //         </View>
// //         <View style={styles.countBadge}>
// //           <Text style={styles.countNumber}>{trainers.length}</Text>
// //           <Text style={styles.countLabel}>Total</Text>
// //         </View>
// //       </View>

// //       {loading ? (
// //         <View style={styles.loaderContainer}>
// //           <ActivityIndicator size="large" color="#3b82f6" />
// //           <Text style={styles.loaderText}>Fetching trainers...</Text>
// //         </View>
// //       ) : trainers.length === 0 ? (
// //         <View style={styles.emptyContainer}>
// //           <Text style={styles.emptyIcon}>🏋️</Text>
// //           <Text style={styles.emptyTitle}>No Trainers Found</Text>
// //           <Text style={styles.emptySubtitle}>
// //             Add your first trainer to get started
// //           </Text>
// //         </View>
// //       ) : (
// //         <FlatList
// //           data={trainers}
// //           keyExtractor={(item) => item._id}
// //           renderItem={renderItem}
// //           contentContainerStyle={styles.list}
// //           showsVerticalScrollIndicator={false}
// //         />
// //       )}
// //     </View>
// //   );
// // }

// // // ✅ FIX 4: All broken style properties corrected (width, height, fontWeight,
// // //           backgroundColor, letterSpacing, etc. — removed stray commas & line splits)
// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: "#f0f4f8" },

// //   // ── Header ──────────────────────────────────────────────
// //   header: {
// //     backgroundColor: "#0a0f1e",
// //     paddingTop: 54,
// //     paddingBottom: 26,
// //     paddingHorizontal: 22,
// //     flexDirection: "row",
// //     alignItems: "flex-end",
// //     justifyContent: "space-between",
// //     elevation: 10,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 5 },
// //     shadowOpacity: 0.4,
// //     shadowRadius: 10,
// //   },
// //   headerSubtitle: {
// //     fontSize: 10,
// //     fontWeight: "700",
// //     color: "#3b82f6",
// //     letterSpacing: 3,
// //     marginBottom: 4,
// //   },
// //   headerTitle: {
// //     fontSize: 32,
// //     fontWeight: "800",
// //     color: "#f8fafc",
// //     letterSpacing: -0.5,
// //   },
// //   countBadge: {
// //     backgroundColor: "#1e293b",
// //     borderRadius: 16,
// //     paddingHorizontal: 18,
// //     paddingVertical: 10,
// //     alignItems: "center",
// //     borderWidth: 1,
// //     borderColor: "#334155",
// //   },
// //   countNumber: {
// //     color: "#3b82f6",
// //     fontWeight: "800",
// //     fontSize: 24,
// //     lineHeight: 28,
// //   },
// //   countLabel: {
// //     color: "#64748b",
// //     fontSize: 10,
// //     fontWeight: "600",
// //     letterSpacing: 1,
// //     marginTop: 1,
// //   },

// //   list: { padding: 16, paddingBottom: 40 },

// //   // ── Card ────────────────────────────────────────────────
// //   card: {
// //     backgroundColor: "#ffffff",
// //     borderRadius: 20,
// //     marginBottom: 18,
// //     overflow: "hidden",
// //     elevation: 4,
// //     shadowColor: "#64748b",
// //     shadowOffset: { width: 0, height: 3 },
// //     shadowOpacity: 0.15,
// //     shadowRadius: 10,
// //   },
// //   cardAccent: {
// //     height: 4,
// //     backgroundColor: "#3b82f6",
// //   },

// //   // ── Card Header ─────────────────────────────────────────
// //   cardHeader: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 18,
// //     paddingBottom: 14,
// //   },
// //   // ✅ FIX: width and height were split across lines — now correct
// //   avatar: {
// //     width: 66,
// //     height: 66,
// //     borderRadius: 33,
// //     borderWidth: 2.5,
// //     borderColor: "#3b82f6",
// //   },
// //   avatarPlaceholder: {
// //     width: 66,
// //     height: 66,
// //     borderRadius: 33,
// //     backgroundColor: "#1e3a5f",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     borderWidth: 2.5,
// //     borderColor: "#3b82f6",
// //   },
// //   avatarInitial: { color: "#fff", fontSize: 26, fontWeight: "800" },
// //   headerInfo: { flex: 1, marginLeft: 14 },
// //   name: {
// //     fontSize: 17,
// //     fontWeight: "800",
// //     color: "#0f172a",
// //     letterSpacing: -0.2,
// //   },
// //   // ✅ FIX: fontWeight was split and had stray comma — now correct
// //   specialization: {
// //     fontSize: 13,
// //     color: "#64748b",
// //     marginTop: 2,
// //     fontWeight: "500",
// //   },
// //   statusBadge: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginTop: 7,
// //     paddingHorizontal: 10,
// //     paddingVertical: 4,
// //     borderRadius: 20,
// //     alignSelf: "flex-start",
// //   },
// //   statusDot: { width: 7, height: 7, borderRadius: 4, marginRight: 5 },
// //   statusText: { fontSize: 11, fontWeight: "700", letterSpacing: 0.3 },
// //   expBadge: {
// //     backgroundColor: "#0f172a",
// //     borderRadius: 14,
// //     paddingHorizontal: 12,
// //     paddingVertical: 10,
// //     alignItems: "center",
// //     minWidth: 58,
// //   },
// //   expNumber: {
// //     color: "#f8fafc",
// //     fontSize: 22,
// //     fontWeight: "900",
// //     lineHeight: 26,
// //   },
// //   expLabel: {
// //     color: "#3b82f6",
// //     fontSize: 9,
// //     fontWeight: "700",
// //     letterSpacing: 1,
// //     marginTop: 1,
// //   },

// //   // ── Info Section ────────────────────────────────────────
// //   infoSection: {
// //     flexDirection: "row",
// //     paddingHorizontal: 16,
// //     paddingVertical: 14,
// //     backgroundColor: "#f8fafc",
// //     borderTopWidth: 1,
// //     borderTopColor: "#e2e8f0",
// //   },
// //   infoColumn: { flex: 1, gap: 9 },
// //   // ✅ FIX: backgroundColor was split ("backgroundCo\n   lor") — now correct
// //   infoDividerVertical: {
// //     width: 1,
// //     backgroundColor: "#e2e8f0",
// //     marginHorizontal: 14,
// //   },
// //   infoRow: { flexDirection: "row", alignItems: "center" },
// //   infoIcon: { fontSize: 13, width: 22 },
// //   // ✅ FIX: letterSpacing had stray newline — now correct
// //   infoLabel: {
// //     fontSize: 11,
// //     color: "#94a3b8",
// //     fontWeight: "700",
// //     width: 46,
// //     letterSpacing: 0.3,
// //   },
// //   infoValue: { flex: 1, fontSize: 12, color: "#1e293b", fontWeight: "600" },

// //   // ── Buttons ─────────────────────────────────────────────
// //   buttonRow: {
// //     flexDirection: "row",
// //     padding: 14,
// //     gap: 10,
// //     backgroundColor: "#ffffff",
// //     borderTopWidth: 1,
// //     borderTopColor: "#f1f5f9",
// //   },
// //   editBtn: {
// //     flex: 1,
// //     backgroundColor: "#eff6ff",
// //     paddingVertical: 13,
// //     borderRadius: 13,
// //     alignItems: "center",
// //     borderWidth: 1.5,
// //     borderColor: "#bfdbfe",
// //   },
// //   editBtnText: {
// //     fontWeight: "700",
// //     color: "#1d4ed8",
// //     fontSize: 13,
// //     letterSpacing: 0.2,
// //   },
// //   deleteBtn: {
// //     flex: 1,
// //     backgroundColor: "#fff1f2",
// //     paddingVertical: 13,
// //     borderRadius: 13,
// //     alignItems: "center",
// //     borderWidth: 1.5,
// //     borderColor: "#fecdd3",
// //   },
// //   deleteBtnText: {
// //     fontWeight: "700",
// //     color: "#be123c",
// //     fontSize: 13,
// //     letterSpacing: 0.2,
// //   },

// //   // ── Loader / Empty ──────────────────────────────────────
// //   loaderContainer: {
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: 12,
// //   },
// //   loaderText: { color: "#64748b", fontSize: 14, fontWeight: "600" },
// //   emptyContainer: {
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: 8,
// //   },
// //   emptyIcon: { fontSize: 60, marginBottom: 8 },
// //   emptyTitle: { color: "#334155", fontSize: 18, fontWeight: "700" },
// //   emptySubtitle: { color: "#94a3b8", fontSize: 13, fontWeight: "500" },
// // });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   StatusBar,
//   ActivityIndicator,
//   SafeAreaView,
// } from "react-native";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/trainers";
// const IMAGE_URL = "http://localhost:5000/uploads/";

// /* ─── Status Pill ──────────────────────────────────────────────── */
// const StatusPill = ({ status }) => {
//   const cfg = (() => {
//     const s = (status || "").toLowerCase();
//     if (s === "active")
//       return {
//         label: "Active",
//         fg: "#16a34a",
//         bg: "#dcfce7",
//         border: "#bbf7d0",
//       };
//     if (s === "inactive")
//       return {
//         label: "Inactive",
//         fg: "#dc2626",
//         bg: "#fee2e2",
//         border: "#fecaca",
//       };
//     return {
//       label: "Unknown",
//       fg: "#64748b",
//       bg: "#f1f5f9",
//       border: "#e2e8f0",
//     };
//   })();

//   return (
//     <View
//       style={[
//         s_pill.wrap,
//         { backgroundColor: cfg.bg, borderColor: cfg.border },
//       ]}
//     >
//       <View style={[s_pill.dot, { backgroundColor: cfg.fg }]} />
//       <Text style={[s_pill.text, { color: cfg.fg }]}>{cfg.label}</Text>
//     </View>
//   );
// };

// const s_pill = StyleSheet.create({
//   wrap: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "flex-start",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//     borderWidth: 1,
//     marginTop: 6,
//   },
//   dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
//   text: { fontSize: 11, fontWeight: "700", letterSpacing: 0.3 },
// });

// /* ─── Info Chip ────────────────────────────────────────────────── */
// const Chip = ({ icon, label, value }) => (
//   <View style={s_chip.wrap}>
//     <Text style={s_chip.icon}>{icon}</Text>
//     <View>
//       <Text style={s_chip.label}>{label}</Text>
//       <Text style={s_chip.val} numberOfLines={1}>
//         {value}
//       </Text>
//     </View>
//   </View>
// );

// const s_chip = StyleSheet.create({
//   wrap: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f8fafc",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     marginRight: 8,
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//     minWidth: "44%",
//     flex: 1,
//   },
//   icon: { fontSize: 16, marginRight: 8 },
//   label: {
//     fontSize: 9,
//     color: "#94a3b8",
//     fontWeight: "700",
//     letterSpacing: 0.5,
//     textTransform: "uppercase",
//   },
//   val: {
//     fontSize: 12,
//     color: "#1e293b",
//     fontWeight: "600",
//     marginTop: 1,
//     maxWidth: 120,
//   },
// });

// /* ─── Trainer Card ─────────────────────────────────────────────── */
// const TrainerCard = ({ item, onEdit, onDelete }) => {
//   const initial = item.fullName?.charAt(0)?.toUpperCase() || "T";
//   const joined = new Date(item.joiningDate).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <View style={s_card.outer}>
//       {/* Left accent bar */}
//       <View style={s_card.accentBar} />

//       <View style={s_card.inner}>
//         {/* ── Header ── */}
//         <View style={s_card.header}>
//           {item.photo ? (
//             <Image
//               source={{ uri: IMAGE_URL + item.photo }}
//               style={s_card.avatar}
//             />
//           ) : (
//             <View style={s_card.avatarFallback}>
//               <Text style={s_card.avatarInitial}>{initial}</Text>
//             </View>
//           )}

//           <View style={s_card.meta}>
//             <Text style={s_card.name} numberOfLines={1}>
//               {item.fullName}
//             </Text>
//             <Text style={s_card.spec} numberOfLines={1}>
//               {item.specialization}
//             </Text>
//             <StatusPill status={item.status} />
//           </View>

//           <View style={s_card.expBox}>
//             <Text style={s_card.expNum}>{item.experience}</Text>
//             <Text style={s_card.expLbl}>YRS</Text>
//           </View>
//         </View>

//         {/* ── Divider ── */}
//         <View style={s_card.divider} />

//         {/* ── Info Grid ── */}
//         <View style={s_card.grid}>
//           <Chip icon="📱" label="Mobile" value={item.mobile} />
//           <Chip icon="✉️" label="Email" value={item.email} />
//           <Chip icon="🕐" label="Shift" value={item.shiftTiming} />
//           <Chip icon="💰" label="Salary" value={`₹${item.salary}`} />
//           <Chip icon="🏅" label="Cert." value={item.certification} />
//           <Chip icon="📅" label="Joined" value={joined} />
//         </View>

//         {/* ── Actions ── */}
//         <View style={s_card.actions}>
//           <TouchableOpacity
//             style={s_card.editBtn}
//             onPress={() => onEdit(item)}
//             activeOpacity={0.8}
//           >
//             <Text style={s_card.editTxt}>✏️ Edit Trainer</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={s_card.delBtn}
//             activeOpacity={0.8}
//             onPress={() =>
//               Alert.alert(
//                 "Remove Trainer",
//                 `Remove ${item.fullName} from the roster?`,
//                 [
//                   { text: "Cancel", style: "cancel" },
//                   {
//                     text: "Remove",
//                     style: "destructive",
//                     onPress: () => onDelete(item._id),
//                   },
//                 ],
//               )
//             }
//           >
//             <Text style={s_card.delTxt}>🗑️ Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const s_card = StyleSheet.create({
//   outer: {
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     marginBottom: 14,
//     flexDirection: "row",
//     shadowColor: "#94a3b8",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.18,
//     shadowRadius: 12,
//     elevation: 4,
//     overflow: "hidden",
//   },
//   accentBar: {
//     width: 4,
//     backgroundColor: "#3b82f6",
//   },
//   inner: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   avatar: {
//     width: 58,
//     height: 58,
//     borderRadius: 29,
//     borderWidth: 2.5,
//     borderColor: "#3b82f6",
//   },
//   avatarFallback: {
//     width: 58,
//     height: 58,
//     borderRadius: 29,
//     backgroundColor: "#dbeafe",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 2.5,
//     borderColor: "#3b82f6",
//   },
//   avatarInitial: { color: "#1d4ed8", fontSize: 22, fontWeight: "900" },
//   meta: { flex: 1, marginLeft: 12 },
//   name: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#0f172a",
//     letterSpacing: -0.3,
//   },
//   spec: { fontSize: 12, color: "#64748b", marginTop: 2, fontWeight: "500" },
//   expBox: {
//     backgroundColor: "#eff6ff",
//     borderRadius: 12,
//     paddingHorizontal: 11,
//     paddingVertical: 9,
//     alignItems: "center",
//     minWidth: 52,
//     borderWidth: 1.5,
//     borderColor: "#bfdbfe",
//   },
//   expNum: { color: "#1d4ed8", fontSize: 20, fontWeight: "900", lineHeight: 24 },
//   expLbl: {
//     color: "#3b82f6",
//     fontSize: 9,
//     fontWeight: "700",
//     letterSpacing: 1,
//     marginTop: 1,
//   },
//   divider: { height: 1, backgroundColor: "#f1f5f9", marginBottom: 12 },
//   grid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 4 },
//   actions: { flexDirection: "row", gap: 10, marginTop: 4 },
//   editBtn: {
//     flex: 1,
//     backgroundColor: "#2563eb",
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     shadowColor: "#2563eb",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   editTxt: { color: "#ffffff", fontWeight: "700", fontSize: 13 },
//   delBtn: {
//     flex: 1,
//     backgroundColor: "#fff1f2",
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     borderWidth: 1.5,
//     borderColor: "#fecdd3",
//   },
//   delTxt: { color: "#e11d48", fontWeight: "700", fontSize: 13 },
// });

// /* ─── Main Screen ──────────────────────────────────────────────── */
// export default function TrainerListScreen({ navigation }) {
//   const [trainers, setTrainers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTrainers = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/all`);
//       setTrainers(res.data);
//     } catch {
//       Alert.alert("Error", "Failed to fetch trainers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTrainers();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/delete/${id}`);
//       Alert.alert("Done", "Trainer removed successfully");
//       fetchTrainers();
//     } catch {
//       Alert.alert("Error", "Could not delete trainer");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

//       {/* ── Header ── */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.hSub}>MANAGEMENT PANEL</Text>
//           <Text style={styles.hTitle}>Trainers</Text>
//         </View>
//         <View style={styles.badge}>
//           <Text style={styles.badgeNum}>{trainers.length}</Text>
//           <Text style={styles.badgeLbl}>Total</Text>
//         </View>
//       </View>

//       {/* ── Body ── */}
//       {loading ? (
//         <View style={styles.center}>
//           <ActivityIndicator size="large" color="#2563eb" />
//           <Text style={styles.loadTxt}>Loading trainers…</Text>
//         </View>
//       ) : trainers.length === 0 ? (
//         <View style={styles.center}>
//           <Text style={styles.emptyIcon}>🏋️</Text>
//           <Text style={styles.emptyTitle}>No Trainers Yet</Text>
//           <Text style={styles.emptySub}>
//             Add your first trainer to get started
//           </Text>
//         </View>
//       ) : (
//         <FlatList
//           data={trainers}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <TrainerCard
//               item={item}
//               onEdit={(t) =>
//                 navigation.navigate("TrainerScreen", { trainer: t })
//               }
//               onDelete={handleDelete}
//             />
//           )}
//           contentContainerStyle={styles.list}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#f0f6ff" },

//   header: {
//     backgroundColor: "#ffffff",
//     paddingTop: 16,
//     paddingBottom: 18,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "flex-end",
//     justifyContent: "space-between",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e2e8f0",
//     shadowColor: "#94a3b8",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   hSub: {
//     fontSize: 10,
//     fontWeight: "700",
//     color: "#2563eb",
//     letterSpacing: 3,
//     marginBottom: 3,
//   },
//   hTitle: {
//     fontSize: 30,
//     fontWeight: "900",
//     color: "#0f172a",
//     letterSpacing: -0.5,
//   },
//   badge: {
//     backgroundColor: "#eff6ff",
//     borderRadius: 14,
//     paddingHorizontal: 16,
//     paddingVertical: 9,
//     alignItems: "center",
//     borderWidth: 1.5,
//     borderColor: "#bfdbfe",
//   },
//   badgeNum: {
//     color: "#1d4ed8",
//     fontWeight: "900",
//     fontSize: 22,
//     lineHeight: 26,
//   },
//   badgeLbl: {
//     color: "#64748b",
//     fontSize: 10,
//     fontWeight: "600",
//     letterSpacing: 1,
//   },

//   list: { padding: 16, paddingBottom: 48 },

//   center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
//   loadTxt: { color: "#64748b", fontSize: 13, fontWeight: "600", marginTop: 8 },
//   emptyIcon: { fontSize: 56, marginBottom: 6 },
//   emptyTitle: { color: "#0f172a", fontSize: 18, fontWeight: "800" },
//   emptySub: { color: "#64748b", fontSize: 13, fontWeight: "500" },
// });

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