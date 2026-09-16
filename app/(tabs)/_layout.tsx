import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#C27A27",
        tabBarInactiveTintColor: "#968A7D",
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
          backgroundColor: "#FFFDF8",
          borderTopWidth: 1,
          borderTopColor: "#E8DED0",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {/* Dashboard */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Events */}
      <Tabs.Screen
        name="event"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
