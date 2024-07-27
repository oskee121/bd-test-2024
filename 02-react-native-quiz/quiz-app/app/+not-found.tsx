import { Colors } from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "404 NOT FOUND" }} />
      <View style={styles.container}>
        <Link href="/" replace style={styles.helpButton}>
          START OVER
        </Link>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    width: "100%",
  },
  helpButton: {
    width: "100%",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark_gray,
    color: Colors.white,
    textAlign: "center",
    borderRadius: 10,
  },
});
