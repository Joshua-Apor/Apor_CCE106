import { Link } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Course = {
  id: string;
  code: string;
  time: string;
  professor: string;
};

const courses: Course[] = [
  {
    id: "CCE106",
    code: "2063",
    time: "10:00am - 12:00pm",
    professor: "Lowell Jay C. Orcullo",
  },
  {
    id: "IT17",
    code: "2066",
    time: "12:30pm - 1:30pm",
    professor: "Lowell Jay C. Orcullo",
  },
  {
    id: "IT11",
    code: "2015",
    time: "1:30pm - 3:30pm",
    professor: "Xian Rhel S. Cadiogan",
  },
  {
    id: "IT12",
    code: "2026",
    time: "3:30pm - 5:30pm",
    professor: "Kate Stefunny Bruno",
  },
  {
    id: "PHYS101",
    code: "2017",
    time: "8:00am - 10:00am",
    professor: "(Pending)",
  },
  {
    id: "IT14",
    code: "2042",
    time: "10:00am - 12:00pm",
    professor: "(Pending)",
  },
  {
    id: "IT13",
    code: "2019",
    time: "1:30pm - 3:30pm",
    professor: "(Pending)",
  },
  {
    id: "IT10",
    code: "2044",
    time: "3:30pm - 5:30pm",
    professor: "(Pending)",
  },
];

export default function HomeScreen() {
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

          <Text style={styles.title}>Welcome back, Joshua</Text>

          <Text style={styles.description}>
            Keep track of coursework, student details, and account settings
            from one place.
          </Text>
        </View>

        {/* Course Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Current Courses</Text>

          <Text style={styles.courseCount}>
            {courses.length} COURSES
          </Text>
        </View>

        {/* Course List */}
        <View style={styles.courseList}>
          {courses.map((course, index) => (
            <Link
              key={course.id}
              href={{
                pathname: "/course/[id]",
                params: { id: course.id },
              }}
              style={styles.courseLink}
            >
              <View style={styles.courseRow}>
                {/* Number */}
                <Text style={styles.courseNumber}>
                  {String(index + 1).padStart(2, "0")}
                </Text>

                {/* Course Information */}
                <View style={styles.courseInfo}>
                  <Text style={styles.courseId}>
                    {course.id}
                  </Text>

                  <Text style={styles.courseMeta}>
                    {course.id} - {course.code}
                  </Text>

                  <Text style={styles.courseTime}>
                    {course.time}
                  </Text>
                </View>

                {/* Arrow */}
                <View style={styles.arrowCircle}>
                  <Text style={styles.arrow}>›</Text>
                </View>
              </View>
            </Link>
          ))}
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
    marginBottom: 30,
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
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 36,
    marginBottom: 12,
  },

  description: {
    color: "#C9BDAE",
    fontSize: 14,
    lineHeight: 21,
  },

  /* Section */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#2B2118",
    fontSize: 22,
    fontWeight: "800",
  },

  courseCount: {
    color: "#A16A29",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  /* Course List */

  courseList: {
    gap: 10,
  },

  courseLink: {
    backgroundColor: "#FFFDF8",
    borderRadius: 16,
    paddingVertical: 17,
    paddingHorizontal: 16,
  },

  courseRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  courseNumber: {
    color: "#C27A27",
    fontSize: 13,
    fontWeight: "800",
    width: 32,
  },

  courseInfo: {
    flex: 1,
    marginLeft: 6,
  },

  courseId: {
    color: "#2B2118",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },

  courseMeta: {
    color: "#6D6258",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 3,
  },

  courseTime: {
    color: "#968A7D",
    fontSize: 12,
  },

  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3E5D0",
    alignItems: "center",
    justifyContent: "center",
  },

  arrow: {
    color: "#A16A29",
    fontSize: 23,
    lineHeight: 25,
  },
});