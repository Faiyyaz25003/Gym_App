// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useState } from "react";
// import {
//   Alert,
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { BarChart, LineChart } from "react-native-chart-kit";

// const screenWidth = Dimensions.get("window").width;

// export default function ProgressComparison() {
//   const [beforeImage, setBeforeImage] = useState(null);
//   const [afterImage, setAfterImage] = useState(null);
//   const [resultData, setResultData] = useState(null);

//   // 📸 Pick Image
//   const pickImage = async (type) => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission Required", "Allow gallery access");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       if (type === "before") {
//         setBeforeImage(result.assets[0].uri);
//       } else {
//         setAfterImage(result.assets[0].uri);
//       }
//     }
//   };

//   // 🔥 Dummy Compare
//   const handleCompare = () => {
//     if (!beforeImage || !afterImage) {
//       Alert.alert("Error", "Please select both images");
//       return;
//     }

//     const staticResult = {
//       weightLoss: "5 kg",
//       waistReduce: "3 inches",
//       fatLoss: "6%",
//       improvement: "12",
//       summary: "🔥 Amazing fat loss & visible muscle toning detected!",
//     };

//     setResultData(staticResult);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>AI Progress Comparison</Text>
//       <Text style={styles.subtitle}>Upload your transformation photos 💪</Text>

//       {/* Image Section */}
//       <View style={styles.imageContainer}>
//         <View style={styles.imageBox}>
//           <Text style={styles.imageLabel}>Before</Text>
//           <TouchableOpacity onPress={() => pickImage("before")}>
//             {beforeImage ? (
//               <Image source={{ uri: beforeImage }} style={styles.image} />
//             ) : (
//               <View style={styles.placeholder}>
//                 <Ionicons name="camera" size={30} color="#aaa" />
//                 <Text style={styles.placeholderText}>Select Image</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>

//         <View style={styles.imageBox}>
//           <Text style={styles.imageLabel}>After</Text>
//           <TouchableOpacity onPress={() => pickImage("after")}>
//             {afterImage ? (
//               <Image source={{ uri: afterImage }} style={styles.image} />
//             ) : (
//               <View style={styles.placeholder}>
//                 <Ionicons name="camera" size={30} color="#aaa" />
//                 <Text style={styles.placeholderText}>Select Image</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Compare Button */}
//       <TouchableOpacity style={styles.button} onPress={handleCompare}>
//         <Text style={styles.buttonText}>Analyze Progress</Text>
//       </TouchableOpacity>

//       {/* Result Section */}
//       {resultData && (
//         <View style={styles.resultCard}>
//           <Text style={styles.resultTitle}>Transformation Report</Text>

//           {/* Stats Grid */}
//           <View style={styles.statsContainer}>
//             <View style={styles.statBox}>
//               <Ionicons name="trending-down" size={22} color="#00ffae" />
//               <Text style={styles.statValue}>{resultData.weightLoss}</Text>
//               <Text style={styles.statLabel}>Weight Lost</Text>
//             </View>

//             <View style={styles.statBox}>
//               <Ionicons name="resize" size={22} color="#00c3ff" />
//               <Text style={styles.statValue}>{resultData.waistReduce}</Text>
//               <Text style={styles.statLabel}>Waist Reduced</Text>
//             </View>

//             <View style={styles.statBox}>
//               <Ionicons name="flame" size={22} color="#ff7675" />
//               <Text style={styles.statValue}>{resultData.fatLoss}</Text>
//               <Text style={styles.statLabel}>Fat Loss</Text>
//             </View>

//             <View style={styles.statBox}>
//               <Ionicons name="analytics" size={22} color="#a29bfe" />
//               <Text style={styles.statValue}>{resultData.improvement}%</Text>
//               <Text style={styles.statLabel}>Improvement</Text>
//             </View>
//           </View>

//           {/* Summary */}
//           <View style={styles.summaryBox}>
//             <Text style={styles.summaryText}>{resultData.summary}</Text>
//           </View>

//           {/* Line Chart */}
//           <LineChart
//             data={{
//               labels: ["Before", "After"],
//               datasets: [
//                 {
//                   data: [100, 88],
//                 },
//               ],
//             }}
//             width={screenWidth - 60}
//             height={200}
//             chartConfig={chartConfig}
//             bezier
//             style={styles.chart}
//           />

