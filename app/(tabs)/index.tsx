import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const metrics = [
  {
    label: "Courses",
    value: "8",
    detail: "Current semester",
  },
  {
    label: "Units",
    value: "24",
    detail: "Enrolled units",
  },
  {
    label: "Status",
    value: "Active",
    detail: "Student account",
  },
];

const quickActions = [
  {
    title: "Courses",
    symbol: "01",
  },
  {
    title: "Profile",
    symbol: "02",
  },
  {
    title: "Schedule",
    symbol: "03",
  },
  {
    title: "Settings",
    symbol: "04",
  },
];

const activities = [
  {
    title: "Course enrollment updated",
    time: "Today",
  },
  {
    title: "Student profile accessed",
    time: "Yesterday",
  },
  {
    title: "New class schedule available",
    time: "2 days ago",
  },
  {
    title: "Semester information updated",
    time: "3 days ago",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
         
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.eyebrow}>STUDENT PORTAL</Text>

              <Text style={styles.title}>Dashboard</Text>

              <Text style={styles.subtitle}>
                Welcome back, Joshua
              </Text>
            </View>

            <View style={styles.profileButton}>
              <Text style={styles.profileLetter}>J</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.sectionLabel}>CURRENT</Text>
          </View>

          <View style={styles.metrics}>
            {metrics.map((metric) => (
              <View key={metric.label} style={styles.metricCard}>
                <Text style={styles.metricLabel}>
                  {metric.label}
                </Text>

                <Text style={styles.metricValue}>
                  {metric.value}
                </Text>

                <Text style={styles.metricDetail}>
                  {metric.detail}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>

          <View style={styles.actionsCard}>
            {quickActions.map((action, index) => (
              <View key={action.title}>
                <View style={styles.actionRow}>
                  <View style={styles.actionNumber}>
                    <Text style={styles.actionNumberText}>
                      {action.symbol}
                    </Text>
                  </View>

                  <Text style={styles.actionTitle}>
                    {action.title}
                  </Text>

                  <Text style={styles.actionArrow}>›</Text>
                </View>

                {index !== quickActions.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>

          {/* Recent Activity */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Recent Activity
            </Text>
          </View>

          <View style={styles.activityCard}>
            {activities.map((activity, index) => (
              <View key={activity.title}>
                <View style={styles.activityRow}>
                  <View style={styles.activityIndicator} />

                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>
                      {activity.title}
                    </Text>

                    <Text style={styles.activityTime}>
                      {activity.time}
                    </Text>
                  </View>
                </View>

                {index !== activities.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>

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

  /* Metrics */

  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
    marginBottom: 26,
  },

  metricCard: {
    flex: 1,
    minWidth: 145,
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 5,
    marginBottom: 10,
    minHeight: 135,
    justifyContent: "space-between",
  },

  metricLabel: {
    color: "#968A7D",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  metricValue: {
    color: "#2B2118",
    fontSize: 28,
    fontWeight: "800",
    marginVertical: 8,
  },

  metricDetail: {
    color: "#8A7D70",
    fontSize: 12,
    fontWeight: "500",
  },

  /* Quick Actions */

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
    fontSize: 25,
    fontWeight: "300",
  },

  /* Activity */

  activityCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },

  activityRow: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
  },

  activityIndicator: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#F3A847",
    marginRight: 14,
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    color: "#2B2118",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },

  activityTime: {
    color: "#968A7D",
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#E8DED0",
  },

  /* Footer */

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