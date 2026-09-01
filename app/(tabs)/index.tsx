import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const INCREMENT = 1;

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  const increaseCount = () =>
    setCount((currentCount) => currentCount + INCREMENT);

  const decreaseCount = () =>
    setCount((currentCount) =>
      Math.max(0, currentCount - INCREMENT),
    );

  const resetCount = () => setCount(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Counter Value */}
        <Text
          accessibilityLiveRegion="polite"
          style={styles.count}
        >
          {count}
        </Text>

        {/* Buttons */}
        <View style={styles.controls}>
          <Pressable
            accessibilityLabel="Increase counter"
            onPress={increaseCount}
            style={({ pressed }) => [
              styles.button,
              styles.increaseButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.buttonText}>
              Increase
            </Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Decrease counter"
            onPress={decreaseCount}
            style={({ pressed }) => [
              styles.button,
              styles.decreaseButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.buttonText}>
              Decrease
            </Text>
          </Pressable>

          <Pressable
            accessibilityLabel="Reset counter"
            onPress={resetCount}
            style={({ pressed }) => [
              styles.button,
              styles.resetButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.resetText}>
              Reset
            </Text>
          </Pressable>
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
    alignItems: "center",
    padding: 24,
  },

  count: {
    color: "#FFFFFF",
    fontSize: 100,
    fontWeight: "700",
    marginBottom: 40,
  },

  controls: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },

  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
  },

  increaseButton: {
    backgroundColor: "#22C55E",
  },

  decreaseButton: {
    backgroundColor: "#EF4444",
  },

  resetButton: {
    backgroundColor: "#EAB308",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  resetText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.7,
  },
});