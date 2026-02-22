// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("admin");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please enter email and password");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(
//         "http://localhost:5000/api/superadmin/login", // 🔥 Replace with your IP
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             password,
//             role,
//           }),
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // ✅ Role Based Navigation
//       if (data.user.role === "superadmin") {
//         router.replace("/tabs/superAdminTabs");
//       } else if (data.user.role === "admin") {
//         router.replace("/tabs/adminTabs");
//       } else if (data.user.role === "user") {
//         router.replace("/tabs/userTabs");
//       } else {
//         router.replace("/tabs/homeUserTabs");
//       }
//     } catch (error) {
//       Alert.alert("Login Failed", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Image
//           source={{
//             uri: "https://cdn-icons-png.flaticon.com/512/2964/2964514.png",
//           }}
//           style={styles.logo}
//         />
//         <Text style={styles.title}>GYM FIT PRO</Text>
//         <Text style={styles.subtitle}>Train Hard • Stay Strong • Be Fit</Text>
//       </View>

//       {/* Card */}
//       <View style={styles.card}>
//         {/* Role Selector */}
//         <View style={styles.roleBox}>
//           <TouchableOpacity
//             style={[styles.roleBtn, role === "superAdmin" && styles.roleActive]}
//             onPress={() => setRole("superAdmin")}
//           >
//             <Ionicons name="key" size={18} color="#fff" />
//             <Text style={styles.roleText}>Super</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.roleBtn, role === "admin" && styles.roleActive]}
//             onPress={() => setRole("admin")}
//           >
//             <Ionicons name="shield-checkmark" size={18} color="#fff" />
//             <Text style={styles.roleText}>Admin</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.roleBtn, role === "user" && styles.roleActive]}
//             onPress={() => setRole("user")}
//           >
//             <Ionicons name="person" size={18} color="#fff" />
//             <Text style={styles.roleText}>User</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.roleBtn, role === "outer" && styles.roleActive]}
//             onPress={() => setRole("outer")}
//           >
//             <Ionicons name="earth" size={18} color="#fff" />
//             <Text style={styles.roleText}>Outer</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Email */}
//         <View style={styles.inputBox}>
//           <Ionicons name="mail-outline" size={20} color="#9ca3af" />
//           <TextInput
//             placeholder="Email"
//             placeholderTextColor="#9ca3af"
//             style={styles.input}
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>

//         {/* Password */}
//         <View style={styles.inputBox}>
//           <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#9ca3af"
//             style={styles.input}
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />
//         </View>

//         {/* Forgot Password */}
//         <TouchableOpacity
//           style={styles.forgot}
//           onPress={() => router.push("/auth/forgot-password")}
//         >
//           <Text style={styles.forgotText}>Forgot Password?</Text>
//         </TouchableOpacity>

//         {/* Login Button */}
//         <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
//           {loading ? (
//             <ActivityIndicator color="#0f172a" />
//           ) : (
//             <Text style={styles.loginText}>LOGIN AS {role.toUpperCase()}</Text>
//           )}
//         </TouchableOpacity>

//         {/* Register */}
//         {role !== "admin" && role !== "superAdmin" && (
//           <View style={styles.registerBox}>
//             <Text style={styles.registerLabel}>New here?</Text>
//             <TouchableOpacity onPress={() => router.push("/auth/register")}>
//               <Text style={styles.registerText}> Register</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// /* 🎨 STYLES */
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#0f172a",
//     justifyContent: "center",
//     paddingHorizontal: 24,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   logo: {
//     width: 90,
//     height: 90,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#22c55e",
//     letterSpacing: 2,
//   },
//   subtitle: {
//     color: "#94a3b8",
//     fontSize: 13,
//     marginTop: 6,
//   },
//   card: {
//     backgroundColor: "#1e293b",
//     padding: 22,
//     borderRadius: 18,
//     elevation: 8,
//   },
//   roleBox: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginBottom: 22,
//   },
//   roleBtn: {
//     width: "48%",
//     flexDirection: "row",
//     gap: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderRadius: 12,
//     backgroundColor: "#334155",
//     marginBottom: 10,
//   },
//   roleActive: {
//     backgroundColor: "#22c55e",
//   },
//   roleText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   inputBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#0f172a",
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     paddingVertical: 14,
//     marginBottom: 18,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 12,
//     color: "#fff",
//     fontSize: 15,
//   },
//   forgot: {
//     alignItems: "flex-end",
//     marginBottom: 20,
//   },
//   forgotText: {
//     color: "#22c55e",
//     fontSize: 13,
//     fontWeight: "500",
//   },
//   loginBtn: {
//     backgroundColor: "#22c55e",
//     paddingVertical: 15,
//     borderRadius: 14,
//     alignItems: "center",
//     elevation: 6,
//   },
//   loginText: {
//     color: "#0f172a",
//     fontSize: 16,
//     fontWeight: "bold",
//     letterSpacing: 1,
//   },
//   registerBox: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   registerLabel: {
//     color: "#9ca3af",
//   },
//   registerText: {
//     color: "#22c55e",
//     fontWeight: "600",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/superadmin/login", // 🔥 Replace with your PC IP
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Role Based Navigation (Backend decides role)
      if (data.user.role === "superadmin") {
        router.replace("/tabs/superAdminTabs");
      } else if (data.user.role === "admin") {
        router.replace("/tabs/adminTabs");
      } else if (data.user.role === "user") {
        router.replace("/tabs/userTabs");
      } else {
        router.replace("/tabs/homeUserTabs");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2964/2964514.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>GYM FIT PRO</Text>
        <Text style={styles.subtitle}>Train Hard • Stay Strong • Be Fit</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Email */}
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgot}
          onPress={() => router.push("/auth/forgot-password")}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="#0f172a" />
          ) : (
            <Text style={styles.loginText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        {/* Register */}
        <View style={styles.registerBox}>
          <Text style={styles.registerLabel}>New here?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text style={styles.registerText}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#22c55e",
    letterSpacing: 2,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 6,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 22,
    borderRadius: 18,
    elevation: 8,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 18,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    color: "#fff",
    fontSize: 15,
  },
  forgot: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "500",
  },
  loginBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    elevation: 6,
  },
  loginText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  registerBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerLabel: {
    color: "#9ca3af",
  },
  registerText: {
    color: "#22c55e",
    fontWeight: "600",
  },
});
