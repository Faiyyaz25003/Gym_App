import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

//////////////////////////////////////////////////
// 🔥 SAME API CONFIG LIKE LOGIN
//////////////////////////////////////////////////

const BASE_URL =
  Platform.OS === "web" ? "http://localhost:5000" : "http://192.168.0.104:5000"; // 👈 your WiFi IP

export default function GymAdminPanel() {
  const [gyms, setGyms] = useState([]);
  const [selectedGym, setSelectedGym] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  //////////////////////////////////////////////////////////
  // ✅ FETCH ALL ADMINS (INTEGRATED WITH YOUR CONTROLLER)
  //////////////////////////////////////////////////////////

  const fetchAdmins = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "Token not found. Please login again.");
        return;
      }

      const response = await fetch(`${BASE_URL}/api/admin/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch admins");
      }

      // 👇 YOUR CONTROLLER RETURNS { success, total, admins }
      setGyms(data.admins || []);
    } catch (error) {
      console.log("Fetch Error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  //////////////////////////////////////////////////////////
  // 🔄 REFRESH
  //////////////////////////////////////////////////////////

  const onRefresh = () => {
    setRefreshing(true);
    fetchAdmins();
  };

  //////////////////////////////////////////////////////////
  // ❌ DELETE ADMIN
  //////////////////////////////////////////////////////////

  const deleteGym = (id) => {
    Alert.alert("Confirm", "Delete this admin?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("token");

            const response = await fetch(`${BASE_URL}/api/admin/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message);
            }

            Alert.alert("Success", "Admin Deleted Successfully");
            fetchAdmins();
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  //////////////////////////////////////////////////////////
  // 🎨 RENDER ITEM
  //////////////////////////////////////////////////////////

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.gymName}</Text>
      <Text style={styles.cell}>{item.fullName}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.mobile}</Text>
      <Text style={styles.cell}>{item.gymAddress}</Text>
      <Text style={[styles.cell, { color: "green" }]}>{item.role}</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => {
            setSelectedGym(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.btnText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteGym(item._id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  //////////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Registered Admins</Text>

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : gyms.length === 0 ? (
        <Text style={{ marginTop: 20 }}>No Admins Found</Text>
      ) : (
        <ScrollView horizontal>
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>Gym</Text>
              <Text style={styles.headerText}>Owner</Text>
              <Text style={styles.headerText}>Email</Text>
              <Text style={styles.headerText}>Mobile</Text>
              <Text style={styles.headerText}>Address</Text>
              <Text style={styles.headerText}>Role</Text>
              <Text style={styles.headerText}>Actions</Text>
            </View>

            <FlatList
              data={gyms}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        </ScrollView>
      )}

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          {selectedGym && (
            <>
              <Text style={styles.modalTitle}>
                {selectedGym.gymName} Details
              </Text>

              <Text>Owner: {selectedGym.fullName}</Text>
              <Text>Email: {selectedGym.email}</Text>
              <Text>Mobile: {selectedGym.mobile}</Text>
              <Text>Address: {selectedGym.gymAddress}</Text>
              <Text>
                Subscription: {selectedGym.subscriptionMonths || 0} Months
              </Text>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
}

//////////////////////////////////////////////////////////
// STYLES
//////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f4f4f4" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },

  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 10,
    width: 1100,
  },
  headerText: { width: 150, fontWeight: "bold" },

  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    width: 1100,
  },
  cell: { width: 150, fontSize: 12 },

  actionRow: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-between",
  },

  viewBtn: { backgroundColor: "#3498db", padding: 5, borderRadius: 4 },
  deleteBtn: { backgroundColor: "red", padding: 5, borderRadius: 4 },

  btnText: { color: "#fff", fontSize: 11 },

  modalContainer: { padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },

  closeBtn: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
  },
});
