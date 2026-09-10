import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.eyebrow}>STUDENT PORTAL</Text>

            <View style={styles.headerMark}>
              <Text style={styles.headerMarkText}>SP</Text>
            </View>
          </View>

          <Text style={styles.title}>Settings</Text>

          <Text style={styles.description}>
            Manage your account, notifications, privacy, and application
            preferences.
          </Text>
        </View>

        {/* Settings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Preferences</Text>
        </View>

        <View style={styles.settingsList}>
          {/* Account */}
          <View style={styles.option}>
            <View style={styles.optionIcon}>
              <Text style={styles.iconText}>A</Text>
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Account</Text>

              <Text style={styles.optionDescription}>
                Manage your student account.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </View>

          <View style={styles.divider} />

          {/* Notifications */}
          <View style={styles.option}>
            <View style={styles.optionIcon}>
              <Text style={styles.iconText}>N</Text>
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Notifications</Text>

              <Text style={styles.optionDescription}>
                Manage your notification preferences.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </View>

          <View style={styles.divider} />

          {/* Privacy */}
          <View style={styles.option}>
            <View style={styles.optionIcon}>
              <Text style={styles.iconText}>P</Text>
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Privacy</Text>

              <Text style={styles.optionDescription}>
                Review your personal data and login settings.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </View>

          <View style={styles.divider} />

          {/* About */}
          <View style={styles.option}>
            <View style={styles.optionIcon}>
              <Text style={styles.iconText}>i</Text>
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>About</Text>

              <Text style={styles.optionDescription}>
                Student Portal application settings.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </View>

          <View style={styles.divider} />

          {/* Help & Support */}
          <View style={styles.option}>
            <View style={styles.optionIcon}>
              <Text style={styles.iconText}>?</Text>
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Help & Support</Text>

              <Text style={styles.optionDescription}>
                Get help with using the Student Portal.
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </View>
        </View>

        {/* Application Information */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoTitle}>Student Portal</Text>
          <Text style={styles.appInfoText}>
            Manage your student account and application preferences from one
            place.
          </Text>

          <View style={styles.appInfoBottom}>
            <Text style={styles.appInfoLabel}>VERSION</Text>
            <Text style={styles.appInfoVersion}>1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EDE2",
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 40,
  },

  /* Header */

  header: {
    backgroundColor: "#2B2118",
    borderRadius: 24,
    padding: 24,
    marginBottom: 30,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  eyebrow: {
    color: "#F3A847",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
  },

  headerMark: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F3A847",
    alignItems: "center",
    justifyContent: "center",
  },

  headerMarkText: {
    color: "#2B2118",
    fontSize: 12,
    fontWeight: "900",
  },

  title: {
    color: "#FFF9EF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
  },

  description: {
    color: "#C9BDAE",
    fontSize: 14,
    lineHeight: 21,
  },

  /* Section */

  sectionHeader: {
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#2B2118",
    fontSize: 22,
    fontWeight: "800",
  },

  /* Settings List */

  settingsList: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 4,
    marginBottom: 18,
  },

  option: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },

  optionIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F3E5D0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  iconText: {
    color: "#A16A29",
    fontSize: 14,
    fontWeight: "800",
  },

  optionContent: {
    flex: 1,
    marginRight: 10,
  },

  optionTitle: {
    color: "#2B2118",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },

  optionDescription: {
    color: "#81766A",
    fontSize: 12,
    lineHeight: 18,
  },

  arrow: {
    color: "#A16A29",
    fontSize: 25,
    fontWeight: "400",
  },

  divider: {
    height: 1,
    backgroundColor: "#E8DED0",
  },

  /* Application Information */

  appInfo: {
    backgroundColor: "#2B2118",
    borderRadius: 18,
    padding: 20,
  },

  appInfoTitle: {
    color: "#FFF9EF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },

  appInfoText: {
    color: "#C9BDAE",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 18,
  },

  appInfoBottom: {
    borderTopWidth: 1,
    borderTopColor: "#4A3A2D",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  appInfoLabel: {
    color: "#A99B8B",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  appInfoVersion: {
    color: "#F3A847",
    fontSize: 12,
    fontWeight: "800",
  },
});