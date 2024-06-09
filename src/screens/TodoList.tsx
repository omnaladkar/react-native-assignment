import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTodos();
  }, [page]);

  const fetchTodos = async () => {
    // Mock fetch function
    const newTodos = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1 + (page - 1) * 10,
      title: `Todo ${i + 1 + (page - 1) * 10}`,
    }));
    setTodos(prevTodos => [...prevTodos, ...newTodos]);
  };

  const handleUpdateTodo = () => {
    // Handle update todo
    setModalVisible(false);
    Toast.show({
      type: 'success',
      text1: 'Todo updated successfully!',
    });
  };

  const loadMoreTodos = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>
            <Button title="Edit" onPress={() => {
              setCurrentTodo(item);
              setModalVisible(true);
            }} />
          </View>
        )}
        onEndReached={loadMoreTodos}
        onEndReachedThreshold={0.5}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text>Edit Todo</Text>
          <Button title="Update" onPress={handleUpdateTodo} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default TodoScreen;
