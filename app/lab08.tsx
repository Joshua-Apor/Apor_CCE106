import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Status = "Present" | "Absent" | null;

type Student = {
  id: number;
  name: string;
  status: Status;
};

const initialStudents: Student[] = [];

export default function Lab08AttendanceScreen() {
  const [students, setStudents] = useState(initialStudents);
  const [lastUpdated, setLastUpdated] = useState(
    "No attendance marked yet"
  );
  const [newStudentName, setNewStudentName] = useState("");
  const [inputError, setInputError] = useState("");

  const presentCount = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absentCount = students.filter(
    (student) => student.status === "Absent"
  ).length;

  useEffect(() => {
    const markedCount = presentCount + absentCount;

    if (markedCount > 0) {
      setLastUpdated(
        `Last updated: ${new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      );
    }
  }, [presentCount, absentCount]);

  const updateStatus = (
    id: number,
    status: Exclude<Status, null>
  ) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? { ...student, status }
          : student
      )
    );
  };

  const addStudent = () => {
    const name = newStudentName.trim();

    if (!name) {
      setInputError("Enter a student name first.");
      return;
    }

    setStudents((currentStudents) => [
      ...currentStudents,
      {
        id: Date.now(),
        name,
        status: null,
      },
    ]);

    setNewStudentName("");
    setInputError("");
  };

  const removeStudent = (id: number) => {
    setStudents((currentStudents) =>
      currentStudents.filter(
        (student) => student.id !== id
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.eyebrow}>
              LAB 08 · LOCAL STATE
            </Text>

            <Text style={styles.title}>
              Attendance
            </Text>

            <Text style={styles.subtitle}>
              CCE106 · September 17, 2026
            </Text>
          </View>

        </View>

        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text
              style={[
                styles.summaryNumber,
                styles.presentText,
              ]}
            >
              {presentCount}
            </Text>

            <Text style={styles.summaryLabel}>
              PRESENT
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryItem}>
            <Text
              style={[
                styles.summaryNumber,
                styles.absentText,
              ]}
            >
              {absentCount}
            </Text>

            <Text style={styles.summaryLabel}>
              ABSENT
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>
              {students.length}
            </Text>

            <Text style={styles.summaryLabel}>
              STUDENTS
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Class list
          </Text>
        </View>

        <Text style={styles.helpText}>
          Mark each student as present or absent.
        </Text>

        <View style={styles.addStudentCard}>
          <Text style={styles.addStudentTitle}>
            Add a student
          </Text>

          <View style={styles.addStudentRow}>
            <TextInput
              accessibilityLabel="New student name"
              onChangeText={(value) => {
                setNewStudentName(value);

                if (inputError) {
                  setInputError("");
                }
              }}
              onSubmitEditing={addStudent}
              placeholder="Enter full name"
              placeholderTextColor="#B1A498"
              returnKeyType="done"
              style={styles.nameInput}
              value={newStudentName}
            />

            <Pressable
              accessibilityRole="button"
              onPress={addStudent}
              style={({ pressed }) => [
                styles.addButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.addButtonText}>
                Add
              </Text>
            </Pressable>
          </View>

          {!!inputError && (
            <Text style={styles.errorText}>
              {inputError}
            </Text>
          )}
        </View>

        <View style={styles.list}>
          {students.map((student, index) => (
            <View
              key={student.id}
              style={styles.studentCard}
            >
              <View style={styles.studentInfo}>
                <View style={styles.studentNumber}>
                  <Text style={styles.studentNumberText}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                </View>

                <View style={styles.studentDetails}>
                  <Text style={styles.studentName}>
                    {student.name}
                  </Text>

                  <Text style={styles.statusText}>
                    {student.status ?? "Not marked"}
                  </Text>
                </View>
              </View>

              <View style={styles.actions}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Mark ${student.name} present`}
                  onPress={() =>
                    updateStatus(
                      student.id,
                      "Present"
                    )
                  }
                  style={[
                    styles.button,
                    styles.presentButton,
                    student.status === "Present" &&
                      styles.presentSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      student.status === "Present" &&
                        styles.selectedButtonText,
                    ]}
                  >
                    Present
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Mark ${student.name} absent`}
                  onPress={() =>
                    updateStatus(
                      student.id,
                      "Absent"
                    )
                  }
                  style={[
                    styles.button,
                    styles.absentButton,
                    student.status === "Absent" &&
                      styles.absentSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      student.status === "Absent" &&
                        styles.selectedButtonText,
                    ]}
                  >
                    Absent
                  </Text>
                </Pressable>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${student.name}`}
                onPress={() =>
                  removeStudent(student.id)
                }
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>
                  Remove student
                </Text>

                <Text style={styles.removeArrow}>
                  →
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        <Text style={styles.updatedText}>
          {lastUpdated}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3EDE2",
  },

  content: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    padding: 22,
    paddingBottom: 40,
  },

  header: {
    backgroundColor: "#2B2118",
    borderRadius: 24,
    padding: 24,
    minHeight: 170,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
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

  headerMark: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3A847",
    alignItems: "center",
    justifyContent: "center",
  },

  headerMarkText: {
    color: "#2B2118",
    fontSize: 12,
    fontWeight: "900",
  },

  summary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    paddingVertical: 18,
    marginBottom: 28,
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },

  summaryNumber: {
    color: "#2B2118",
    fontSize: 27,
    fontWeight: "800",
  },

  presentText: {
    color: "#557A42",
  },

  absentText: {
    color: "#A84A3D",
  },

  summaryLabel: {
    color: "#968A7D",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 4,
  },

  divider: {
    height: 38,
    width: 1,
    backgroundColor: "#E8DED0",
  },

  sectionHeader: {
    marginBottom: 4,
  },

  sectionTitle: {
    color: "#2B2118",
    fontSize: 21,
    fontWeight: "800",
  },

  helpText: {
    color: "#8A7D70",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 15,
  },

  addStudentCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  addStudentTitle: {
    color: "#2B2118",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
  },

  addStudentRow: {
    flexDirection: "row",
    gap: 8,
  },

  nameInput: {
    flex: 1,
    backgroundColor: "#F8F3EA",
    borderWidth: 1,
    borderColor: "#E8DED0",
    borderRadius: 12,
    color: "#2B2118",
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },

  addButton: {
    alignItems: "center",
    backgroundColor: "#C27A27",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  addButtonText: {
    color: "#FFF9EF",
    fontSize: 14,
    fontWeight: "800",
  },

  errorText: {
    color: "#A84A3D",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },

  list: {
    gap: 12,
  },

  studentCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 18,
  },

  studentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  studentNumber: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F3EDE2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  studentNumberText: {
    color: "#C27A27",
    fontSize: 10,
    fontWeight: "800",
  },

  studentDetails: {
    flex: 1,
  },

  studentName: {
    color: "#2B2118",
    fontSize: 16,
    fontWeight: "700",
  },

  statusText: {
    color: "#968A7D",
    fontSize: 12,
    marginTop: 4,
  },

  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 15,
  },

  button: {
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
  },

  presentButton: {
    backgroundColor: "#EEF5E9",
    borderColor: "#BBD1A8",
  },

  absentButton: {
    backgroundColor: "#FFF1EF",
    borderColor: "#E7B7AE",
  },

  presentSelected: {
    backgroundColor: "#557A42",
    borderColor: "#557A42",
  },

  absentSelected: {
    backgroundColor: "#A84A3D",
    borderColor: "#A84A3D",
  },

  buttonText: {
    color: "#5E554D",
    fontSize: 13,
    fontWeight: "800",
  },

  selectedButtonText: {
    color: "#FFFDF8",
  },

  removeButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  removeButtonText: {
    color: "#A84A3D",
    fontSize: 12,
    fontWeight: "700",
  },

  removeArrow: {
    color: "#A84A3D",
    fontSize: 16,
    marginLeft: 6,
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  updatedText: {
    color: "#968A7D",
    fontSize: 12,
    textAlign: "center",
    marginTop: 22,
  },
});