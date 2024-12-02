import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/header';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/buttons';
const DefaultComponent = ({ navigation }) => {
  const data = useSelector(state => state.store.auth);
  const get = async () => {
    
  }


  return <View style={styles.mainContainer}>
    <Header navigation={navigation} data={data} />
    <ScrollView style={styles.content}>
      <View style={styles.alignItemsCenter}>
      </View>
      <View style={{ marginBottom: 24 }} />
    </ScrollView>
    

  </View>;
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#8F4DE2',
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  centerText: {
    textAlign: 'center'
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
});

export default DefaultComponent;