import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundGlow} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Small label */}
        <Text style={styles.eyebrow}>REACT NATIVE • EXPO</Text>

        {/* App Title */}
        <Text style={styles.title}>TaskFlow</Text>

        <Text style={styles.subtitle}>
          A simple to-do list app to organize your tasks, manage your time,
          and get things done.
        </Text>

        {/* Student Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Student Details</Text>

            <View style={styles.dot} />
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>STUDENT</Text>
            <Text style={styles.value}>Joshua Benedict T. Apor</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>COURSE</Text>
            <Text style={styles.value}>BSIT</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>SECTION</Text>
            <Text style={styles.value}>CCE106 - 2063</Text>
          </View>
        </View>

        {/* App Idea */}
        <View style={styles.ideaBox}>
          <Text style={styles.ideaLabel}>APP IDEA</Text>

          <Text style={styles.ideaTitle}>
            Organize tasks.{"\n"}
            Get things done.
          </Text>

          <Text style={styles.ideaText}>
            TaskFlow is a simple to-do list app that helps users create,
            organize, and complete their daily tasks through a clean and
            friendly interface.
          </Text>
        </View>

        {/* Extra Feature Section */}
        <View style={styles.featureBox}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureIconText}>✓</Text>
          </View>

          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Manage your tasks</Text>

            <Text style={styles.featureText}>
              Create your daily to-do list, mark completed tasks, and stay
              organized throughout the day.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1020",
  },

  backgroundGlow: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#5B5FEF",
    opacity: 0.12,
    top: -100,
    right: -100,
  },

  content: {
    paddingHorizontal: 26,
    paddingTop: 35,
    paddingBottom: 30,
  },

  eyebrow: {
    color: "#8E93FF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: -1.5,
    marginBottom: 10,
  },

  subtitle: {
    color: "#A9AEC4",
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 340,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#151B31",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#252C48",
    marginBottom: 18,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#72E6A8",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },

  label: {
    color: "#737B9B",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  value: {
    color: "#E8EAF4",
    fontSize: 15,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#252C48",
    marginVertical: 12,
  },

  ideaBox: {
    backgroundColor: "#6366F1",
    borderRadius: 20,
    padding: 22,
    marginBottom: 18,
    overflow: "hidden",
  },

  ideaLabel: {
    color: "#C9CBFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginBottom: 10,
  },

  ideaTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    lineHeight: 31,
    fontWeight: "800",
    marginBottom: 12,
  },

  ideaText: {
    color: "#E7E7FF",
    fontSize: 14,
    lineHeight: 21,
  },

  featureBox: {
    backgroundColor: "#151B31",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#252C48",
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#72E6A8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  featureIconText: {
    color: "#0B1020",
    fontSize: 22,
    fontWeight: "900",
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },

  featureText: {
    color: "#8F96AE",
    fontSize: 12,
    lineHeight: 18,
  },
});