import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type StatCardProps = {
  title: string;
  value: string;
  color: string;
  style?: StyleProp<ViewStyle>;
};

export default function StatCard({
  title,
  value,
  color,
  style,
}: StatCardProps) {
  return (
    <View style={[styles.card, style]}>
      <Text
        style={[
          styles.value,
          { color },
        ]}
      >
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    minWidth: 145,
    minHeight: 135,
    backgroundColor: "#FFFDF8",
    borderRadius: 18,
    padding: 18,
    marginBottom: 10,
    justifyContent: "space-between",
    shadowColor: "#2B2118",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  value: {
    fontSize: 28,
    fontWeight: "800",
  },

  title: {
    color: "#968A7D",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
