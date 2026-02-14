import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  return (
    <LinearGradient colors={["#1e3c72", "#2a5298"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>🏋️ Gym Dashboard</Text>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Total Members</Text>
            <Text style={styles.value}>124</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Active Members</Text>
            <Text style={styles.value}>98</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Total Trainers</Text>
            <Text style={styles.value}>6</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>New Joins Today</Text>
            <Text style={styles.value}>5</Text>
          </View>
        </View>

        {/* Line Chart */}
        <Text style={styles.chartTitle}>📈 Weekly Check-ins</Text>
        <LineChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
              {
                data: [12, 18, 15, 22, 30, 28, 20],
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />

        {/* Pie Chart */}
        <Text style={styles.chartTitle}>👥 Members Overview</Text>
        <PieChart
          data={[
            {
              name: "Active",
              population: 98,
              color: "#4CAF50",
              legendFontColor: "#fff",
              legendFontSize: 14,
            },
            {
              name: "Inactive",
              population: 26,
              color: "#FF5252",
              legendFontColor: "#fff",
              legendFontSize: 14,
            },
          ]}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </ScrollView>
    </LinearGradient>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#1e3c72",
  backgroundGradientTo: "#2a5298",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 26,
    fontWeight: "900",
    marginTop: 6,
    color: "#1e3c72",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 10,
  },
  chart: {
    borderRadius: 16,
    marginBottom: 20,
  },
});
