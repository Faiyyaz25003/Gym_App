import { View, Text, StyleSheet } from "react-native";

export default function AddTrainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Add Trainer</Text>
      <Text style={styles.text}>Yahan trainer add karne ka form aayega</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    marginTop: 10,
    color: "#6b7280",
  },
});
