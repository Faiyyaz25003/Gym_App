import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const references = [
  {
    id: 1,
    dietName: "Weight Loss Diet",
    description: "Healthy fat loss diet reference video",
    videoUrl: "https://www.youtube.com/",
  },
  {
    id: 2,
    dietName: "Muscle Gain Diet",
    description: "High protein diet guidance",
    videoUrl: "https://www.youtube.com/",
  },
];

export default function ViewDietReference() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diet References</Text>

      {references.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.dietName}>{item.dietName}</Text>
          <Text style={styles.desc}>{item.description}</Text>

          <TouchableOpacity onPress={() => Linking.openURL(item.videoUrl)}>
            <Text style={styles.link}>▶ Watch YouTube Video</Text>
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
