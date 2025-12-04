import { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete Profile' },
    { id: '2', title: 'Check Messages' },
    { id: '3', title: 'View Analytics' },
  ]);

  const handlePress = (title: string) => {
    Alert.alert('Task Selected', `You tapped on "${title}"`);
  };

  const addTask = () => {
    const newId = (tasks.length + 1).toString();
    setTasks([...tasks, { id: newId, title: `New Task ${newId}` }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => handlePress(item.title)}
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
