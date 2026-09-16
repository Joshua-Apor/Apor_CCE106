import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");

  const event = events.find(
    (item) => item.id === id
  );

  // Load joined status
  useEffect(() => {
    const loadJoinedStatus = async () => {
      if (!id) return;

      try {
        const savedStatus =
          await AsyncStorage.getItem(
            `joinedEvent_${id}`
          );

        setJoined(savedStatus === "true");
      } catch (error) {
        console.log(
          "Error loading event status:",
          error
        );
      }
    };

    loadJoinedStatus();
  }, [id]);

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
            router.replace(
              "/(tabs)/events" as any
            )
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

  const handleJoinLeave = async () => {
    try {
      if (joined) {
        await AsyncStorage.removeItem(
          `joinedEvent_${event.id}`
        );

        setJoined(false);
        setMessage("You left this event.");
      } else {
        await AsyncStorage.setItem(
          `joinedEvent_${event.id}`,
          "true"
        );

        setJoined(true);
        setMessage("You joined this event!");
      }
    } catch (error) {
      console.log(
        "Error updating event status:",
        error
      );

      setMessage(
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Back */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={styles.backText}>
          ← Back
        </Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>
        {event.title}
      </Text>

      {/* Details */}
      <View style={styles.card}>
        <Text style={styles.label}>
          Category
        </Text>

        <Text style={styles.value}>
          {event.category}
        </Text>

        <Text style={styles.label}>
          Description
        </Text>

        <Text style={styles.value}>
          {event.description}
        </Text>

        <Text style={styles.label}>
          Date
        </Text>

        <Text style={styles.value}>
          {event.date}
        </Text>

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

      {/* Join / Leave Message */}
      {message !== "" && (
        <View
          style={[
            styles.messageBox,
            joined
              ? styles.successBox
              : styles.leaveBox,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              joined
                ? styles.successText
                : styles.leaveText,
            ]}
          >
            {message}
          </Text>
        </View>
      )}

      {/* Join / Leave Button */}
      {event.status !== "Completed" && (
        <TouchableOpacity
          style={[
            styles.joinButton,
            joined && styles.leaveButton,
          ]}
          onPress={handleJoinLeave}
          activeOpacity={0.8}
        >
          <Text style={styles.joinButtonText}>
            {joined
              ? "Leave Event"
              : "Join Event"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Joined Status */}
      {joined && event.status !== "Completed" && (
        <View style={styles.joinedCard}>
          <Text style={styles.joinedIcon}>
            ✓
          </Text>

          <Text style={styles.joinedTitle}>
            You're joining this event
          </Text>

          <Text style={styles.joinedText}>
            You can leave the event anytime.
          </Text>
        </View>
      )}

      {/* View All Events */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.replace(
            "/(tabs)/events" as any
          )
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

  joinButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  leaveButton: {
    backgroundColor: "#DC2626",
  },

  joinButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  messageBox: {
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
  },

  successBox: {
    backgroundColor: "#DCFCE7",
    borderColor: "#86EFAC",
  },

  leaveBox: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
  },

  messageText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  successText: {
    color: "#15803D",
  },

  leaveText: {
    color: "#B91C1C",
  },

  joinedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginTop: 15,
    alignItems: "center",
  },

  joinedIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DCFCE7",
    color: "#15803D",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 8,
  },

  joinedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },

  joinedText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 5,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
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
