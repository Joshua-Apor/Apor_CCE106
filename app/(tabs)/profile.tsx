import { useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const openStudentDetails = () => {
    router.push({
      pathname: "/student/[id]",
      params: {
      id: "147446",
      },
    });
  };

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

          <Text style={styles.title}>Profile</Text>

          <Text style={styles.description}>
            View your student information and details.
          </Text>
        </View>

        {/* Student Information */}
        <Text style={styles.sectionTitle}>Student Information</Text>

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <View style={styles.infoText}>
              <Text style={styles.label}>STUDENT NAME</Text>
              <Text style={styles.value}>
                Joshua Benedict T. Apor
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoText}>
              <Text style={styles.label}>COURSE</Text>
              <Text style={styles.value}>BSIT</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoText}>
              <Text style={styles.label}>ID NUMBER</Text>
              <Text style={styles.value}>147446</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoText}>
              <Text style={styles.label}>YEAR</Text>
              <Text style={styles.value}>3rd year</Text>
            </View>
          </View>
        </View>

        {/* Student Details Button */}
        <Pressable
          onPress={openStudentDetails}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>
            View Student Details
          </Text>

          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>
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

  /* Student Information */

  sectionTitle: {
    color: "#2B2118",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 14,
  },

  infoList: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 4,
    marginBottom: 16,
  },

  infoRow: {
    paddingVertical: 17,
  },

  infoText: {
    flex: 1,
  },

  label: {
    color: "#968A7D",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginBottom: 5,
  },

  value: {
    color: "#2B2118",
    fontSize: 16,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#E8DED0",
  },

  /* Button */

  button: {
    backgroundColor: "#C27A27",
    borderRadius: 14,
    minHeight: 56,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "400",
  },

  pressed: {
    opacity: 0.75,
  },
});