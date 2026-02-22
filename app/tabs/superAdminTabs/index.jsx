import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from "react-native";

export default function GymAdminPanel() {
  const [gyms, setGyms] = useState([
    { 
      id: "1",
      gymName: "Power Fitness",
      owner: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      address: "Mumbai",
      status: "Active",
      adminApproved: false,
      adminBlocked: false,
    },
    {
      id: "2",
      gymName: "Iron Temple",
      owner: "Amit Verma",
      email: "amit@gmail.com",
      mobile: "9123456780",
      address: "Delhi",
      status: "Suspended",
      adminApproved: true,
      adminBlocked: false,
    },
    {
      id: "3",
      gymName: "Fit Arena",
      owner: "Suresh Patel",
      email: "suresh@gmail.com",
      mobile: "9000011111",
      address: "Ahmedabad",
      status: "Active",
      adminApproved: false,
      adminBlocked: false,
    },
    {
      id: "4",
      gymName: "Muscle Hub",
      owner: "Karan Singh",
      email: "karan@gmail.com",
      mobile: "9888899999",
      address: "Jaipur",
      status: "Active",
      adminApproved: true,
      adminBlocked: false,
    },
    {
      id: "5",
      gymName: "Alpha Gym",
      owner: "Vikas Yadav",
      email: "vikas@gmail.com",
      mobile: "9777712345",
      address: "Lucknow",
      status: "Suspended",
      adminApproved: false,
      adminBlocked: false,
    },
    {
      id: "6",
      gymName: "Titan Fitness",
      owner: "Rohit Mehta",
      email: "rohit@gmail.com",
      mobile: "9666612345",
      address: "Pune",
      status: "Active",
      adminApproved: true,
      adminBlocked: false,
    },
    {
      id: "7",
      gymName: "Beast Mode Gym",
      owner: "Anil Kumar",
      email: "anil@gmail.com",
      mobile: "9555512345",
      address: "Chennai",
      status: "Active",
      adminApproved: false,
      adminBlocked: false,
    },
    {
      id: "8",
      gymName: "Iron Paradise",
      owner: "Deepak Rana",
      email: "deepak@gmail.com",
      mobile: "9444412345",
      address: "Hyderabad",
      status: "Suspended",
      adminApproved: true,
      adminBlocked: false,
    },
    {
      id: "9",
      gymName: "Gold Gym",
      owner: "Arjun Das",
      email: "arjun@gmail.com",
      mobile: "9333312345",
      address: "Kolkata",
      status: "Active",
      adminApproved: false,
      adminBlocked: false,
    },
    {
      id: "10",
      gymName: "Fitness World",
      owner: "Manoj Tiwari",
      email: "manoj@gmail.com",
      mobile: "9222212345",
      address: "Bhopal",
      status: "Active",
      adminApproved: true,
      adminBlocked: false,
    },
    {
      id: "11",
      gymName: "Iron Beast",
      owner: "Nitin Joshi",
      email: "nitin@gmail.com",
      mobile: "9111112345",
      address: "Nagpur",
      status: "Suspended",
      adminApproved: false,
      adminBlocked: false,
    },
    {
      id: "12",
      gymName: "Strong Nation",
      owner: "Rakesh Roy",
      email: "rakesh@gmail.com",
      mobile: "9000012345",
      address: "Patna",
      status: "Active",
      adminApproved: true,
      adminBlocked: false,
    },
    {
      id: "13",
      gymName: "Flex Gym",
      owner: "Suraj Gupta",
      email: "suraj@gmail.com",
      mobile: "8999912345",
      address: "Surat",
      status: "Active",
      adminApproved: false,
      adminBlocked: false,
    },
    {
      id: "14",
      gymName: "Fit Zone",
      owner: "Harsh Vardhan",
      email: "harsh@gmail.com",
      mobile: "8888812345",
      address: "Indore",
      status: "Suspended",
      adminApproved: true,
      adminBlocked: false,
    },
    {
      id: "15",
      gymName: "Warrior Gym",
      owner: "Yash Thakur",
      email: "yash@gmail.com",
      mobile: "8777712345",
      address: "Kanpur",
      status: "Active",
      adminApproved: false,
      adminBlocked: false,
    },
  ]);

  const [selectedGym, setSelectedGym] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleStatus = (id) => {
    setGyms((prev) =>
      prev.map((gym) =>
        gym.id === id
          ? { ...gym, status: gym.status === "Active" ? "Suspended" : "Active" }
          : gym,
      ),
    );
  };

  const deleteGym = (id) => {
    Alert.alert("Confirm", "Delete this gym?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => setGyms((prev) => prev.filter((gym) => gym.id !== id)),
      },
    ]);
  };

  const approveAdmin = (id) => {
    setGyms((prev) =>
      prev.map((gym) =>
        gym.id === id ? { ...gym, adminApproved: true } : gym,
      ),
    );
  };

  const blockAdmin = (id) => {
    setGyms((prev) =>
      prev.map((gym) => (gym.id === id ? { ...gym, adminBlocked: true } : gym)),
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.gymName}</Text>
      <Text style={styles.cell}>{item.owner}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.mobile}</Text>
      <Text style={styles.cell}>{item.address}</Text>

      <Text
        style={[
          styles.cell,
          { color: item.status === "Active" ? "green" : "red" },
        ]}
      >
        {item.status}
      </Text>

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
          style={styles.statusBtn}
          onPress={() => toggleStatus(item.id)}
        >
          <Text style={styles.btnText}>
            {item.status === "Active" ? "Suspend" : "Activate"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteGym(item.id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Registered Gyms</Text>

      <ScrollView horizontal>
        <View>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Gym</Text>
            <Text style={styles.headerText}>Owner</Text>
            <Text style={styles.headerText}>Email</Text>
            <Text style={styles.headerText}>Mobile</Text>
            <Text style={styles.headerText}>Address</Text>
            <Text style={styles.headerText}>Status</Text>
            <Text style={styles.headerText}>Actions</Text>
          </View>

          <FlatList
            data={gyms}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListFooterComponent={<View style={{ height: 20 }} />}
          />
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          {selectedGym && (
            <>
              <Text style={styles.modalTitle}>
                {selectedGym.gymName} Details
              </Text>
              <Text>Owner: {selectedGym.owner}</Text>
              <Text>Email: {selectedGym.email}</Text>
              <Text>Mobile: {selectedGym.mobile}</Text>
              <Text>Address: {selectedGym.address}</Text>
              <Text>Status: {selectedGym.status}</Text>

              {!selectedGym.adminApproved && (
                <TouchableOpacity
                  style={styles.approveBtn}
                  onPress={() => approveAdmin(selectedGym.id)}
                >
                  <Text style={styles.btnText}>Approve Admin</Text>
                </TouchableOpacity>
              )}

              {!selectedGym.adminBlocked && (
                <TouchableOpacity
                  style={styles.blockBtn}
                  onPress={() => blockAdmin(selectedGym.id)}
                >
                  <Text style={styles.btnText}>Block Admin</Text>
                </TouchableOpacity>
              )}

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
    width: 250,
    justifyContent: "space-between",
  },

  viewBtn: { backgroundColor: "#3498db", padding: 5, borderRadius: 4 },
  statusBtn: { backgroundColor: "#f39c12", padding: 5, borderRadius: 4 },
  deleteBtn: { backgroundColor: "red", padding: 5, borderRadius: 4 },

  btnText: { color: "#fff", fontSize: 11 },

  modalContainer: { padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },

  approveBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  blockBtn: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  closeBtn: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
  },
});
