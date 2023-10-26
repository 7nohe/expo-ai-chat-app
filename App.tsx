import { StatusBar } from "expo-status-bar";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useChat } from "react-native-vercel-ai";
import Constants from "expo-constants";

const uri = Constants.expoConfig?.hostUri?.split(":")?.shift();
const localEndpoint = `http://${uri}:3000/api/chat`;

const api = process.env.EXPO_PUBLIC_API_URL
  ? `${process.env.EXPO_PUBLIC_API_URL}/api/chat`
  : localEndpoint;

export default function App() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api,
    });

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.length > 0
          ? messages.map((m) => (
              <Text
                style={{
                  marginBottom: 10,
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
                key={m.id}
              >
                {m.role === "user" ? "🧔 User: " : "🤖 AI: "}
                {m.content}
              </Text>
            ))
          : null}

        {isLoading && Platform.OS !== "web" && (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>
      <View style={{ height: 240, width: "100%" }}>
        <View style={{ marginTop: 60 }}>
          <TextInput
            value={input}
            placeholder="Say something..."
            style={{
              borderWidth: 1,
              minHeight: 50,
              padding: 10,
              marginBottom: 10,
            }}
            onChangeText={(e) => {
              handleInputChange(
                Platform.OS === "web" ? { target: { value: e } } : e
              );
            }}
          />
          <View
            style={{
              backgroundColor: "#f2f2f2f2",
              borderWidth: 1,
              borderColor: "black",
            }}
          >
            <Button onPress={handleSubmit} title="Send" />
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
});
