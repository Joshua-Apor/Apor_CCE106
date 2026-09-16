import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Link,
  useFocusEffect,
  useRouter,
} from "expo-router";
import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import EventCard from "../../components/EventCard";
import StatCard from "../../components/StatCard";
import { events } from "../../constants/events";

export default function DashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWideLayout = width >= 700;

  const [studentName, setStudentName] =
    useState("Student");
  const [joinedCount, setJoinedCount] = useState(
    events.filter(
      (event) => event.availability === "Joined"
    ).length
  );
  const [joinedEventIds, setJoinedEventIds] =
    useState<string[]>(
      events
        .filter(
          (event) => event.availability === "Joined"
        )
        .map((event) => event.id)
    );
  const initial = studentName
    .trim()
    .charAt(0)
    .toUpperCase() || "S";

  useFocusEffect(
    useCallback(() => {
      const loadDashboardData = async () => {
        try {
          const savedName =
            await AsyncStorage.getItem(
              "studentName"
            );
          const joinedStatuses = await Promise.all(
            events.map(async (event) => {
              const savedStatus =
                await AsyncStorage.getItem(
                  `joinedEvent_${event.id}`
                );

              return savedStatus === "true" ||
                event.availability === "Joined"
                ? event.id
                : null;
            })
          );

          if (
            savedName &&
            savedName.trim() !== ""
          ) {
            setStudentName(savedName);
          } else {
            setStudentName("Student");
          }

          setJoinedCount(
            joinedStatuses.filter(Boolean).length
          );
          setJoinedEventIds(
            joinedStatuses.filter(
              (eventId): eventId is string =>
                eventId !== null
            )
          );
        } catch (error) {
          console.log(
            "Error loading dashboard data:",
            error
          );
        }
      };

      loadDashboardData();
    }, [])
  );

  const upcomingCount = events.filter(
    (event) => event.status === "Upcoming"
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.eyebrow}>
                EVENTMATE
              </Text>

              <Text style={styles.title}>
                Dashboard
              </Text>

              <Text style={styles.subtitle}>
                Welcome back, {studentName}
              </Text>
            </View>

            <View style={styles.profileButton}>
              <Text style={styles.profileLetter}>
                {initial}
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Overview
            </Text>
            <Text style={styles.sectionLabel}>
              CURRENT
            </Text>
          </View>

      {/* Statistics */}
      <View
        style={[
          styles.stats,
          isWideLayout && styles.wideStats,
        ]}
      >
        <StatCard
          title="Total Events"
          value={String(events.length)}
          color="#2B2118"
          style={
            isWideLayout
              ? styles.wideStatCard
              : undefined
          }
        />

        <StatCard
          title="Joined Events"
          value={String(joinedCount)}
          color="#2B2118"
          style={
            isWideLayout
              ? styles.wideStatCard
              : undefined
          }
        />

        <StatCard
          title="Upcoming Events"
          value={String(upcomingCount)}
          color="#2B2118"
          style={
            isWideLayout
              ? styles.wideStatCard
              : undefined
          }
        />

        <StatCard
          title="Available"
          value={String(
            events.length - joinedCount
          )}
          color="#2B2118"
          style={
            isWideLayout
              ? styles.wideStatCard
              : undefined
          }
        />
      </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Quick Actions
            </Text>
          </View>

          <View style={styles.actionsCard}>
            <TouchableOpacity
              style={styles.actionRow}
              onPress={() =>
                router.push("/(tabs)/event")
              }
              activeOpacity={0.7}
            >
              <View style={styles.actionNumber}>
                <Text style={styles.actionNumberText}>
                  01
                </Text>
              </View>
              <Text style={styles.actionTitle}>
                Browse Events
              </Text>
              <Text style={styles.actionArrow}>
                {">"}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Link
              href="/(tabs)/profile"
              style={styles.actionLink}
            >
              <View style={styles.actionRow}>
                <View style={styles.actionNumber}>
                  <Text style={styles.actionNumberText}>
                    02
                  </Text>
                </View>
                <Text style={styles.actionTitle}>
                  Edit Profile
                </Text>
                <Text style={styles.actionArrow}>
                  {">"}
                </Text>
              </View>
            </Link>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Recent Events
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push("/(tabs)/event")
              }
              activeOpacity={0.7}
            >
              <Text style={styles.sectionLabel}>
                VIEW ALL
              </Text>
            </TouchableOpacity>
          </View>

          {events.map((event) => (
            <TouchableOpacity
              key={event.id}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/event/[id]",
                  params: {
                    id: event.id,
                  },
                })
              }
            >
              <EventCard
                event={{
                  ...event,
                  availability:
                    joinedEventIds.includes(event.id) ||
                    event.availability === "Joined"
                      ? "Joined"
                      : event.availability,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3EDE2",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  container: {
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
    minHeight: 170,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },

  headerContent: {
    flex: 1,
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

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3A847",
    alignItems: "center",
    justifyContent: "center",
  },

  profileLetter: {
    color: "#2B2118",
    fontSize: 18,
    fontWeight: "900",
  },

  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -5,
    marginBottom: 26,
  },

  wideStats: {
    justifyContent: "flex-start",
    gap: 12,
  },

  wideStatCard: {
    width: "23%",
    minWidth: 150,
    marginHorizontal: 5,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  actionsCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 4,
    marginBottom: 26,
  },

  actionRow: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
  },

  actionNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F3EDE2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  actionNumberText: {
    color: "#C27A27",
    fontSize: 10,
    fontWeight: "800",
  },

  actionTitle: {
    flex: 1,
    color: "#2B2118",
    fontSize: 15,
    fontWeight: "700",
  },

  actionArrow: {
    color: "#C27A27",
    fontSize: 20,
    fontWeight: "700",
  },

  actionLink: {
    textDecorationLine: "none",
  },

  divider: {
    height: 1,
    backgroundColor: "#E8DED0",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 22,
    paddingHorizontal: 4,
  },

  footerText: {
    color: "#968A7D",
    fontSize: 12,
    fontWeight: "600",
  },

  footerVersion: {
    color: "#B1A498",
    fontSize: 11,
  },
});
