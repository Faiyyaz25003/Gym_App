import { FlatList, StyleSheet, Text, View } from "react-native";

const members = [
  { id: "1", name: "Rahul Sharma", plan: "Monthly" },
  { id: "2", name: "Aman Khan", plan: "Quarterly" },
  { id: "3", name: "Neha Verma", plan: "Yearly" },
];

export default function ViewMembers() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👥 Members</Text>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.plan}>Plan: {item.plan}</Text>
          </View>
        )}
      />
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
    marginBottom: 15,
    marginTop: 32,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  plan: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
});
