import { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';

export default function Dashboard() {
  const { state,dispatch } = useAuth();
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Customer Dashboard',path:'customerDashboard' },
    { id: '2', title: 'Customer Registration' },
    { id: '3', title: 'View Analytics' },
  ]);

  type TaskItem = {
  title: string;
  path?: string;
};

  const addTask = () => {
    const newId = (tasks.length + 1).toString();
    setTasks([...tasks, { id: newId, title: `New Task ${newId}` }]);
  };
  
  const logout=()=>{
    dispatch({ type: 'LOGOUT' });
    router.replace('/(auth)/login');
  }

  const navigateTo = (path: any) => {
  console.log("Navigating to:", path);
  router.push(path);
};

  return (
    <View style={styles.container}>
      <Button title="LogOut" onPress={logout} />
      <Text style={styles.heading}>Dashboard</Text>
      <Text style={{ marginBottom: 20 }}>Welcome, {state.user?.username.toUpperCase()   || 'User'}!</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => navigateTo(item.path || '/dashboard')}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Add Task" onPress={addTask} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5',paddingTop:50 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  taskItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
