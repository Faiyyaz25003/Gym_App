import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Achievements() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🏆 Achievements</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Member of the Month</Text>
        <Text style={styles.desc}>Rahul Sharma</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Weight Loss Champion</Text>
        <Text style={styles.desc}>–12 kg in 3 months</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Consistency Award</Text>
        <Text style={styles.desc}>90 Days Non-Stop Workout</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Top Trainer</Text>
        <Text style={styles.desc}>Trainer Aman</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
  },
  card: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  desc: {
    fontSize: 15,
    marginTop: 6,
  },
});
