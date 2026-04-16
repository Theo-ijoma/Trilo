import { StyleSheet, Text, TextInput, View } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hell World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