//           {/* Bar Chart */}
//           <BarChart
//             data={{
//               labels: ["Weight", "Waist", "Fat"],
//               datasets: [
//                 {
//                   data: [5, 3, 6],
//                 },
//               ],
//             }}
//             width={screenWidth - 60}
//             height={200}
//             chartConfig={chartConfig}
//             style={styles.chart}
//           />
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const chartConfig = {
//   backgroundColor: "#1c1c1e",
//   backgroundGradientFrom: "#1c1c1e",
//   backgroundGradientTo: "#1c1c1e",
//   decimalPlaces: 0,
//   color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
//   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#111",
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#aaa",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   imageContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   imageBox: {
//     width: "48%",
//   },
//   imageLabel: {
//     color: "#fff",
//     fontWeight: "bold",
//     marginBottom: 5,
//     textAlign: "center",
//   },
//   image: {
//     width: "100%",
//     height: 220,
//     borderRadius: 15,
//   },
//   placeholder: {
//     height: 220,
//     backgroundColor: "#1c1c1e",
//     borderRadius: 15,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   placeholderText: {
//     color: "#aaa",
//     marginTop: 5,
//   },
//   button: {
//     marginTop: 25,
//     backgroundColor: "#6c5ce7",
//     padding: 16,
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   resultCard: {
//     marginTop: 30,
//     backgroundColor: "#1c1c1e",
//     padding: 20,
//     borderRadius: 20,
//   },
//   resultTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   statsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   statBox: {
//     width: "48%",
//     backgroundColor: "#2c2c2e",
//     padding: 15,
//     borderRadius: 15,
//     marginBottom: 15,
//     alignItems: "center",
//   },
//   statValue: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 5,
//   },
//   statLabel: {
//     color: "#aaa",
//     fontSize: 12,
//     marginTop: 3,
//   },
//   summaryBox: {
//     backgroundColor: "#6c5ce7",
//     padding: 15,
//     borderRadius: 15,
//     marginVertical: 15,
//   },
//   summaryText: {
//     color: "#fff",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   chart: {
//     marginVertical: 10,
//     borderRadius: 16,
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function ProgressComparison() {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [resultData, setResultData] = useState(null);

  const pickImage = async (type) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Allow gallery access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;

      if (type === "before") {
        setBeforeImage(base64Image);
      } else {
        setAfterImage(base64Image);
      }
    }
  };

  const handleCompare = async () => {
    if (!beforeImage || !afterImage) {
      Alert.alert("Error", "Please select both images");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/progress/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            beforeImage,
            afterImage,
          }),
        },
      );

      const data = await response.json();
      setResultData(data);
    } catch (error) {
      Alert.alert("Server Error", "Check backend connection");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Progress Comparison</Text>

      <View style={styles.imageContainer}>
        <View style={styles.imageBox}>
          <Text style={styles.imageLabel}>Before</Text>
          <TouchableOpacity onPress={() => pickImage("before")}>
            {beforeImage ? (
              <Image source={{ uri: beforeImage }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons name="camera" size={30} color="#aaa" />
                <Text style={styles.placeholderText}>Select Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.imageBox}>
          <Text style={styles.imageLabel}>After</Text>
          <TouchableOpacity onPress={() => pickImage("after")}>
            {afterImage ? (
              <Image source={{ uri: afterImage }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons name="camera" size={30} color="#aaa" />
                <Text style={styles.placeholderText}>Select Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCompare}>
        <Text style={styles.buttonText}>Analyze Progress</Text>
      </TouchableOpacity>

      {resultData && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Transformation Report</Text>

          <Text style={styles.summaryText}>{resultData.summary}</Text>

          <LineChart
            data={{
              labels: ["Before", "After"],
              datasets: [{ data: [100, 88] }],
            }}
            width={screenWidth - 40}
            height={200}
            chartConfig={chartConfig}
          />

          <BarChart
            data={{
              labels: ["Weight", "Waist", "Fat"],
              datasets: [{ data: [5, 3, 6] }],
            }}
            width={screenWidth - 40}
            height={200}
            chartConfig={chartConfig}
          />
        </View>
      )}
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: "#1c1c1e",
  backgroundGradientFrom: "#1c1c1e",
  backgroundGradientTo: "#1c1c1e",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
  labelColor: () => "#fff",
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#111", flexGrow: 1 },
  title: { fontSize: 22, color: "#fff", textAlign: "center", marginBottom: 20 },
  imageContainer: { flexDirection: "row", justifyContent: "space-between" },
  imageBox: { width: "48%" },
  imageLabel: { color: "#fff", textAlign: "center", marginBottom: 5 },
  image: { width: "100%", height: 200, borderRadius: 15 },
  placeholder: {
    height: 200,
    backgroundColor: "#1c1c1e",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { color: "#aaa" },
  button: {
    marginTop: 20,
    backgroundColor: "#6c5ce7",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  resultCard: {
    marginTop: 30,
    backgroundColor: "#1c1c1e",
    padding: 20,
    borderRadius: 20,
  },
  resultTitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  summaryText: { color: "#fff", textAlign: "center", marginBottom: 20 },
});
