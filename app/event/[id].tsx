import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { events } from "../../constants/events";

export default function EventDetailsScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const event = events.find(
    (item) => item.id === id
  );

  const [joined, setJoined] = useState(
    event?.availability === "Joined"
  );
  const [message, setMessage] = useState("");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/(tabs)/event");
  };

  // Load joined status
  useEffect(() => {
    const loadJoinedStatus = async () => {
      if (!id) return;

      try {
        const savedStatus =
          await AsyncStorage.getItem(
            `joinedEvent_${id}`
          );

        setJoined(
          savedStatus === "true" ||
            event?.availability === "Joined"
        );
      } catch (error) {
        console.log(
          "Error loading event status:",
          error
        );
      }
    };

    loadJoinedStatus();
  }, [event?.availability, id]);

  // Invalid event ID
  if (!event) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>
          Event Not Found
        </Text>

        <Text style={styles.notFoundText}>
          Event ID: {id}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            Go Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            router.replace("/(tabs)/event")
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
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backText}>
          {"<- Back"}
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
          {event.date}, {event.time}
        </Text>

        <Text style={styles.label}>
          Venue
        </Text>

        <Text style={styles.value}>
          {event.venue}
        </Text>

        <Text style={styles.label}>
          Availability
        </Text>

        <Text style={styles.value}>
          {joined ? "Joined" : event.availability}
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
        <Pressable
          style={({ pressed }) => [
            styles.joinButton,
            joined && styles.leaveButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleJoinLeave}
        >
          <Text style={styles.joinButtonText}>
            {joined
              ? "Leave Event"
              : "Join Event"}
          </Text>
        </Pressable>
      )}

      {/* Joined Status */}
      {joined && event.status !== "Completed" && (
        <View style={styles.joinedCard}>
          <Text style={styles.joinedIcon}>
            OK
          </Text>

          <Text style={styles.joinedTitle}>
            You are joining this event
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
          router.replace("/(tabs)/event")
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
    backgroundColor: "#F3EDE2",
  },

  content: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    padding: 22,
    paddingBottom: 40,
  },

  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFDF8",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: 18,
  },

  backText: {
    color: "#C27A27",
    fontSize: 14,
    fontWeight: "800",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2B2118",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#2B2118",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#968A7D",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 14,
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    color: "#2B2118",
    fontWeight: "700",
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
    backgroundColor: "#F3EDE2",
  },

  completed: {
    backgroundColor: "#DDEDD5",
  },

  statusText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2B2118",
  },

  joinButton: {
    backgroundColor: "#C27A27",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  leaveButton: {
    backgroundColor: "#A84A3D",
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  joinButtonText: {
    color: "#FFF9EF",
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
    backgroundColor: "#EEF5E9",
    borderColor: "#BBD1A8",
  },

  leaveBox: {
    backgroundColor: "#FFF1EF",
    borderColor: "#E7B7AE",
  },

  messageText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  successText: {
    color: "#557A42",
  },

  leaveText: {
    color: "#A84A3D",
  },

  joinedCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 15,
    padding: 18,
    marginTop: 15,
    alignItems: "center",
  },

  joinedIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3EDE2",
    color: "#C27A27",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 8,
  },

  joinedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2B2118",
  },

  joinedText: {
    fontSize: 13,
    color: "#8A7D70",
    marginTop: 5,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#C27A27",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFF9EF",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    backgroundColor: "#FFFDF8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#C27A27",
  },

  secondaryButtonText: {
    color: "#C27A27",
    fontSize: 16,
    fontWeight: "bold",
  },

  notFoundContainer: {
    flex: 1,
    backgroundColor: "#F3EDE2",
    padding: 20,
    justifyContent: "center",
  },

  notFoundTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2B2118",
    marginBottom: 10,
    textAlign: "center",
  },

  notFoundText: {
    fontSize: 16,
    color: "#8A7D70",
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 10,
  },
});

