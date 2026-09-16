import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

type Event = {
  id: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  time?: string;
  venue?: string;
  availability?: string;
  status: string;
};

type EventCardProps = {
  event: Event;
};

export default function EventCard({
  event,
}: EventCardProps) {
  return (
    <View style={styles.card}>
      {/* Event Title */}
      <Text style={styles.title}>
        {event.title}
      </Text>

      {/* Category */}
      <Text style={styles.category}>
        {event.category}
      </Text>

      {event.venue && (
        <Text style={styles.meta}>
          {event.venue}
        </Text>
      )}

      {/* Description */}
      {event.description && (
        <Text style={styles.description}>
          {event.description}
        </Text>
      )}

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <Text style={styles.date}>
          {event.date}
          {event.time ? `, ${event.time}` : ""}
        </Text>

        <View
          style={[
            styles.statusBadge,
            event.status === "Completed"
              ? styles.completed
              : event.status === "In Progress"
              ? styles.inProgress
              : styles.upcoming,
          ]}
        >
          <Text style={styles.statusText}>
            {event.status}
          </Text>
        </View>
      </View>

      {event.availability && (
        <Text style={styles.availability}>
          {event.availability}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#2B2118",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#2B2118",
    marginBottom: 7,
  },

  category: {
    fontSize: 14,
    fontWeight: "800",
    color: "#C27A27",
    marginBottom: 7,
  },

  description: {
    fontSize: 14,
    color: "#8A7D70",
    lineHeight: 20,
    marginBottom: 12,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },

  date: {
    fontSize: 13,
    color: "#968A7D",
    flexShrink: 1,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  completed: {
    backgroundColor: "#DDEDD5",
  },

  meta: {
    color: "#968A7D",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },

  inProgress: {
    backgroundColor: "#F8D8A8",
  },

  upcoming: {
    backgroundColor: "#F3EDE2",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2B2118",
  },

  availability: {
    color: "#C27A27",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 10,
    textTransform: "uppercase",
  },
});
