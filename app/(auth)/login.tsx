import { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import {
  Snackbar,
  Provider as PaperProvider,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const { dispatch } = useAuth();

  useEffect(() => {
    const tryAutoLogin = async () => {
      const username = await AsyncStorage.getItem("@username");
      if (username) router.replace("/dashboard");
    };
  //  tryAutoLogin();
  }, [username]);

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

        await AsyncStorage.setItem("@username", username);

        showSnackbar("Login successful!");
        setTimeout(() => router.replace("/dashboard"), 800);
      } else {
        showSnackbar("Invalid credentials");
      }
    } catch {
      showSnackbar("Login failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subtitle}>Login to GuideBuddy</Text>

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUserName}
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={styles.input}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            left={<TextInput.Icon icon="lock" />}
            style={styles.input}
          />

          <Button
          mode="contained" 
            onPress={handleLogin}
            disabled={loading}
            style={{...styles.loginBtn, backgroundColor: loading ? "#9ca3af" : "#3b82f6"}}
            
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              "Login"
            )}
          </Button>

          <Button
            mode="text"
            onPress={() => router.replace("/(auth)/guideRegister")}
          >
            Create new account
          </Button>
        </View>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
        >
          {snackbarMsg}
        </Snackbar>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
    color: "#312e81",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },
  input: {
    marginBottom: 14,
  },
  loginBtn: {
    marginTop: 10,
    borderRadius: 10,
    color: "blue",
  },
});
