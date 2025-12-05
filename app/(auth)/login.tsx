import { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Snackbar, Provider as PaperProvider } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const { state, dispatch } = useAuth();

  useEffect(() => {
    // Auto-login if credentials exist
    const tryAutoLogin = async () => {
      const creds = await getCredentials();
      if (creds?.username) {
        setUserName(creds.username);
        router.replace("/dashboard");
      }
    };
    tryAutoLogin();
  }, []);

  const storeCredentials = async (username: string, password: string) => {
    try {
      await AsyncStorage.setItem("@username", username);
      // Ideally, store token instead of password
      await AsyncStorage.setItem("@password", password); 
      console.log("Credentials saved");
    } catch (e) {
      console.log("Failed to save credentials", e);
    }
  };

  const getCredentials = async () => {
    try {
      const username = await AsyncStorage.getItem("@username");
      const password = await AsyncStorage.getItem("@password");
      return { username, password };
    } catch (e) {
      console.log("Failed to load credentials", e);
      return null;
    }
  };

  const showSnackbar = (msg: string) => {
    setSnackbarMsg(msg);
    setSnackbarVisible(true);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      showSnackbar("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://uovtminiprj-backend.vercel.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (res.status === 200) {
        dispatch({
          type: "LOGIN",
          payload: { id: "1", username },
        });

        await storeCredentials(username, password);

        showSnackbar("Login Successful!");
        setTimeout(() => router.replace("/dashboard"), 1000);
      } else {
        showSnackbar("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      showSnackbar("Login failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <Text style={{ fontSize: 18, textAlign: "center", marginTop: 20 }}>
        Welcome to GuideBuddy
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Login Page
      </Text>

      <View style={styles.container}>
        <TextInput
          placeholder="UserName Here"
          value={username}
          onChangeText={setUserName}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button
          title={loading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          disabled={loading}
        />
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMsg}
      </Snackbar>
      <Button
        title="Go to Signup"
        onPress={() => router.replace("/(auth)/guideRegister")}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
