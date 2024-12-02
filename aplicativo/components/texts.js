import React from 'react';
import { Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

const styles = StyleSheet.create({
    centerTitle:{
        fontSize:28,
        color:'#505050',
        fontWeight:'bold',
        textAlign:'center'
    },
    subTitle:{
        fontSize:24,
        color:'#505050',
        fontWeight:'bold',
        textAlign:'center'
    },
    normalText: {
        fontSize:24,
        color:'#505050'
    },
    footerText:{
        color:'#505050',
        fontSize:12,
        position:'absolute',
        bottom:6,
        marginLeft:'auto',
        marginRight:'auto',
        left:0,
        right:0,
        textAlign:'center'
    },
    titleWhiteCenter:{
        fontSize:36,
        color:'#fff',
        textAlign:'center'
    },
    defaulText:{
        color:'#505050',
        fontSize:18
    }
});

const CenterTitle = (props) => {
  return <Text style={styles.centerTitle} {...props}>
      {props.children}
  </Text>;
}
const SubTitleCenter = (props) => {
    return <Text style={styles.subTitle} {...props}>
      {props.children}
  </Text>;
}
const NormalText = (props) => {
    return <Text style={styles.normalText} {...props}>
      {props.children}
  </Text>;
}
const FooterText = (props) => {
    return <Text style={styles.footerText} {...props}>
      {props.children}
  </Text>;
}

const TitleWhiteCenter = (props) => {
    return <Text style={styles.titleWhiteCenter} {...props}>
      {props.children}
  </Text>;
}
const DefaultText = (props) => {
    return <Text style={styles.defaulText} {...props}>
      {props.children}
  </Text>;
}



export {CenterTitle, NormalText, FooterText, TitleWhiteCenter, DefaultText, SubTitleCenter};