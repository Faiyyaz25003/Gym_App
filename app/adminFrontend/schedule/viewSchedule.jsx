import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";

export default function ScheduleListScreen() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/schedules");
      setSchedules(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSchedules();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <FlatList
      data={schedules}
      keyExtractor={(item) => item._id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.className}>{item.className}</Text>

          <Text style={styles.text}>📅 Days: {item.days.join(", ")}</Text>

          <Text style={styles.text}>
            ⏰ Time: {item.startTime} - {item.endTime}
          </Text>

          <Text style={styles.text}>👨‍🏫 Trainer: {item.trainer?.fullName}</Text>

          <Text style={styles.text}>👥 Max Members: {item.maxMembers}</Text>

          <Text
            style={[
              styles.status,
              item.status === "Active" ? styles.active : styles.inactive,
            ]}
          >
            {item.status}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  className: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  status: {
    marginTop: 8,
    fontWeight: "bold",
  },
  active: {
    color: "green",
  },
  inactive: {
    color: "red",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
