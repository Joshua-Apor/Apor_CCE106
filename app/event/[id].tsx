import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
};

const events: Event[] = [
  {
    id: "1",
    title: "React Native Workshop",
    description:
      "Build the StudyFlow mobile application.",
    category: "Programming",
    date: "September 18, 2026",
    status: "Upcoming",
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
      "Present the mobile app wireframes.",
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
    status: "Upcoming",
  },
];

export default function EventDetailsScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const event = events.find(
    (item) => item.id === id
  );

  // Invalid event ID
  if (!event) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>
          Event Not Found
        </Text>

        <Text style={styles.notFoundText}>
          The event with ID "{id}" does not exist.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            Go Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            router.replace("/(tabs)/events" as any)
          }
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>
            View All Events
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={styles.backText}>
          ← Back
        </Text>
      </TouchableOpacity>

      {/* Event Title */}
      <Text style={styles.title}>
        {event.title}
      </Text>

      {/* Event Details */}
      <View style={styles.card}>
        {/* Category */}
        <Text style={styles.label}>
          Category
        </Text>

        <Text style={styles.value}>
          {event.category}
        </Text>

        {/* Description */}
        <Text style={styles.label}>
          Description
        </Text>

        <Text style={styles.value}>
          {event.description}
        </Text>

        {/* Date */}
        <Text style={styles.label}>
          Date
        </Text>

        <Text style={styles.value}>
          {event.date}
        </Text>

        {/* Status */}
        <Text style={styles.label}>
          Status
        </Text>

        <View
          style={[
            styles.statusBadge,
            event.status === "Completed"
              ? styles.completed
              : styles.upcoming,
          ]}
        >
          <Text style={styles.statusText}>
            {event.status}
          </Text>
        </View>
      </View>

      {/* View All Events */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.replace("/(tabs)/events" as any)
        }
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          View All Events
        </Text>
      </TouchableOpacity>
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

  backButton: {
    marginBottom: 20,
  },

  backText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "600",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 14,
    marginBottom: 5,
  },

  value: {
    fontSize: 17,
    color: "#111827",
    lineHeight: 24,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 5,
  },

  upcoming: {
    backgroundColor: "#DBEAFE",
  },

  completed: {
    backgroundColor: "#DCFCE7",
  },

  statusText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#2563EB",
  },

  secondaryButtonText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "bold",
  },

  notFoundContainer: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 20,
    justifyContent: "center",
  },

  notFoundTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 10,
    textAlign: "center",
  },

  notFoundText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 10,
  },
});
