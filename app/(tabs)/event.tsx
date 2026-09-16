import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import EventCard from "../../components/EventCard";

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

export default function EventsScreen() {
  const router = useRouter();

  const [filter, setFilter] = useState("All");

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter(
          (event) => event.status === filter
        );

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        My Events
      </Text>

      <Text style={styles.subtitle}>
        View and manage your upcoming events.
      </Text>

      {/* Filters */}
      <View style={styles.filters}>
        {["All", "Upcoming", "Completed"].map(
          (item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterButton,
                filter === item &&
                  styles.activeFilter,
              ]}
              onPress={() => setFilter(item)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item &&
                    styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Event List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/event/[id]",
                params: {
                  id: item.id,
                },
              } as any)
            }
          >
            <EventCard event={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No Events Found
            </Text>

            <Text style={styles.emptyText}>
              There are no events with the selected
              status.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 20,
  },

  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  activeFilter: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  filterText: {
    color: "#374151",
    fontSize: 13,
  },

  activeFilterText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  listContent: {
    paddingBottom: 30,
  },

  emptyContainer: {
    alignItems: "center",
    paddingTop: 50,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});