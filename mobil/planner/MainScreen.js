// MainScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const MainScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Text style={styles.menuToggle}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.toolbarText}>Main Screen</Text>
      </View>

      {sidebarOpen && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarItem}>Home</Text>
          <Text style={styles.sidebarItem}>Profile</Text>
          <Text style={styles.sidebarItem}>Settings</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text>Welcome to the main screen!</Text>
        <Button title="Logout" onPress={() => console.log('Logging out')} />
      </View>
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
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    flex: 1,
  },
});

export default MainScreen;
