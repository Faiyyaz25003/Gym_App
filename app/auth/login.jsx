

//admin login

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";
// import { useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// export default function AdminLoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please enter email and password");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/admin/login", // ⚠️ localhost nahi chalega
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message);
//       }

//       // ✅ Save token
//       await AsyncStorage.setItem("adminToken", data.token);
//       await AsyncStorage.setItem("adminData", JSON.stringify(data.admin));

//       Alert.alert("Success", "Login Successful 🎉");

//       // ✅ Navigate to Admin Tabs
//       // router.push("/tabs/adminTabs");
//        router.push("/tabs/userTabs");
//     } catch (error) {
//       Alert.alert("Login Failed", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>🏋️ Admin Login</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter Email"
//           placeholderTextColor="#888"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Enter Password"
//           placeholderTextColor="#888"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Login</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1e3c72",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     width: "90%",
//     backgroundColor: "#fff",
//     padding: 25,
//     borderRadius: 12,
//     elevation: 10,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#1e3c72",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: "#2a5298",
//     padding: 14,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });




//user login 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function UserLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login", // Replace YOUR_IP with your machine IP
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token and user info
      await AsyncStorage.setItem("userToken", data.token);
      await AsyncStorage.setItem("userData", JSON.stringify(data.user));

      Alert.alert("Success", "Login Successful 🎉");

      // Navigate to user dashboard or home tab
      router.push("/tabs/userTabs");
    } catch (error) {
      Alert.alert("Login Failed ❌", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>👤 User Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3c72",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1e3c72",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2a5298",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
