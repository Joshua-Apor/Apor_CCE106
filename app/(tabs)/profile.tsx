import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [savedName, setSavedName] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [savedCourse, setSavedCourse] = useState("");
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load saved profile information
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedName =
          await AsyncStorage.getItem("studentName");

        const savedEmail =
          await AsyncStorage.getItem("studentEmail");

        const savedCourse =
          await AsyncStorage.getItem("studentCourse");

        if (savedName) {
          setName(savedName);
          setSavedName(savedName);
        }

        if (savedEmail) {
          setEmail(savedEmail);
          setSavedEmail(savedEmail);
        }

        if (savedCourse) {
          setCourse(savedCourse);
          setSavedCourse(savedCourse);
        }
      } catch (error) {
        console.log(
          "Error loading profile:",
          error
        );
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    setError("");
    setSuccess("");

    // Name validation
    if (name.trim() === "") {
      setError("Please enter your full name.");
      return;
    }

    // Email validation
    if (email.trim() === "") {
      setError("Please enter your email address.");
      return;
    }

    if (
      !email.includes("@") ||
      !email.includes(".")
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    // Course validation
    if (course.trim() === "") {
      setError("Please enter your course.");
      return;
    }

    try {
      setSaving(true);

      await AsyncStorage.setItem(
        "studentName",
        name.trim()
      );

      await AsyncStorage.setItem(
        "studentEmail",
        email.trim()
      );

      await AsyncStorage.setItem(
        "studentCourse",
        course.trim()
      );

      setSuccess(
        "Profile saved successfully!"
      );
      setSavedName(name.trim());
      setSavedEmail(email.trim());
      setSavedCourse(course.trim());
    } catch (error) {
      console.log(
        "Error saving profile:",
        error
      );

      setError(
        "Unable to save your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.eyebrow}>
            EVENTMATE
          </Text>

          <Text style={styles.title}>
            Profile
          </Text>

          <Text style={styles.subtitle}>
            Keep your campus identity ready.
          </Text>
        </View>

        <View style={styles.profileMark}>
          <Text style={styles.profileMarkText}>
            {name.trim() !== ""
              ? name.trim().charAt(0).toUpperCase()
              : "S"}
          </Text>
        </View>
      </View>

      {/* Saved Profile */}
      <View style={styles.summaryCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name.trim() !== ""
              ? name.trim().charAt(0).toUpperCase()
              : "S"}
          </Text>
        </View>

        <View style={styles.summaryContent}>
          <Text style={styles.summaryLabel}>
            SAVED PROFILE
          </Text>

          <Text style={styles.summaryName}>
            {savedName || "No saved name yet"}
          </Text>

          <Text style={styles.summaryEmail}>
            {savedEmail || "No saved email yet"}
          </Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>
            Full Name
          </Text>
          <Text style={styles.detailValue}>
            {savedName || "Not saved"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>
            Email
          </Text>
          <Text style={styles.detailValue}>
            {savedEmail || "Not saved"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>
            Course
          </Text>
          <Text style={styles.detailValue}>
            {savedCourse || "Not saved"}
          </Text>
        </View>
      </View>

      {/* Error */}
      {error !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}

      {/* Success */}
      {success !== "" && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>
            {success}
          </Text>
        </View>
      )}

      {/* Personal Information */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Personal Information
        </Text>
      </View>

      <View style={styles.formCard}>
        {/* Full Name */}
        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setError("");
            setSuccess("");
          }}
          placeholder="Enter your full name"
          placeholderTextColor="#B1A498"
        />

        {/* Email */}
        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError("");
            setSuccess("");
          }}
          placeholder="Enter your email"
          placeholderTextColor="#B1A498"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Course */}
        <Text style={styles.label}>
          Course
        </Text>

        <TextInput
          style={styles.input}
          value={course}
          onChangeText={(text) => {
            setCourse(text);
            setError("");
            setSuccess("");
          }}
          placeholder="Enter your course"
          placeholderTextColor="#B1A498"
        />

        {/* Save Button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            saving && styles.buttonDisabled,
          ]}
          onPress={saveProfile}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {saving ? "Saving..." : "Save Profile"}
          </Text>

          <Text style={styles.buttonArrow}>
            {">"}
          </Text>
        </Pressable>
      </View>

      {/* Profile Information */}
      <View style={styles.infoCard}>
        <View style={styles.infoTop}>
          <Text style={styles.infoTitle}>
            EventMate
          </Text>

          <View style={styles.infoMark}>
            <Text style={styles.infoMarkText}>
              EM
            </Text>
          </View>
        </View>

        <Text style={styles.infoText}>
          Keep your profile information updated for
          campus event browsing.
        </Text>
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

  content: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    padding: 22,
    paddingBottom: 40,
  },

  /* Header */
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

  profileMark: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3A847",
    alignItems: "center",
    justifyContent: "center",
  },

  profileMarkText: {
    color: "#2B2118",
    fontSize: 18,
    fontWeight: "900",
  },

  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#F3A847",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  avatarText: {
    color: "#2B2118",
    fontSize: 30,
    fontWeight: "800",
  },

  /* Saved Profile */
  summaryCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  summaryContent: {
    flex: 1,
  },

  summaryLabel: {
    color: "#968A7D",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginBottom: 8,
  },

  summaryName: {
    color: "#2B2118",
    fontSize: 19,
    fontWeight: "800",
  },

  summaryEmail: {
    color: "#8A7D70",
    fontSize: 14,
    marginTop: 5,
  },

  detailsCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 4,
    marginBottom: 22,
  },

  detailRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  detailLabel: {
    color: "#968A7D",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  detailValue: {
    color: "#2B2118",
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 14,
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: "#E8DED0",
  },

  /* Messages */
  errorBox: {
    backgroundColor: "#FFF1EF",
    borderWidth: 1,
    borderColor: "#E7B7AE",
    borderRadius: 14,
    padding: 13,
    marginBottom: 20,
  },

  errorText: {
    color: "#A84A3D",
    fontSize: 14,
    fontWeight: "600",
  },

  successBox: {
    backgroundColor: "#EEF5E9",
    borderWidth: 1,
    borderColor: "#BBD1A8",
    borderRadius: 14,
    padding: 13,
    marginBottom: 20,
  },

  successText: {
    color: "#557A42",
    fontSize: 14,
    fontWeight: "600",
  },

  /* Section */
  sectionHeader: {
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#2B2118",
    fontSize: 21,
    fontWeight: "800",
  },

  /* Form */
  formCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
  },

  label: {
    color: "#968A7D",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#F8F3EA",
    borderWidth: 1,
    borderColor: "#E8DED0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 18,
    fontSize: 16,
    color: "#2B2118",
  },

  /* Button */
  button: {
    backgroundColor: "#C27A27",
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 3,
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  buttonDisabled: {
    backgroundColor: "#D9AE76",
  },

  buttonText: {
    color: "#FFF9EF",
    fontSize: 15,
    fontWeight: "800",
  },

  buttonArrow: {
    color: "#FFF9EF",
    fontSize: 21,
    marginLeft: 10,
    fontWeight: "400",
  },

  /* EventMate Information */
  infoCard: {
    backgroundColor: "#FFFDF8",
    padding: 18,
    borderRadius: 18,
  },

  infoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  infoTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#2B2118",
  },

  infoMark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F3EDE2",
    alignItems: "center",
    justifyContent: "center",
  },

  infoMarkText: {
    color: "#C27A27",
    fontSize: 10,
    fontWeight: "800",
  },

  infoText: {
    fontSize: 14,
    color: "#8A7D70",
    lineHeight: 21,
  },
});
