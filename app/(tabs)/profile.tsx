import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

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
        }

        if (savedEmail) {
          setEmail(savedEmail);
        }

        if (savedCourse) {
          setCourse(savedCourse);
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
    } catch (error) {
      console.log(
        "Error saving profile:",
        error
      );

      setError(
        "Unable to save your profile. Please try again."
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={styles.title}>
        Profile
      </Text>

      <Text style={styles.subtitle}>
        Manage your personal information.
      </Text>

      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {name.trim() !== ""
            ? name.trim().charAt(0).toUpperCase()
            : "S"}
        </Text>
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
        placeholderTextColor="#9CA3AF"
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
        placeholderTextColor="#9CA3AF"
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
        placeholderTextColor="#9CA3AF"
      />

      {/* Save Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={saveProfile}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          Save Profile
        </Text>
      </TouchableOpacity>

      {/* Profile Information */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          StudyFlow
        </Text>

        <Text style={styles.infoText}>
          Keep your profile information updated so
          your dashboard can personalize your
          experience.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 25,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 25,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 18,
    fontSize: 16,
    color: "#111827",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  errorBox: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  errorText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "600",
  },

  successBox: {
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#86EFAC",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  successText: {
    color: "#15803D",
    fontSize: 14,
    fontWeight: "600",
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 15,
    marginTop: 30,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 8,
  },

  infoText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 21,
  },
});
