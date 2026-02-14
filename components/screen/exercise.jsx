import { StyleSheet, Text, View } from "react-native";

export default function Exercise() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise</Text>
      <Text style={styles.text}>Daily workout plans and routines</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});
