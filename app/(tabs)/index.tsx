import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Task = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

type AlertType = "success" | "danger" | "warning";

const STUDENT_NAME = "Joshua Benedict T. Apor";
const STUDENT_PROGRAM = "BS Information Technology";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskError, setTaskError] = useState("");
  const [dueDateError, setDueDateError] = useState("");

  // Custom alert states
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] =
    useState<AlertType>("success");

  // Task counters
  const pendingTasks = tasks.filter(
    (item) => !item.completed,
  ).length;

  const completedTasks = tasks.filter(
    (item) => item.completed,
  ).length;

  // Show custom alert
  const showAlert = (
    title: string,
    message: string,
    type: AlertType,
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  // Add Task
  const addTask = () => {
    let isValid = true;

    // Validate task title
    if (task.trim() === "") {
      setTaskError("Task title is required.");
      isValid = false;
    } else {
      setTaskError("");
    }

    // Validate due date
    if (dueDate.trim() === "") {
      setDueDateError("Due date is required.");
      isValid = false;
    } else if (
      !/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(
        dueDate,
      )
    ) {
      setDueDateError("Use the format MM/DD/YYYY.");
      isValid = false;
    } else {
      setDueDateError("");
    }

    if (!isValid) {
      showAlert(
        "Missing Information",
        "Please provide a valid task title and due date in MM/DD/YYYY format.",
        "warning",
      );
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: task.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);

    setTask("");
    setDueDate("");
    setTaskError("");
    setDueDateError("");

    showAlert(
      "Task Added",
      `"${newTask.title}" has been added successfully.`,
      "success",
    );
  };

  // Complete / Uncomplete Task
  const toggleTask = (id: string) => {
    const selectedTask = tasks.find(
      (item) => item.id === id,
    );

    if (!selectedTask) {
      return;
    }

    const newCompletedStatus =
      !selectedTask.completed;

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: newCompletedStatus,
            }
          : item,
      ),
    );

    if (newCompletedStatus) {
      showAlert(
        "Task Completed",
        `"${selectedTask.title}" has been marked as completed.`,
        "success",
      );
    } else {
      showAlert(
        "Task Reopened",
        `"${selectedTask.title}" has been marked as incomplete.`,
        "warning",
      );
    }
  };

  // Delete Task
  const deleteTask = (id: string) => {
    const selectedTask = tasks.find(
      (item) => item.id === id,
    );

    if (!selectedTask) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter(
        (item) => item.id !== id,
      ),
    );

    showAlert(
      "Task Deleted",
      `"${selectedTask.title}" has been deleted.`,
      "danger",
    );
  };

  // Alert color
  const getAlertColor = () => {
    switch (alertType) {
      case "danger":
        return "#EF4444";

      case "warning":
        return "#EAB308";

      default:
        return "#22C55E";
    }
  };

  // Alert icon
  const getAlertIcon = () => {
    switch (alertType) {
      case "danger":
        return "×";

      case "warning":
        return "!";

      default:
        return "✓";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <Text style={styles.title}>
              My Tasks
            </Text>

            <Text style={styles.fillText}>
              Check pending, ongoing and finished tasks!
            </Text>

            {/* Student Information */}
            <View style={styles.studentCard}>
              <Text style={styles.sectionTitle}>
                Student Information
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Name
                </Text>

                <Text style={styles.infoValue}>
                  {STUDENT_NAME}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Program
                </Text>

                <Text style={styles.infoValue}>
                  {STUDENT_PROGRAM}
                </Text>
              </View>
            </View>

            {/* Task Summary */}
            <View style={styles.summaryContainer}>
              {/* Pending */}
              <View style={styles.summaryCard}>
                <View
                  style={[
                    styles.summaryIcon,
                    styles.pendingIcon,
                  ]}
                >
                  <Text style={styles.summaryIconText}>
                    !
                  </Text>
                </View>

                <View style={styles.summaryDetails}>
                  <Text style={styles.summaryNumber}>
                    {pendingTasks}
                  </Text>

                  <Text style={styles.summaryLabel}>
                    Pending Tasks
                  </Text>
                </View>
              </View>

              {/* Completed */}
              <View style={styles.summaryCard}>
                <View
                  style={[
                    styles.summaryIcon,
                    styles.completedIcon,
                  ]}
                >
                  <Text style={styles.summaryIconText}>
                    ✓
                  </Text>
                </View>

                <View style={styles.summaryDetails}>
                  <Text style={styles.summaryNumber}>
                    {completedTasks}
                  </Text>

                  <Text style={styles.summaryLabel}>
                    Completed Tasks
                  </Text>
                </View>
              </View>
            </View>

            {/* Task Title */}
            <Text style={styles.label}>
              Task Title
            </Text>

            <TextInput
              placeholder="Enter a task title"
              placeholderTextColor="#777"
              value={task}
              onChangeText={(text) => {
                setTask(text);

                if (text.trim() !== "") {
                  setTaskError("");
                }
              }}
              style={[
                styles.fullInput,
                taskError !== "" &&
                  styles.inputError,
              ]}
            />

            {taskError !== "" && (
              <Text style={styles.errorText}>
                {taskError}
              </Text>
            )}

            {/* Due Date */}
            <Text style={styles.label}>
              Due Date
            </Text>

            <TextInput
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#777"
              value={dueDate}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={(text) => {
                // Remove everything except numbers
                const numbers = text.replace(/\D/g, "");

                // Limit to 8 numbers
                const limited = numbers.slice(0, 8);

                // Format as MM/DD/YYYY
                let formatted = limited;

                if (limited.length > 2) {
                  formatted =
                    limited.slice(0, 2) +
                    "/" +
                    limited.slice(2);
                }

                if (limited.length > 4) {
                  formatted =
                    limited.slice(0, 2) +
                    "/" +
                    limited.slice(2, 4) +
                    "/" +
                    limited.slice(4);
                }

                setDueDate(formatted);

                if (formatted.trim() !== "") {
                  setDueDateError("");
                }
              }}
              style={[
                styles.fullInput,
                dueDateError !== "" &&
                  styles.inputError,
              ]}
            />

            {dueDateError !== "" && (
              <Text style={styles.errorText}>
                {dueDateError}
              </Text>
            )}

            {/* Add Task Button */}
            <Pressable
              accessibilityLabel="Add task"
              onPress={addTask}
              style={({ pressed }) => [
                styles.addButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.addButtonText}>
                Add Task
              </Text>
            </Pressable>

            {/* Task List Title */}
            <Text style={styles.listTitle}>
              Current Task List ({tasks.length})
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            {/* Task Content */}
            <Pressable
              onPress={() =>
                toggleTask(item.id)
              }
              style={styles.taskContent}
            >
              {/* Checkbox */}
              <View
                style={[
                  styles.checkbox,
                  item.completed &&
                    styles.checkboxCompleted,
                ]}
              >
                {item.completed && (
                  <Text style={styles.checkmark}>
                    ✓
                  </Text>
                )}
              </View>

              {/* Task Information */}
              <View style={styles.taskDetails}>
                <Text
                  style={[
                    styles.taskText,
                    item.completed &&
                      styles.completedTask,
                  ]}
                >
                  {item.title}
                </Text>

                <Text
                  style={[
                    styles.dueDateText,
                    item.completed &&
                      styles.completedDueDate,
                  ]}
                >
                  Due: {item.dueDate}
                </Text>
              </View>
            </Pressable>

            {/* Delete Button */}
            <Pressable
              accessibilityLabel={`Delete ${item.title}`}
              onPress={() =>
                deleteTask(item.id)
              }
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>
                Delete
              </Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No tasks yet. Add your first task above.
            </Text>
          </View>
        }
      />

      {/* CUSTOM ALERT MODAL */}
      <Modal
        visible={alertVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setAlertVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alertCard}>
            {/* Alert Icon */}
            <View
              style={[
                styles.alertIcon,
                {
                  backgroundColor:
                    getAlertColor(),
                },
              ]}
            >
              <Text style={styles.alertIconText}>
                {getAlertIcon()}
              </Text>
            </View>

            {/* Alert Title */}
            <Text style={styles.alertTitle}>
              {alertTitle}
            </Text>

            {/* Alert Message */}
            <Text style={styles.alertMessage}>
              {alertMessage}
            </Text>

            {/* OK Button */}
            <Pressable
              onPress={() =>
                setAlertVisible(false)
              }
              style={({ pressed }) => [
                styles.alertButton,
                {
                  backgroundColor:
                    getAlertColor(),
                },
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.alertButtonText}>
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  listContainer: {
    padding: 24,
    paddingBottom: 40,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 25,
  },

  fillText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: -18,
    marginBottom: 25,
  },

  /* Student Information */
  studentCard: {
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#EAB308",
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
  },

  infoLabel: {
    color: "#888888",
    fontSize: 14,
  },

  infoValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
    marginLeft: 15,
  },

  /* Task Summary */
  summaryContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 22,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
  },

  summaryIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  pendingIcon: {
    backgroundColor: "#EAB308",
  },

  completedIcon: {
    backgroundColor: "#22C55E",
  },

  summaryIconText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  summaryDetails: {
    flex: 1,
  },

  summaryNumber: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },

  summaryLabel: {
    color: "#888888",
    fontSize: 11,
    marginTop: 2,
  },

  /* Labels */
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  /* Inputs */
  fullInput: {
    backgroundColor: "#1F1F1F",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 6,
  },

  inputError: {
    borderColor: "#EF4444",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginBottom: 10,
  },

  /* Add Button */
  addButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 13,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 25,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  /* List */
  listTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  /* Task Item */
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F1F1F",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },

  taskContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  /* Checkbox */
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#666666",
    borderRadius: 5,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxCompleted: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },

  checkmark: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  /* Task Details */
  taskDetails: {
    flex: 1,
  },

  taskText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },

  completedTask: {
    color: "#777777",
    textDecorationLine: "line-through",
  },

  dueDateText: {
    color: "#EAB308",
    fontSize: 13,
  },

  completedDueDate: {
    color: "#555555",
  },

  /* Delete Button */
  deleteButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 6,
    marginLeft: 10,
  },

  deleteText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  /* Empty List */
  emptyContainer: {
    paddingVertical: 30,
    alignItems: "center",
  },

  emptyText: {
    color: "#666666",
    textAlign: "center",
    fontSize: 14,
  },

  /* Pressed */
  pressed: {
    opacity: 0.7,
  },

  /* Custom Alert */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  alertCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#1F1F1F",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
  },

  alertIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  alertIconText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
  },

  alertTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  alertMessage: {
    color: "#AAAAAA",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 22,
  },

  alertButton: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  alertButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
