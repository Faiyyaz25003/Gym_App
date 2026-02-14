import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default function AddMember() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>➕ Add Member</Text>

      <TextInput placeholder="Full Name" style={styles.input} />

      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Membership Plan (Monthly / Yearly)"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Member</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
    marginTop: 32,
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
