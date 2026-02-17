import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Exercise() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>💪 Exercise Reference</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Chest</Text>
        <Text style={styles.desc}>• Bench Press</Text>
        <Text style={styles.desc}>• Push Ups</Text>
        <Text style={styles.desc}>• Cable Fly</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Back</Text>
        <Text style={styles.desc}>• Pull Ups</Text>
        <Text style={styles.desc}>• Deadlift</Text>
        <Text style={styles.desc}>• Lat Pulldown</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Legs</Text>
        <Text style={styles.desc}>• Squats</Text>
        <Text style={styles.desc}>• Leg Press</Text>
        <Text style={styles.desc}>• Lunges</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Shoulders</Text>
        <Text style={styles.desc}>• Shoulder Press</Text>
        <Text style={styles.desc}>• Lateral Raise</Text>
        <Text style={styles.desc}>• Front Raise</Text>
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
    marginTop: 13,
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
    marginTop: 4,
  },
});
