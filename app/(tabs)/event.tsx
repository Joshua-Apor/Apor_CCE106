import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import {
  useFocusEffect,
  useRouter,
} from "expo-router";

import EventCard from "../../components/EventCard";
import { events } from "../../constants/events";

type EventFilter =
  | "All"
  | "Programming"
  | "Database"
  | "Design"
  | "Upcoming"
  | "In Progress"
  | "Completed"
  | "Joined";

const filters: EventFilter[] = [
  "All",
  "Programming",
  "Database",
  "Design",
  "Upcoming",
  "In Progress",
  "Completed",
  "Joined",
];

export default function EventsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [filter, setFilter] =
    useState<EventFilter>("All");
  const [joinedEventIds, setJoinedEventIds] =
    useState<string[]>([]);
  const isWideLayout = width >= 700;

  useFocusEffect(
    useCallback(() => {
      const loadJoinedEvents = async () => {
        const joinedStatuses = await Promise.all(
          events.map(async (event) => {
            const savedStatus =
              await AsyncStorage.getItem(
                `joinedEvent_${event.id}`
              );

            return savedStatus === "true"
              ? event.id
              : null;
          })
        );

        setJoinedEventIds(
          joinedStatuses.filter(
            (eventId): eventId is string =>
              eventId !== null
          )
        );
      };

      loadJoinedEvents();
    }, [])
  );

  const filteredEvents =
    filter === "All"
      ? events
      : filter === "Joined"
      ? events.filter((event) =>
          joinedEventIds.includes(event.id) ||
          event.availability === "Joined"
        )
      : ["Upcoming", "In Progress", "Completed"].includes(
          filter
        )
      ? events.filter(
          (event) => event.status === filter
        )
      : events.filter(
          (event) => event.category === filter
        );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>
              EVENTMATE
            </Text>
            <Text style={styles.title}>
              Events
            </Text>
            <Text style={styles.subtitle}>
              Browse and join campus activities.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Browse Events
          </Text>
          <Text style={styles.sectionLabel}>
            FILTERS
          </Text>
        </View>

        <Text style={styles.resultCount}>
          {filteredEvents.length} event
          {filteredEvents.length === 1 ? "" : "s"} shown
        </Text>

        <View style={styles.filters}>
          {filters.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterButton,
                filter === item && styles.activeFilter,
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
          ))}
        </View>

        <FlatList
          key={isWideLayout ? "wide" : "narrow"}
          data={filteredEvents}
          numColumns={isWideLayout ? 2 : 1}
          columnWrapperStyle={
            isWideLayout
              ? styles.columnWrapper
              : undefined
          }
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
                })
              }
            >
              <EventCard
                event={{
                  ...item,
                  availability:
                    joinedEventIds.includes(item.id) ||
                    item.availability === "Joined"
                      ? "Joined"
                      : item.availability,
                }}
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                No Events Found
              </Text>

              <Text style={styles.emptyText}>
                There are no events in this filter.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3EDE2",
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 24,
  },

  header: {
    backgroundColor: "#2B2118",
    borderRadius: 24,
    padding: 24,
    minHeight: 150,
    justifyContent: "space-between",
    marginBottom: 24,
  },

  eyebrow: {
    color: "#F3A847",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginBottom: 18,
  },

  title: {
    color: "#FFF9EF",
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 8,
  },

  subtitle: {
    color: "#C9BDAE",
    fontSize: 14,
    fontWeight: "500",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#2B2118",
    fontSize: 21,
    fontWeight: "800",
  },

  sectionLabel: {
    color: "#968A7D",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.3,
  },

  resultCount: {
    color: "#8A7D70",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },

  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },

  filterButton: {
    minWidth: 76,
    minHeight: 34,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFDF8",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E8DED0",
    alignItems: "center",
    justifyContent: "center",
  },

  activeFilter: {
    backgroundColor: "#2B2118",
    borderColor: "#2B2118",
  },

  filterText: {
    color: "#8A7D70",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },

  activeFilterText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  listContent: {
    paddingBottom: 30,
  },

  columnWrapper: {
    gap: 12,
  },

  emptyContainer: {
    alignItems: "center",
    paddingTop: 50,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2118",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#968A7D",
    textAlign: "center",
  },
});
