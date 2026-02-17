import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ExpiredSoon() {
  const [users, setUsers] = useState([]);

  // 🔥 Demo Users (baad me backend se aayega)
  // 🔥 Demo Users (10+ Data)
  const demoUsers = [
    {
      id: 1,
      name: "Rahul Sharma",
      startDate: "2026-01-01",
      endDate: "2026-02-25",
    },
    {
      id: 2,
      name: "Aman Khan",
      startDate: "2026-01-15",
      endDate: "2026-02-20",
    },
    {
      id: 3,
      name: "Sohail Ali",
      startDate: "2026-01-01",
      endDate: "2026-02-22",
    },
    {
      id: 4,
      name: "Imran Sheikh",
      startDate: "2026-01-10",
      endDate: "2026-02-24",
    },
    {
      id: 5,
      name: "Faizan Ahmed",
      startDate: "2026-01-12",
      endDate: "2026-02-23",
    },
    {
      id: 6,
      name: "Arman Qureshi",
      startDate: "2026-01-05",
      endDate: "2026-02-21",
    },
    {
      id: 7,
      name: "Sameer Patel",
      startDate: "2026-01-07",
      endDate: "2026-02-26",
    },
    {
      id: 8,
      name: "Zaid Malik",
      startDate: "2026-01-09",
      endDate: "2026-02-27",
    },
    {
      id: 9,
      name: "Bilal Khan",
      startDate: "2026-01-03",
      endDate: "2026-02-28",
    },
    {
      id: 10,
      name: "Yusuf Shaikh",
      startDate: "2026-01-08",
      endDate: "2026-02-20",
    },
    {
      id: 11,
      name: "Tariq Ansari",
      startDate: "2026-01-04",
      endDate: "2026-03-30", // ye show nahi hoga (7 days se zyada)
    },
  ];

  useEffect(() => {
    checkExpiry();
  }, []);

  const checkExpiry = () => {
    const today = new Date();

    const filteredUsers = demoUsers
      .map((user) => {
        const end = new Date(user.endDate);
        const diffTime = end - today;
        const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
          ...user,
          remainingDays,
        };
      })
      .filter((user) => user.remainingDays <= 7 && user.remainingDays >= 0);

    setUsers(filteredUsers);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚠ Membership Expiring Soon</Text>

      {users.length === 0 ? (
        <Text style={styles.noData}>
          No memberships expiring in next 7 days.
        </Text>
      ) : (
        users.map((user) => (
          <View key={user.id} style={styles.card}>
            <Text style={styles.name}>{user.name}</Text>

            <Text style={styles.text}>📅 Start Date: {user.startDate}</Text>

            <Text style={styles.text}>⏳ End Date: {user.endDate}</Text>

            <Text style={styles.remaining}>
              🔥 Remaining Days: {user.remainingDays}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "red",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 3,
  },
  remaining: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginTop: 5,
  },
  noData: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
});
