import React from 'react';
import { View, ActivityIndicator, StyleSheet} from 'react-native';

// import { Container } from './styles';

const SpinnerLoadingPrimaryColor = () => {
  return <View style={styles.main}>
      <ActivityIndicator  size="large" color="#8F4DE2" />
  </View>;
}
const styles = StyleSheet.create({
    main:{
        justifyContent:'center',
        alignItems:'center'
    },

});

export  {SpinnerLoadingPrimaryColor};