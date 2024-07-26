import { Text, TextProps, StyleSheet } from "react-native";

import React from "react";
import { Colors } from "../constants/Colors";

const styles = StyleSheet.create({
  textBody: {
    fontSize: 18,
  },
});

const Typography: React.FC<TextProps> = ({ ...props }) => (
  <Text
    {...props}
    style={[styles.textBody, { color: Colors.dark_gray }, props.style]}
  />
);

export default Typography;
