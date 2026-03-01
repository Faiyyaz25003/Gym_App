// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");
//         if (!token) {
//           Alert.alert("Error", "User not logged in");
//           setLoading(false);
//           return;
//         }
//         const res = await axios.get("http://10.0.2.2:5000/api/users/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (err) {
//         console.log("Profile fetch error:", err.response?.data || err.message);
//         Alert.alert("Error", "Failed to fetch profile");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#2e7d32" />
//         <Text style={styles.loadingText}>Loading Profile...</Text>
//       </View>
//     );
//   }

//   if (!user) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>No profile data found.</Text>
//       </View>
//     );
//   }

//   const formatDate = (date) =>
//     date
//       ? new Date(date).toLocaleDateString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         })
//       : "N/A";

//   return (
//     <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
//       {/* Header Card */}
//       <View style={styles.headerCard}>
//         <View style={styles.headerTop}>
//           {user.photo ? (
//             <Image source={{ uri: user.photo }} style={styles.avatar} />
//           ) : (
//             <View style={styles.avatarPlaceholder}>
//               <Text style={styles.avatarInitial}>
//                 {user.fullName?.charAt(0) || "?"}
//               </Text>
//             </View>
//           )}
//           <View style={styles.headerInfo}>
//             <Text style={styles.name}>{user.fullName}</Text>
//             <View style={styles.infoRow}>
//               <Text style={styles.infoIcon}>👤</Text>
//               <Text style={styles.infoText}>{user.fullName}</Text>
//             </View>
//             <View style={styles.infoRow}>
//               <Text style={styles.infoIcon}>📞</Text>
//               <Text style={styles.infoText}>+91 {user.mobile}</Text>
//             </View>
//             <View style={styles.infoRow}>
//               <Text style={styles.infoIcon}>✉️</Text>
//               <Text style={styles.infoText}>{user.email}</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Details Card */}
//       <View style={styles.detailsCard}>
//         <InfoRow icon="📱" label="Mobile" value={`+91 ${user.mobile}`} />
//         <Divider />
//         <InfoRow icon="⚧" label="Gender" value={user.gender} />
//         <Divider />
//         <InfoRow
//           icon="🏆"
//           label="Plan"
//           value={user.membershipPlan}
//           badge
//           badgeColor="#f57f17"
//         />
//         <Divider />
//         <View style={styles.doubleRow}>
//           <InfoRowHalf
//             icon="📅"
//             label="Start Date"
//             value={formatDate(user.startDate)}
//           />
//           <InfoRowHalf
//             icon="📅"
//             label="End Date"
//             value={formatDate(user.endDate)}
//           />
//         </View>
//         <Divider />
//         <InfoRow icon="💰" label="Fees" value={`₹ ${user.fees || "N/A"}`} />
//         <Divider />
//         <InfoRow
//           icon="💳"
//           label="Payment Status"
//           value={user.paymentStatus}
//           badge
//           badgeColor={
//             user.paymentStatus?.toLowerCase() === "paid" ? "#2e7d32" : "#c62828"
//           }
//         />
//         <Divider />
//         <InfoRow
//           icon="🏋️"
//           label="Assigned Trainer"
//           value={user.assignedTrainer}
//         />
//         <Divider />
//         <View style={styles.doubleRow}>
//           <InfoRowHalf icon="📏" label="Height" value={`${user.height} cm`} />
//           <InfoRowHalf icon="⚖️" label="Weight" value={`${user.weight} kg`} />
//         </View>
//       </View>

//       {/* QR Code Section */}
//       {user.qrCode && (
//         <View style={styles.qrCard}>
//           <TouchableOpacity style={styles.qrButton} activeOpacity={0.85}>
//             <Text style={styles.qrButtonText}>
//               📷 Scan QR Code for Attendance
//             </Text>
//           </TouchableOpacity>
//           <View style={styles.qrBody}>
//             <Image
//               source={{ uri: user.qrCode }}
//               style={styles.qrImage}
//               resizeMode="contain"
//             />
//             <View style={styles.qrMeta}>
//               <Text style={styles.qrDesc}>
//                 Please scan this QR code to check in to the gym.
//               </Text>
//               <Text style={styles.qrValidity}>
//                 Valid: {formatDate(user.startDate)} – {formatDate(user.endDate)}
//               </Text>
//             </View>
//           </View>
//           <Text style={styles.qrFooter}>
//             Valid: {formatDate(user.startDate)} – {formatDate(user.endDate)}
//           </Text>
//         </View>
//       )}

//       {/* Action Buttons */}
//       <View style={styles.actions}>
//         <TouchableOpacity style={[styles.actionBtn, styles.editBtn]}>
//           <Text style={styles.actionBtnText}>✏️ Edit Member</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]}>
//           <Text style={styles.actionBtnText}>🗑️ Delete Member</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const InfoRow = ({ icon, label, value, badge, badgeColor }) => (
//   <View style={styles.infoRowCard}>
//     <Text style={styles.rowIcon}>{icon}</Text>
//     <Text style={styles.rowLabel}>{label}:</Text>
//     {badge ? (
//       <View style={[styles.badgePill, { backgroundColor: badgeColor }]}>
//         <Text style={styles.badgeText}>{value}</Text>
//       </View>
//     ) : (
//       <Text style={styles.rowValue}>{value}</Text>
//     )}
//   </View>
// );

