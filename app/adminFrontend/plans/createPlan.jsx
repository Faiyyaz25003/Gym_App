// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   Button,
//   FlatList,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TextInput,
//   View,
// } from "react-native";

// const BASE_URL = "http://localhost:5000/api/plans"; // change this

// export default function PlanScreen() {
//   const [plans, setPlans] = useState([]);
//   const [form, setForm] = useState({
//     planId: "",
//     planName: "",
//     duration: "",
//     price: "",
//     description: "",
//     goalType: "",
//     workoutFrequency: "",
//     accessType: "",
//     trainerSupport: "",
//     dietPlan: "",
//     groupClasses: "",
//     progressTracking: "",
//     status: "Active",
//     isPopular: false,
//   });

//   /* FETCH PLANS */
//   const fetchPlans = async () => {
//     const res = await axios.get(BASE_URL);
//     setPlans(res.data);
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   /* ADD PLAN */
//   const addPlan = async () => {
//     await axios.post(BASE_URL, {
//       ...form,
//       price: Number(form.price),
//     });
//     fetchPlans();
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Add Membership Plan</Text>

//       {Object.keys(form).map((key) =>
//         key !== "isPopular" ? (
//           <TextInput
//             key={key}
//             placeholder={key}
//             style={styles.input}
//             value={form[key].toString()}
//             onChangeText={(text) => setForm({ ...form, [key]: text })}
//           />
//         ) : null,
//       )}

//       <View style={styles.switchRow}>
//         <Text>Is Popular</Text>
//         <Switch
//           value={form.isPopular}
//           onValueChange={(val) => setForm({ ...form, isPopular: val })}
//         />
//       </View>

//       <Button title="Add Plan" onPress={addPlan} />

//       <Text style={styles.title}>All Plans</Text>

//       <FlatList
//         data={plans}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text>{item.planName}</Text>
//             <Text>₹ {item.price}</Text>
//             <Text>{item.duration}</Text>
//             <Text>Status: {item.status}</Text>
//           </View>
//         )}
//       />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//   },
//   input: {
//     borderWidth: 1,
//     marginVertical: 5,
//     padding: 8,
//     borderRadius: 5,
//   },
//   card: {
//     padding: 10,
//     marginVertical: 5,
//     backgroundColor: "#f2f2f2",
//     borderRadius: 5,
//   },
//   switchRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10,
//   },
// });

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  Alert,
  Platform,
} from "react-native";

/* ============================= */
/* 🔥 BASE URL CONFIG */
/* ============================= */

// ⚠️ Replace 192.168.1.5 with your PC IPv4 address
const BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.1.5:5000/api/plans"
    : "http://localhost:5000/api/plans";

/* ============================= */

export default function PlanScreen() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    planId: "",
    planName: "",
    duration: "",
    price: "",
    description: "",
    goalType: "",
    workoutFrequency: "",
    accessType: "",
    trainerSupport: "",
    dietPlan: "",
    groupClasses: "",
    progressTracking: "",
    status: "Active",
    isPopular: false,
  });

  /* ============================= */
  /* FETCH PLANS */
  /* ============================= */
  const fetchPlans = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setPlans(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error.message);
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ============================= */
  /* ADD PLAN */
  /* ============================= */
  const addPlan = async () => {
    try {
      await axios.post(BASE_URL, {
        ...form,
        price: Number(form.price),
      });

      Alert.alert("Success", "Plan Added Successfully");

      setForm({
        planId: "",
        planName: "",
        duration: "",
        price: "",
        description: "",
        goalType: "",
        workoutFrequency: "",
        accessType: "",
        trainerSupport: "",
        dietPlan: "",
        groupClasses: "",
        progressTracking: "",
        status: "Active",
        isPopular: false,
      });

      fetchPlans();
    } catch (error) {
      console.log("ADD ERROR:", error.message);
      Alert.alert("Error", "Failed to add plan");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Membership Plan</Text>

      {Object.keys(form).map((key) =>
        key !== "isPopular" ? (
          <TextInput
            key={key}
            placeholder={key}
            style={styles.input}
            value={form[key].toString()}
            onChangeText={(text) => setForm({ ...form, [key]: text })}
          />
        ) : null,
      )}

      <View style={styles.switchRow}>
        <Text>Is Popular</Text>
        <Switch
          value={form.isPopular}
          onValueChange={(val) => setForm({ ...form, isPopular: val })}
        />
      </View>

      <Button title="Add Plan" onPress={addPlan} />

      <Text style={styles.title}>All Plans</Text>

      <FlatList
        data={plans}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.planName}</Text>
            <Text>₹ {item.price}</Text>
            <Text>{item.duration}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

/* ============================= */
/* STYLES */
/* ============================= */

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
  },
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
}); 