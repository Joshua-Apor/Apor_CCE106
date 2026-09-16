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

      {/* Description */}
      {event.description && (
        <Text style={styles.description}>
          {event.description}
        </Text>
      )}

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <Text style={styles.date}>
          Date: {event.date}
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 17,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },

  category: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
    marginBottom: 7,
  },

  description: {
    fontSize: 14,
    color: "#6B7280",
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
    color: "#6B7280",
    flexShrink: 1,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  completed: {
    backgroundColor: "#DCFCE7",
  },

  inProgress: {
    backgroundColor: "#DBEAFE",
  },

  upcoming: {
    backgroundColor: "#FEF3C7",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },
});