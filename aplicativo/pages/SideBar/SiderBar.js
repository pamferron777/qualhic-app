import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerItemList, DrawerItems } from '@react-navigation/drawer';
// let menus = {routes: ['Home', 'Perfil', 'Sair']};
const SideBar = (props) => {
  const { state, ...rest } = props;
  const newState = { ...state }  //copy from state before applying any filter. do not change original state
  newState.routes = newState.routes.filter(item => item.name !== 'LOCAIS_MANUTENCAO')
  newState.routes = newState.routes.filter(item => item.name == 'Locais' ? 'Leitos' : item.name) //replace "Login' with your route name
  return (
    <>
      <View style={{ alignItems: 'center', marginBottom: 16, marginTop: 16 }}>
        <TouchableOpacity  onPress={() => { props.navigation.navigate('Home') }}>
          <Image source={require('../../assets/images/logo_pessoa.png')} style={{ width: 153, height: 120, borderRadius:16 }} />
        </TouchableOpacity>
      </View>
      <DrawerItemList
        {...props}
        state={newState}
        activeBackgroundColor={'#373E70'}
        activeTintColor={'#fff'}
      />

    </>
  );
}

export default SideBar;