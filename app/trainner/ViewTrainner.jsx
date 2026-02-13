import { StyleSheet, Text, View } from "react-native";

export default function ViewTrainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 View Trainers</Text>
      <Text style={styles.text}>Yahan saare trainers list honge</Text>
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
