import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Link,
  useFocusEffect,
  useRouter,
} from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EventCard from "../../components/EventCard";
import StatCard from "../../components/StatCard";

type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
};

const recentEvents: Event[] = [
  {
    id: "1",
    title: "React Native Workshop",
    description:
      "Build the StudyFlow mobile application.",
    category: "Programming",
    date: "September 18, 2026",
    status: "In Progress",
  },

  {
    id: "2",
    title: "Database Review",
    description:
      "Review database normalization concepts.",
    category: "Database",
    date: "September 20, 2026",
    status: "Upcoming",
  },

  {
    id: "3",
    title: "UI Design Presentation",
    description:
      "Finish and present the mobile app wireframes.",
    category: "Design",
    date: "September 15, 2026",
    status: "Completed",
  },

  {
    id: "4",
    title: "Mathematics Class",
    description:
      "Complete the assigned mathematics problems.",
    category: "Mathematics",
    date: "September 22, 2026",
    status: "Upcoming",
  },

  {
    id: "5",
    title: "Project Documentation",
    description:
      "Submit the StudyFlow project documentation.",
    category: "Software Engineering",
    date: "September 25, 2026",
    status: "In Progress",
  },
];

export default function DashboardScreen() {
  const router = useRouter();

  const [studentName, setStudentName] =
    useState("Student");

  useFocusEffect(
    useCallback(() => {
      const loadStudentName = async () => {
        try {
          const savedName =
            await AsyncStorage.getItem(
              "studentName"
            );

          if (
            savedName &&
            savedName.trim() !== ""
          ) {
            setStudentName(savedName);
          } else {
            setStudentName("Student");
          }
        } catch (error) {
          console.log(
            "Error loading student name:",
            error
          );
        }
      };

      loadStudentName();
    }, [])
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Greeting */}
      <Text style={styles.greeting}>
        Hello, {studentName}
      </Text>

      <Text style={styles.subtitle}>
        Stay organized and keep learning.
      </Text>

      {/* Statistics */}
      <View style={styles.stats}>
        <StatCard
          title="Total Events"
          value="5"
          color="#2563EB"
        />

        <StatCard
          title="Completed"
          value="1"
          color="#16A34A"
        />

        <StatCard
          title="In Progress"
          value="2"
          color="#F59E0B"
        />

        <StatCard
          title="Upcoming"
          value="2"
          color="#7C3AED"
        />
      </View>

      {/* Events Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Recent Events
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push("/events" as any)
          }
          activeOpacity={0.7}
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Five Events */}
      {recentEvents.map((event) => (
        <TouchableOpacity
          key={event.id}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/event/[id]",
              params: {
                id: event.id,
              },
            } as any)
          }
        >
          <EventCard event={event} />
        </TouchableOpacity>
      ))}

      {/* Link Example */}
      <Link
        href="/(tabs)/profile"
        style={styles.profileLink}
      >
        Open Profile with Link
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 25,
  },

  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },

  viewAll: {
    color: "#2563EB",
    fontWeight: "600",
  },

  profileLink: {
    color: "#2563EB",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});