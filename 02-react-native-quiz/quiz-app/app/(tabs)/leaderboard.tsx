import Typography from "@/components/Typography";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <Text>Leaderboard</Text>
      <Link href="/">
        <Typography style={styles.bodyText}>Go to Home (replace -)</Typography>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyText: {
    fontWeight: "bold",
  },
});
