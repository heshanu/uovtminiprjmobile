import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Snackbar, Provider as PaperProvider } from 'react-native-paper';

export default function GuideRegister() {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const showSnackbar = (msg: string) => {
    setSnackbarMsg(msg);
    setSnackbarVisible(true);
  };

  const handleGuideRegister = async () => {
    if (!username || !password) {
      showSnackbar('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://uovtminiprj-backend.vercel.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 201) {
        showSnackbar('Register Successful!');
        setTimeout(() => router.replace('/dashboard'), 1000); // navigate after 1 sec
      } else {
        showSnackbar('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      showSnackbar('Register failed. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>
        Welcome to GuideBuddy
      </Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 50 }}>
        Register Gudie here
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
        <Button title={loading ? 'Logging in...' : 'Login'} onPress={ handleGuideRegister} 
        disabled={loading} />
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMsg}
      </Snackbar>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
