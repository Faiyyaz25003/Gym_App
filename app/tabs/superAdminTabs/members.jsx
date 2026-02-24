import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = "http://localhost:5000"; // 🔥 CHANGE TO YOUR PC IP

export default function GymAdminPanel() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  //////////////////////////////////////////////////////////
  // FETCH ADMINS
  //////////////////////////////////////////////////////////

  const fetchAdmins = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setAdmins(data.admins);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  //////////////////////////////////////////////////////////
  // DELETE ADMIN
  //////////////////////////////////////////////////////////

  const deleteAdmin = async (id) => {
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

            Alert.alert("Success", "Admin deleted");
            fetchAdmins();
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  //////////////////////////////////////////////////////////
  // BLOCK / UNBLOCK
  //////////////////////////////////////////////////////////

  const toggleBlock = async (id, currentStatus) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/admin/block/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isBlocked: !currentStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      Alert.alert("Success", data.message);
      fetchAdmins();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  //////////////////////////////////////////////////////////
  // FORMAT DATE
  //////////////////////////////////////////////////////////

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  //////////////////////////////////////////////////////////
  // DASHBOARD COUNTS
  //////////////////////////////////////////////////////////

  const total = admins.length;
  const active = admins.filter((a) => !a.isBlocked).length;
  const blocked = admins.filter((a) => a.isBlocked).length;

  //////////////////////////////////////////////////////////
  // RENDER ROW
  //////////////////////////////////////////////////////////

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.gymName}</Text>
      <Text style={styles.cell}>{item.fullName}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{formatDate(item.endDate)}</Text>

      <Text style={[styles.cell, { color: item.isBlocked ? "red" : "green" }]}>
        {item.isBlocked ? "Blocked" : "Active"}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => {
            setSelectedAdmin(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.btnText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.blockBtn,
            {
              backgroundColor: item.isBlocked ? "green" : "orange",
            },
          ]}
          onPress={() => toggleBlock(item._id, item.isBlocked)}
        >
          <Text style={styles.btnText}>
            {item.isBlocked ? "Unblock" : "Block"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteAdmin(item._id)}
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
      <Text style={styles.title}>SuperAdmin Panel</Text>

      {/* Dashboard Cards */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{total}</Text>
          <Text>Total</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardNumber, { color: "green" }]}>{active}</Text>
          <Text>Active</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardNumber, { color: "red" }]}>{blocked}</Text>
          <Text>Blocked</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={admins}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchAdmins} />
          }
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      )}

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modal}>
          {selectedAdmin && (
            <>
              <Text style={styles.modalTitle}>{selectedAdmin.gymName}</Text>

              <Text>Owner: {selectedAdmin.fullName}</Text>
              <Text>Email: {selectedAdmin.email}</Text>
              <Text>Mobile: {selectedAdmin.mobile}</Text>
              <Text>Address: {selectedAdmin.gymAddress}</Text>
              <Text>Start Date: {formatDate(selectedAdmin.startDate)}</Text>
              <Text>End Date: {formatDate(selectedAdmin.endDate)}</Text>
              <Text>
                Subscription: {selectedAdmin.subscriptionMonths} Months
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
  container: { flex: 1, padding: 15, backgroundColor: "#f4f4f4" },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
    elevation: 3,
  },

  cardNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },

  row: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
  },

  cell: {
    fontSize: 12,
    marginBottom: 3,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  viewBtn: {
    backgroundColor: "#3498db",
    padding: 6,
    borderRadius: 5,
  },

  blockBtn: {
    padding: 6,
    borderRadius: 5,
  },

  deleteBtn: {
    backgroundColor: "red",
    padding: 6,
    borderRadius: 5,
  },

  btnText: {
    color: "#fff",
    fontSize: 11,
  },

  modal: {
    padding: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  closeBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
});
