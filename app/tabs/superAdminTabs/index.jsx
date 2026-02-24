import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";

const BASE_URL = "http://localhost:5000";

export default function GymAdminPanel() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(false);

  //////////////////////////////////////////////////////////
  // FETCH ADMINS
  //////////////////////////////////////////////////////////

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setGyms(data.admins || []);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  //////////////////////////////////////////////////////////
  // DASHBOARD DATA
  //////////////////////////////////////////////////////////

  const totalAdmins = gyms.length;
  const activeAdmins = gyms.filter((a) => !a.isBlocked).length;
  const blockedAdmins = gyms.filter((a) => a.isBlocked).length;
  const totalRevenue = 150000;

  //////////////////////////////////////////////////////////
  // PIE DATA
  //////////////////////////////////////////////////////////

  const pieData = [
    {
      name: "Active",
      population: activeAdmins,
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Blocked",
      population: blockedAdmins,
      color: "#F44336",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
  ];

  //////////////////////////////////////////////////////////
  // BAR DATA
  //////////////////////////////////////////////////////////

  const barData = {
    labels: ["Total", "Active", "Blocked"],
    datasets: [
      {
        data: [totalAdmins, activeAdmins, blockedAdmins],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: () => "#333",
    propsForBackgroundLines: {
      stroke: "#e3e3e3",
    },
  };

  //////////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////////

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Admin Dashboard</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          {/* DASHBOARD CARDS */}
          <View
            style={[
              styles.dashboardContainer,
              { flexDirection: isTablet ? "row" : "column" },
            ]}
          >
            <DashboardCard
              title="Total Admins"
              value={totalAdmins}
              isTablet={isTablet}
            />
            <DashboardCard
              title="Active"
              value={activeAdmins}
              isTablet={isTablet}
            />
            <DashboardCard
              title="Blocked"
              value={blockedAdmins}
              isTablet={isTablet}
            />
            <DashboardCard
              title="Revenue"
              value={`₹ ${totalRevenue}`}
              isTablet={isTablet}
            />
          </View>

          {/* PIE CHART */}
          <Text style={styles.chartTitle}>Admin Status</Text>
          <View style={styles.chartWrapper}>
            <PieChart
              data={pieData}
              width={width - 32}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="10"
              absolute
            />
          </View>

          {/* BAR CHART */}
          <Text style={styles.chartTitle}>Admin Overview</Text>
          <View style={styles.chartWrapper}>
            <BarChart
              data={barData}
              width={width - 32}
              height={260}
              chartConfig={chartConfig}
              fromZero
              showValuesOnTopOfBars
              style={{ borderRadius: 16 }}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

//////////////////////////////////////////////////////////
// CARD COMPONENT
//////////////////////////////////////////////////////////

const DashboardCard = ({ title, value, isTablet }) => (
  <View
    style={[
      styles.card,
      {
        width: isTablet ? "48%" : "100%",
      },
    ]}
  >
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

//////////////////////////////////////////////////////////
// STYLES
//////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#f4f6f9",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  dashboardContainer: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 14,
    color: "#666",
  },

  cardValue: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 6,
  },

  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
  },

  chartWrapper: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 16,
    elevation: 4,
    marginBottom: 70, // 👈 Bar graph ke niche spacing added
  },
});
