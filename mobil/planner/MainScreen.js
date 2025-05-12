// MainScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MainScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [plans, setPlans] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlan, setNewPlan] = useState('');

  // --- Finans ---
  const [financeModalVisible, setFinanceModalVisible] = useState(false);
  const [expenses, setExpenses] = useState({
    kira: '',
    fatura: '',
    gida: '',
    ulasim: '',
    egitim: '',
    eglence: '',
  });

  const expenseCategories = ['kira', 'fatura', 'gida', 'ulasim', 'egitim', 'eglence'];

  const totalExpense = Object.values(expenses).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

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

      <ScrollView style={styles.content}>
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

        {/* --- Finans Yönetimi Kartı --- */}
        <View style={styles.financeCard}>
          <Text style={styles.financeTitle}>📊 Aylık Harcamalar</Text>
          {expenseCategories.map((cat) => (
            <View key={cat} style={styles.financeRow}>
              <Text style={styles.financeLabel}>{cat.toUpperCase()}</Text>
              <Text style={styles.financeValue}>{expenses[cat] || 0} ₺</Text>
            </View>
          ))}
          <View style={styles.financeTotal}>
            <Text style={styles.financeLabel}>Toplam</Text>
            <Text style={styles.financeValue}>{totalExpense} ₺</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => setFinanceModalVisible(true)}>
            <Text style={styles.addButtonText}>Finans Düzenle</Text>
          </TouchableOpacity>
        </View>

        <Button title="Logout" onPress={() => console.log('Logging out')} />
      </ScrollView>

      {/* Plan Ekleme Modali */}
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

      {/* Finans Girişi Modali */}
      <Modal visible={financeModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Aylık Giderlerini Gir</Text>
            {expenseCategories.map((cat) => (
              <TextInput
                key={cat}
                placeholder={`${cat.toUpperCase()} (₺)`}
                keyboardType="numeric"
                style={styles.input}
                value={expenses[cat]}
                onChangeText={(value) => setExpenses((prev) => ({ ...prev, [cat]: value }))}
              />
            ))}
            <Button title="Kaydet" onPress={() => setFinanceModalVisible(false)} />
            <Button title="İptal" onPress={() => setFinanceModalVisible(false)} color="red" />
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  // --- Finans Stillendirme ---
  financeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  financeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  financeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  financeLabel: {
    fontWeight: '500',
  },
  financeValue: {
    fontWeight: '500',
  },
  financeTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default MainScreen;
