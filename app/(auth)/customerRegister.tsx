import { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function Register() {
  const router = useRouter();
  const [fullName,setFullName] = useState<string>('');
  const[phoneNumber,setPhoneNumber] = useState<string>('');
  const [age,setAge] = useState<string>('');
  const [address,setAddress] = useState<string>('');
  const [accomadation,setAccomadation] = useState<string>('');
  const [travelMode,setTravelMode] = useState<string>('');
  const [foodList,setFoodList] = useState<string>('');
  const [beverageList,setBeverageList] = useState<string>('');
  const [duration,setDuration] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!username || !password||!fullName||!phoneNumber||!age||!address||!accomadation||!travelMode||!foodList||!beverageList||!duration) {
      return Alert.alert('Validation', 'Please fill all fields');
    }
    setLoading(true);
    try {
      const res = await fetch('https://uovtminiprj-backend.vercel.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 200) {
        router.replace("/dashboard");
      } else {
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Text style={{fontSize:18, textAlign:'center', marginTop:20}}>Welcome to GuideBuddy</Text>
    <Text style={{fontSize:24, fontWeight:'bold', textAlign:'center', marginTop:50}}>Login Page</Text> 
    <View style={styles.container}>
      <TextInput
        placeholder="UserName Here"
        value={username}
        onChangeText={setUserName}
      keyboardType='default'
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
      <Button title={loading ? 'Logging in...' : 'Login'} 
      onPress={handleLogin} disabled={loading} />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
