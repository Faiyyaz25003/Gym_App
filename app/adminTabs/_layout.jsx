

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

/* 🔥 Animated Icon Component */
function AnimatedTabIcon({ name, color, size, focused }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1.2 : 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(translateYAnim, {
        toValue: focused ? -4 : 0,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View
      style={{
        alignItems: "center",
        transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
      }}
    >
      <Ionicons name={name} size={size} color={color} />
      {focused && <View style={styles.activeDot} />}
    </Animated.View>
  );
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ff4757",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 4,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 18,
          left: 16,
          right: 16,
          height: 76,
          borderRadius: 28,
          backgroundColor: "#ffffff",
          paddingVertical: 12,
          elevation: 15,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
        },
      }}
    >
      {/* 🏠 Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: (props) => (
            <AnimatedTabIcon
              {...props}
              name={props.focused ? "home" : "home-outline"}
            />
          ),
        }}
      />

      {/* 👥 Members */}
      <Tabs.Screen
        name="members"
        options={{
          title: "Members",
          tabBarIcon: (props) => (
            <AnimatedTabIcon
              {...props}
              name={props.focused ? "people" : "people-outline"}
            />
          ),
        }}
      />

      {/* 🏋 Trainer */}
       <Tabs.Screen
        name="Trainer"
        options={{
          title: "Trainer",
          tabBarIcon: (props) => (
            <AnimatedTabIcon
              {...props}
              name={props.focused ? "barbell" : "barbell-outline"}
            />
          ),
        }}
      /> 

      {/* 📅 Schedule */}
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: (props) => (
            <AnimatedTabIcon
              {...props}
              name={props.focused ? "calendar" : "calendar-outline"}
            />
          ),
        }}
      />

      {/* ☰ More */}
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: (props) => (
            <AnimatedTabIcon
              {...props}
              name={props.focused ? "menu" : "menu-outline"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ff4757",
    marginTop: 4,
  },
});
