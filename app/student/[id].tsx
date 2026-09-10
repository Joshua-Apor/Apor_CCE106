import { useLocalSearchParams } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const students: Record<
    string,
    {
      name: string;
      course: string;
      idNumber: string;
      year: string;
      gender: string;
      birthdate: string;
    }
  > = {
    "147446": {
      name: "Joshua Benedict T. Apor",
      course: "BSIT",
      idNumber: "147446",
      year: "3rd year",
      gender: "Male",
      birthdate: "August 21, 2006",
    },
  };

  const student = id ? students[id] : undefined;

  if (!student) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.errorHeader}>
            <Text style={styles.eyebrow}>STUDENT PORTAL</Text>

            <Text style={styles.errorTitle}>Student Not Found</Text>

            <Text style={styles.errorText}>
              The student ID is invalid or does not exist.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Student Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>STUDENT DETAILS</Text>

          <Text style={styles.title}>{student.name}</Text>

          <Text style={styles.subtitle}>
            {student.course} • {student.year}
          </Text>
        </View>

        {/* Student Information */}
        <Text style={styles.sectionTitle}>Student Information</Text>

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>STUDENT NAME</Text>
            <Text style={styles.value}>{student.name}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>BIRTHDATE</Text>
            <Text style={styles.value}>{student.birthdate}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>GENDER</Text>
            <Text style={styles.value}>{student.gender}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>COURSE</Text>
            <Text style={styles.value}>{student.course}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>ID NUMBER</Text>
            <Text style={styles.value}>{student.idNumber}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>YEAR</Text>
            <Text style={styles.value}>{student.year}</Text>
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

  /* Student Header */

  header: {
    backgroundColor: "#2B2118",
    borderRadius: 24,
    padding: 24,
    marginBottom: 30,
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
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 36,
    marginBottom: 8,
  },

  subtitle: {
    color: "#C9BDAE",
    fontSize: 14,
    fontWeight: "600",
  },

  /* Information */

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
  },

  infoRow: {
    paddingVertical: 17,
  },

  label: {
    color: "#968A7D",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginBottom: 6,
  },

  value: {
    color: "#2B2118",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },

  divider: {
    height: 1,
    backgroundColor: "#E8DED0",
  },

  /* Invalid Student */

  errorHeader: {
    backgroundColor: "#2B2118",
    borderRadius: 24,
    padding: 24,
  },

  errorTitle: {
    color: "#FFF9EF",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
  },

  errorText: {
    color: "#C9BDAE",
    fontSize: 14,
    lineHeight: 21,
  },
});