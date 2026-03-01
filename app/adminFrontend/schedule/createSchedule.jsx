import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const BASE_URL = "http://localhost:5000"; // Change if needed

const daysList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ScheduleScreen() {
  const [className, setClassName] = useState("");
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [trainer, setTrainer] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [status, setStatus] = useState("Active");

  const [trainers, setTrainers] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchTrainers();
    fetchSchedules();
  }, []);

  const fetchTrainers = async () => {
    const res = await axios.get(`${BASE_URL}/api/trainers/all`);
    setTrainers(res.data);
  };

  const fetchSchedules = async () => {
    const res = await axios.get(`${BASE_URL}/api/schedules`);
    setSchedules(res.data);
  };

  const toggleDay = (day) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const createSchedule = async () => {
    try {
      await axios.post(`${BASE_URL}/api/schedules`, {
        className,
        days,
        startTime,
        endTime,
        trainer,
        maxMembers,
        status,
      });

      Alert.alert("Success", "Schedule Created");
      fetchSchedules();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const deleteSchedule = async (id) => {
    await axios.delete(`${BASE_URL}/api/schedules/${id}`);
    fetchSchedules();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Schedule</Text>

      <TextInput
        placeholder="Class Name"
        style={styles.input}
        value={className}
        onChangeText={setClassName}
      />

      <Text style={styles.label}>Select Days</Text>
      {daysList.map((day) => (
        <TouchableOpacity
          key={day}
          onPress={() => toggleDay(day)}
          style={[
            styles.dayButton,
            days.includes(day) && { backgroundColor: "#4CAF50" },
          ]}
        >
          <Text style={{ color: "#fff" }}>{day}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        placeholder="Start Time"
        style={styles.input}
        value={startTime}
        onChangeText={setStartTime}
      />

      <TextInput
        placeholder="End Time"
        style={styles.input}
        value={endTime}
        onChangeText={setEndTime}
      />

      <Text style={styles.label}>Select Trainer</Text>
      <Picker
        selectedValue={trainer}
        onValueChange={(itemValue) => setTrainer(itemValue)}
      >
        <Picker.Item label="Select Trainer" value="" />
        {trainers.map((t) => (
          <Picker.Item key={t._id} label={t.fullName} value={t._id} />
        ))}
      </Picker>

      <TextInput
        placeholder="Max Members"
        style={styles.input}
        value={maxMembers}
        onChangeText={setMaxMembers}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="Active" value="Active" />
        <Picker.Item label="Inactive" value="Inactive" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={createSchedule}>
        <Text style={{ color: "#fff" }}>Create Schedule</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 12,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
  card: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  deleteBtn: {
    backgroundColor: "red",
    padding: 8,
    marginTop: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  dayButton: {
    backgroundColor: "#888",
    padding: 8,
    marginVertical: 3,
    borderRadius: 5,
    alignItems: "center",
  },
  label: { marginTop: 10, fontWeight: "bold" },
});
