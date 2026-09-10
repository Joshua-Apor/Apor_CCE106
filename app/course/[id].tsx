import { useLocalSearchParams } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type CourseDetail = {
  id: string;
  code: string;
  description: string;
  time: string;
  professor: string;
};

const courses: Record<string, CourseDetail> = {
  CCE106: {
    id: "CCE106",
    code: "2063",
    description: "Application Development and Emerging Technologies",
    time: "10:00am - 12:00pm",
    professor: "Lowell Jay C. Orcullo",
  },
  IT17: {
    id: "IT17",
    code: "2066",
    description: "Social and Professional Issues",
    time: "12:30pm - 1:30pm",
    professor: "Lowell Jay C. Orcullo",
  },
  IT11: {
    id: "IT11",
    code: "2015",
    description: "Networking 2",
    time: "1:30pm - 3:30pm",
    professor: "Xian Rhel S. Cadiogan",
  },
  IT12: {
    id: "IT12",
    code: "2026",
    description: "System Integration and Architecture",
    time: "3:30pm - 5:30pm",
    professor: "Kate Stefunny Bruno",
  },
  PHYS101: {
    id: "PHYS101",
    code: "2017",
    description: "College Physics 1",
    time: "8:00am - 10:00am",
    professor: "(Pending)",
  },
  IT14: {
    id: "IT14",
    code: "2042",
    description: "Professional Track for IT 5",
    time: "10:00am - 12:00pm",
    professor: "(Pending)",
  },
  IT13: {
    id: "IT13",
    code: "2019",
    description: "Professional Track for IT 4",
    time: "1:30pm - 3:30pm",
    professor: "(Pending)",
  },
  IT10: {
    id: "IT10",
    code: "2044",
    description: "IT Elective 3",
    time: "3:30pm - 5:30pm",
    professor: "(Pending)",
  },
};

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const course = id ? courses[id] : undefined;

  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.errorHeader}>
            <Text style={styles.eyebrow}>STUDENT PORTAL</Text>

            <Text style={styles.errorTitle}>Course Not Found</Text>

            <Text style={styles.errorText}>
              The course parameter is invalid or does not exist.
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
        {/* Course Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>COURSE DETAILS</Text>

          <Text style={styles.courseTitle}>{course.id}</Text>

          <Text style={styles.courseCode}>
            Course Code: {course.code}
          </Text>
        </View>

        {/* Course Information */}
        <Text style={styles.sectionTitle}>Course Information</Text>

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>COURSE ID</Text>
            <Text style={styles.value}>{course.id}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>COURSE CODE</Text>
            <Text style={styles.value}>{course.code}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>COURSE DESCRIPTION</Text>
            <Text style={styles.value}>{course.description}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>TIME</Text>
            <Text style={styles.value}>{course.time}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>PROFESSOR</Text>
            <Text style={styles.value}>{course.professor}</Text>
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

  /* Course Header */

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

  courseTitle: {
    color: "#FFF9EF",
    fontSize: 38,
    fontWeight: "800",
    marginBottom: 8,
  },

  courseCode: {
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

  /* Invalid Course */

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