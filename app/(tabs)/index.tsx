import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Operation = "Add" | "Subtract" | "Multiply" | "Divide";

export default function HomeScreen() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = (operation: Operation) => {
    const first = Number(firstNumber);
    const second = Number(secondNumber);

    // Validate empty or invalid input
    if (
      firstNumber.trim() === "" ||
      secondNumber.trim() === "" ||
      !Number.isFinite(first) ||
      !Number.isFinite(second)
    ) {
      setResult(null);
      setError("Enter valid numbers in both fields.");
      return;
    }

    // Prevent division by zero
    if (operation === "Divide" && second === 0) {
      setResult(null);
      setError("Cannot divide by zero.");
      return;
    }

    const values: Record<Operation, number> = {
      Add: first + second,
      Subtract: first - second,
      Multiply: first * second,
      Divide: first / second,
    };

    setError(null);
    setResult(String(values[operation]));
  };

  const clearCalculator = () => {
    setFirstNumber("");
    setSecondNumber("");
    setResult(null);
    setError(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Simple Calculator</Text>

        <View style={styles.card}>
          <Text style={styles.label}>FIRST NUMBER</Text>

          <TextInput
            keyboardType="decimal-pad"
            onChangeText={setFirstNumber}
            placeholder="Enter first number"
            placeholderTextColor="#888"
            style={styles.input}
            value={firstNumber}
          />

          <Text style={styles.label}>SECOND NUMBER</Text>

          <TextInput
            keyboardType="decimal-pad"
            onChangeText={setSecondNumber}
            placeholder="Enter second number"
            placeholderTextColor="#888"
            style={styles.input}
            value={secondNumber}
          />

          {/* Operation Buttons */}
          <View style={styles.buttonGrid}>
            <Pressable
              style={({ pressed }) => [
                styles.operationButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => calculate("Add")}
            >
              <Text style={styles.operationText}>+</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.operationButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => calculate("Subtract")}
            >
              <Text style={styles.operationText}>−</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.operationButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => calculate("Multiply")}
            >
              <Text style={styles.operationText}>×</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.operationButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => calculate("Divide")}
            >
              <Text style={styles.operationText}>÷</Text>
            </Pressable>
          </View>

          {/* Clear Button */}
          <Pressable
            style={({ pressed }) => [
              styles.clearButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={clearCalculator}
          >
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        </View>

        {/* Result */}
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>
            {error ? "MESSAGE" : "RESULT"}
          </Text>

          <Text style={[styles.resultText, error && styles.errorText]}>
            {error ?? result ?? "Your answer will appear here"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#000000",
  },

  label: {
    color: "#AAAAAA",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#111111",
    borderColor: "#444444",
    borderWidth: 1,
    borderRadius: 8,
    color: "#FFFFFF",
    fontSize: 17,
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  buttonGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  operationButton: {
    alignItems: "center",
    backgroundColor: "#222222",
    borderRadius: 8,
    height: 55,
    justifyContent: "center",
    width: "22%",
  },

  operationText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },

  clearButton: {
    alignItems: "center",
    backgroundColor: "#111111",
    borderColor: "#444444",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 15,
    paddingVertical: 13,
  },

  clearText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.7,
  },

  resultCard: {
    backgroundColor: "#111111",
    borderColor: "#444444",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 25,
    padding: 18,
  },

  resultLabel: {
    color: "#AAAAAA",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
  },

  resultText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  errorText: {
    color: "#FF6B6B",
    fontSize: 16,
  },
});