import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

const diets = [
  {
    id: 1,
    member: "Member 1",
    name: "Weight Loss Diet",
    desc: "Low carb, high protein diet for fat loss",
    video: "https://www.youtube.com/",
  },
  {
    id: 2,
    member: "Member 2",
    name: "Muscle Gain Diet",
    desc: "High calorie & protein rich diet",
    video: "https://www.youtube.com/",
  },
];

export default function ViewDiet() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>View Diet Plans</Text>

      {diets.map((diet) => (
        <View key={diet.id} style={styles.card}>
          <Text style={styles.dietName}>{diet.name}</Text>
          <Text style={styles.member}>👤 {diet.member}</Text>
          <Text style={styles.desc}>{diet.desc}</Text>

          <TouchableOpacity onPress={() => Linking.openURL(diet.video)}>
            <Text style={styles.link}>▶ Watch Reference Video</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  dietName: {
    fontSize: 17,
    fontWeight: "700",
  },
  member: {
    marginTop: 4,
    color: "#555",
  },
  desc: {
    marginTop: 6,
    color: "#666",
  },
  link: {
    marginTop: 10,
    color: "#1E88E5",
    fontWeight: "600",
  },
});
