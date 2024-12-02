import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Alert, StyleSheet, TouchableOpacity, RefreshControl, Image } from 'react-native';
import Header from '../../../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { LeitoCard, NotSearchedResults, SkeletonHome } from '../../../components/box';
import { connection } from '../../../services/api';
import confEnv from '../../../env.json';
import { getLeitos } from './handlers/api';
const Home = ({ navigation, route }) => {
  const data = useSelector(state => state.store.auth);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();




  const get = async () => {
    setLoading(true);
    try {
      const responseData = await getLeitos(data.token);
      setResponse(responseData);
    } catch (ex) {
      if (ex.message == 'Unathourized')
        dispatch({ type: 'REMOVE_ALL', payload: {} });
      else
        Alert.alert("Atenção", ex.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }



  useEffect(() => {
    if (route.params?.reset) {
      setRefreshing(true);
      get();
    }
  }, [route.params]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    get();
  }, [data.token]);
  useEffect(() => { get() }, []);


  
  return <View style={styles.mainContainer}>
    <Header navigation={navigation} data={data} />
    <ScrollView style={styles.content} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.alignItemsCenter}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, width: '100%', textAlign: 'center', marginBottom: 24, color: "#101010" }}>Leitos</Text>
        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}><View style={{ height: 1, width: 250, borderWidth: 1, marginBottom: 16, borderColor: '#505050', backgroundColor: "#505050" }} /></View>
      </View>
      <View style={styles.alignItemsCenter}>
        {!loading ?
          !!response.length && typeof response == 'object' ?
            response.map(element => <LeitoCard key={element.id} isNavigation={true} navigation={navigation} element={element} />)
            : <NotSearchedResults />
          :
          [1, 2, 3, 4].map(el => <SkeletonHome key={el} keyElement={el} />)}
      </View>
      <View style={{ marginBottom: 24 }} />
    </ScrollView>
  </View>;
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: confEnv.main_color,
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12

  },
});

export default Home;