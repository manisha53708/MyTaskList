import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard,
  Alert,
  StatusBar
} from 'react-native';
// Menggunakan library bawaan yang pasti ada di Snack
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [task, setTask] = useState(''); 
  const [taskList, setTaskList] = useState([]); 

  const handleAddTask = () => {
    if (task.trim().length === 0) {
      Alert.alert('Misi Gagal!', 'Koordinat misi tidak boleh kosong!');
      return;
    }
    const newTask = { id: Date.now().toString(), text: task, completed: false };
    setTaskList([...taskList, newTask]);
    setTask('');
    Keyboard.dismiss();
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter(item => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTaskList(taskList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const renderEmptyContainer = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="rocket-launch" size={80} color="#334155" />
      <Text style={styles.emptyText}>Radar Bersih!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        <View style={styles.headerWrapper}>
          <View style={styles.titleRow}>
            <MaterialCommunityIcons name="space-invaders" size={32} color="#22D3EE" />
            <Text style={styles.sectionTitle}>SpaceTaskList</Text>
          </View>
          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>
              <Text style={styles.boldCounter}>{taskList.filter(t => t.completed).length}</Text> Selesai | <Text style={styles.boldCounter}>{taskList.length}</Text> Total
            </Text>
          </View>
        </View>

        <FlatList
          data={taskList}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmptyContainer}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => toggleComplete(item.id)}
              style={[styles.item, item.completed && styles.itemCompleted]}
            >
              <View style={styles.itemLeft}>
                <MaterialCommunityIcons 
                  name={item.completed ? "checkbox-marked-circle" : "circle-outline"} 
                  size={24} 
                  color={item.completed ? "#10B981" : "#94A3B8"} 
                />
                <Text style={[styles.itemText, item.completed && styles.textCompleted]}>
                  {item.text}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <MaterialCommunityIcons name="delete" size={22} color="#EF4444" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput 
          style={styles.input} 
          placeholder={'Tulis misi baru...'} 
          placeholderTextColor={'#64748B'}
          value={task} 
          onChangeText={text => setTask(text)} 
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' }, // Warna Space Deep Blue
  content: { flex: 1, paddingTop: 60 },
  headerWrapper: { paddingHorizontal: 25, marginBottom: 20 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 28, fontWeight: 'bold', color: '#F8FAFC', marginLeft: 10 },
  counterBadge: { backgroundColor: '#1E293B', padding: 8, borderRadius: 12, alignSelf: 'flex-start' },
  counterText: { color: '#94A3B8', fontSize: 13 },
  boldCounter: { color: '#22D3EE', fontWeight: 'bold' },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  item: { 
    backgroundColor: '#1E293B', 
    padding: 18, 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  itemCompleted: { borderColor: '#10B981' },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  itemText: { color: '#F1F5F9', fontSize: 16, marginLeft: 12 },
  textCompleted: { textDecorationLine: 'line-through', color: '#64748B' },
  writeTaskWrapper: { position: 'absolute', bottom: 30, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 20 },
  input: { padding: 15, backgroundColor: '#020617', borderRadius: 25, color: '#F8FAFC', width: '75%', borderWidth: 1, borderColor: '#334155' },
  addWrapper: { width: 55, height: 55, borderRadius: 28, backgroundColor: '#22D3EE', justifyContent: 'center', alignItems: 'center' },
  addText: { fontSize: 28, color: '#0F172A', fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#F8FAFC', fontSize: 18, fontWeight: 'bold', marginTop: 15 },
});