// const InfoRowHalf = ({ icon, label, value }) => (
//   <View style={styles.halfRow}>
//     <Text style={styles.rowIcon}>{icon}</Text>
//     <View>
//       <Text style={styles.halfLabel}>{label}</Text>
//       <Text style={styles.halfValue}>{value}</Text>
//     </View>
//   </View>
// );

// const Divider = () => <View style={styles.divider} />;

// const styles = StyleSheet.create({
//   screen: { backgroundColor: "#f0f4f0" },
//   container: { padding: 14, paddingBottom: 40 },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f0f4f0",
//   },
//   loadingText: { marginTop: 12, color: "#2e7d32", fontSize: 15 },
//   errorText: { color: "#c62828", fontSize: 16 },

//   // Header
//   headerCard: {
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//   },
//   headerTop: { flexDirection: "row", alignItems: "flex-start" },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginRight: 14,
//     borderWidth: 2,
//     borderColor: "#2e7d32",
//   },
//   avatarPlaceholder: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#c8e6c9",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 14,
//   },
//   avatarInitial: { fontSize: 32, fontWeight: "bold", color: "#2e7d32" },
//   headerInfo: { flex: 1 },
//   name: { fontSize: 20, fontWeight: "700", color: "#1b5e20", marginBottom: 6 },
//   infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 3 },
//   infoIcon: { fontSize: 13, marginRight: 5 },
//   infoText: { fontSize: 13, color: "#444", flexShrink: 1 },

//   // Details
//   detailsCard: {
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 12,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//   },
//   infoRowCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 10,
//   },
//   rowIcon: { fontSize: 18, marginRight: 10, width: 26 },
//   rowLabel: { fontSize: 14, color: "#555", fontWeight: "600", marginRight: 6 },
//   rowValue: { fontSize: 14, color: "#222", flex: 1 },
//   badgePill: { paddingHorizontal: 12, paddingVertical: 3, borderRadius: 20 },
//   badgeText: { color: "#fff", fontWeight: "700", fontSize: 13 },
//   divider: { height: 1, backgroundColor: "#e8f5e9" },
//   doubleRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 10,
//   },
//   halfRow: { flexDirection: "row", alignItems: "center", flex: 1 },
//   halfLabel: { fontSize: 12, color: "#888", marginLeft: 8 },
//   halfValue: { fontSize: 14, fontWeight: "600", color: "#222", marginLeft: 8 },

//   // QR
//   qrCard: {
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 12,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//   },
//   qrButton: {
//     backgroundColor: "#2e7d32",
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: "center",
//     marginBottom: 14,
//   },
//   qrButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
//   qrBody: { flexDirection: "row", alignItems: "flex-start" },
//   qrImage: { width: 100, height: 100, marginRight: 14 },
//   qrMeta: { flex: 1 },
//   qrDesc: { fontSize: 13, color: "#444", marginBottom: 8, lineHeight: 18 },
//   qrValidity: { fontSize: 12, color: "#888" },
//   qrFooter: { marginTop: 10, fontSize: 12, color: "#999", textAlign: "center" },

