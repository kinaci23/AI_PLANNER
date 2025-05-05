import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MainScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [plans, setPlans] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlan, setNewPlan] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addPlan = () => {
    if (!newPlan.trim()) return;
    const updatedPlans = {
      ...plans,
      [selectedDate]: [...(plans[selectedDate] || []), newPlan],
    };
    setPlans(updatedPlans);
    setNewPlan('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Text style={styles.menuToggle}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.toolbarText}>Planlayıcı</Text>
      </View>

      {sidebarOpen && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarItem}>Home</Text>
          <Text style={styles.sidebarItem}>Profile</Text>
          <Text style={styles.sidebarItem}>Settings</Text>
        </View>
      )}

      <View style={styles.content}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={selectedDate ? { [selectedDate]: { selected: true, selectedColor: '#4CAF50' } } : {}}
        />
        {selectedDate && (
          <View style={styles.planSection}>
            <Text style={styles.dateTitle}>{selectedDate} için planlar:</Text>
            <FlatList
              data={plans[selectedDate] || []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.planCard}>
                  <Text>{item}</Text>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>Henüz plan yok.</Text>}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>+ Plan Ekle</Text>
            </TouchableOpacity>
          </View>
        )}
        <Button title="Logout" onPress={() => console.log('Logging out')} />
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Planını yaz..."
              style={styles.input}
              value={newPlan}
              onChangeText={setNewPlan}
            />
            <Button title="Ekle" onPress={addPlan} />
            <Button title="İptal" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  toolbar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuToggle: {
    color: 'white',
    fontSize: 24,
  },
  toolbarText: {
    color: 'white',
    fontSize: 24,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#4CAF50',
    paddingTop: 50,
  },
  sidebarItem: {
    color: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  content: {
    padding: 20,
    flex: 1,
  },
  planSection: {
    marginTop: 20,
  },
  dateTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  planCard: {
    backgroundColor: '#e0f2f1',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
});

export default MainScreen;