//   // Actions
//   actions: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
//   actionBtn: {
//     flex: 1,
//     paddingVertical: 13,
//     borderRadius: 10,
//     alignItems: "center",
//     elevation: 2,
//   },
//   editBtn: { backgroundColor: "#388e3c" },
//   deleteBtn: { backgroundColor: "#c62828" },
//   actionBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
// });

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          Alert.alert("Error", "User not logged in");
          setLoading(false);
          return;
        }
        const res = await axios.get("http://10.0.2.2:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.log("Profile fetch error:", err.response?.data || err.message);
        Alert.alert("Error", "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No profile data found.</Text>
      </View>
    );
  }

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          {user.photo ? (
            <Image source={{ uri: user.photo }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {user.fullName?.charAt(0) || "?"}
              </Text>
            </View>
          )}
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{user.fullName}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>👤</Text>
              <Text style={styles.infoText}>{user.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📞</Text>
              <Text style={styles.infoText}>+91 {user.mobile}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>✉️</Text>
              <Text style={styles.infoText}>{user.email}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Details Card */}
      <View style={styles.detailsCard}>
        <InfoRow icon="📱" label="Mobile" value={`+91 ${user.mobile}`} />
        <Divider />
        <InfoRow icon="⚧" label="Gender" value={user.gender} />
        <Divider />
        <InfoRow
          icon="🏆"
          label="Plan"
          value={user.membershipPlan}
          badge
          badgeColor="#f57f17"
        />
        <Divider />
        <View style={styles.doubleRow}>
          <InfoRowHalf
            icon="📅"
            label="Start Date"
            value={formatDate(user.startDate)}
          />
          <InfoRowHalf
            icon="📅"
            label="End Date"
            value={formatDate(user.endDate)}
          />
        </View>
        <Divider />
        <InfoRow icon="💰" label="Fees" value={`₹ ${user.fees || "N/A"}`} />
        <Divider />
        <InfoRow
          icon="💳"
          label="Payment Status"
          value={user.paymentStatus}
          badge
          badgeColor={
            user.paymentStatus?.toLowerCase() === "paid" ? "#2e7d32" : "#c62828"
          }
        />
        <Divider />
        <InfoRow
          icon="🏋️"
          label="Assigned Trainer"
          value={user.assignedTrainer}
        />
        <Divider />
        <View style={styles.doubleRow}>
          <InfoRowHalf icon="📏" label="Height" value={`${user.height} cm`} />
          <InfoRowHalf icon="⚖️" label="Weight" value={`${user.weight} kg`} />
        </View>
      </View>

      {/* QR Code Section */}
      {user.qrCode && (
        <View style={styles.qrCard}>
          <TouchableOpacity style={styles.qrButton} activeOpacity={0.85}>
            <Text style={styles.qrButtonText}>
              📷 Scan QR Code for Attendance
            </Text>
          </TouchableOpacity>
          <View style={styles.qrBody}>
            <Image
              source={{ uri: user.qrCode }}
              style={styles.qrImage}
              resizeMode="contain"
            />
            <View style={styles.qrMeta}>
              <Text style={styles.qrDesc}>
                Please scan this QR code to check in to the gym.
              </Text>
              <Text style={styles.qrValidity}>
                Valid: {formatDate(user.startDate)} – {formatDate(user.endDate)}
              </Text>
            </View>
          </View>
          <Text style={styles.qrFooter}>
            Valid: {formatDate(user.startDate)} – {formatDate(user.endDate)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const InfoRow = ({ icon, label, value, badge, badgeColor }) => (
  <View style={styles.infoRowCard}>
    <Text style={styles.rowIcon}>{icon}</Text>
    <Text style={styles.rowLabel}>{label}:</Text>
    {badge ? (
      <View style={[styles.badgePill, { backgroundColor: badgeColor }]}>
        <Text style={styles.badgeText}>{value}</Text>
      </View>
    ) : (
      <Text style={styles.rowValue}>{value}</Text>
    )}
  </View>
);

const InfoRowHalf = ({ icon, label, value }) => (
  <View style={styles.halfRow}>
    <Text style={styles.rowIcon}>{icon}</Text>
    <View>
      <Text style={styles.halfLabel}>{label}</Text>
      <Text style={styles.halfValue}>{value}</Text>
    </View>
  </View>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  screen: { backgroundColor: "#f0f4f0" },
  container: { padding: 14, paddingBottom: 40 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f0",
  },
  loadingText: { marginTop: 12, color: "#2e7d32", fontSize: 15 },
  errorText: { color: "#c62828", fontSize: 16 },

  // Header
  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  headerTop: { flexDirection: "row", alignItems: "flex-start" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#2e7d32",
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#c8e6c9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarInitial: { fontSize: 32, fontWeight: "bold", color: "#2e7d32" },
  headerInfo: { flex: 1 },
  name: { fontSize: 20, fontWeight: "700", color: "#1b5e20", marginBottom: 6 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 3 },
  infoIcon: { fontSize: 13, marginRight: 5 },
  infoText: { fontSize: 13, color: "#444", flexShrink: 1 },

  // Details
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  infoRowCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowIcon: { fontSize: 18, marginRight: 10, width: 26 },
  rowLabel: { fontSize: 14, color: "#555", fontWeight: "600", marginRight: 6 },
  rowValue: { fontSize: 14, color: "#222", flex: 1 },
  badgePill: { paddingHorizontal: 12, paddingVertical: 3, borderRadius: 20 },
  badgeText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  divider: { height: 1, backgroundColor: "#e8f5e9" },
  doubleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  halfRow: { flexDirection: "row", alignItems: "center", flex: 1 },
  halfLabel: { fontSize: 12, color: "#888", marginLeft: 8 },
  halfValue: { fontSize: 14, fontWeight: "600", color: "#222", marginLeft: 8 },

  // QR
  qrCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  qrButton: {
    backgroundColor: "#2e7d32",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 14,
  },
  qrButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  qrBody: { flexDirection: "row", alignItems: "flex-start" },
  qrImage: { width: 100, height: 100, marginRight: 14 },
  qrMeta: { flex: 1 },
  qrDesc: { fontSize: 13, color: "#444", marginBottom: 8, lineHeight: 18 },
  qrValidity: { fontSize: 12, color: "#888" },
  qrFooter: { marginTop: 10, fontSize: 12, color: "#999", textAlign: "center" },
});
