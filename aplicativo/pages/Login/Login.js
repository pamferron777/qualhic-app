import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import { CenterTitle, FooterText } from '../../components/texts';
import FormLogin from '../../components/Login/Form';
import Toast from 'react-native-tiny-toast'
import { defaultConnection, axios } from '../../services/api';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import confEnv from './../../env.json';
import { requestUserPermission } from '../../services/HandlerNotification/handlerNotification.js';
function loginDispatch(data) {
  return { type: 'ADD_LOGIN', payload: data };
}

const Login = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.store.auth);
  const dispatch = useDispatch();
  const submit = async (usuarioParam, senhaParam) => {
    setLoading(true);
    setUsuario(usuarioParam);
    try {
      const response = await defaultConnection().post('/auth', {
        usuario: usuarioParam,
        password: senhaParam
      });
      setLoading(false);
      if (response.status === 200) {
        Toast.showSuccess('Seja bem vindo(a)!');
        
        dispatch(loginDispatch({
          token: response.data.token,
          nome: response.data.nome,
          funcao_nome: response?.data?.tipo_usuario
        }));
        
      }
    } catch (ex) {

      if (ex.response?.data?.errors)
        ex.response.data.errors.forEach(element => Toast.show(element));
      else {
        if (ex.response?.data?.msg)
          Alert.alert('Atenção', ex.response?.data?.msg);
        else
          Alert.alert('Atenção', "Por favor, tente novamente mais tarde.");
      }

      setLoading(false);
    }

  }
  return <View style={styles.mainContainer}>
    <View style={styles.headerLogo}>
      <Image source={require('../../assets/images/logo.png')} style={{ width: 230, marginTop: 16, marginBottom: 16 }} />

    </View>
    <View style={styles.container}>
      <CenterTitle>Login</CenterTitle>
      <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 12, marginTop: 6 }}>
        <View style={{ borderBottomColor: confEnv.main_color, borderBottomWidth: 1, width: 120 }} />
      </View>
      <View style={styles.alignItemsCenter}>
        {!loading ?
          <FormLogin
            onChangeUsuario={setUsuario}
            usuario={usuario}
            onChangeSenha={setSenha}
            senha={senha}
            submit={submit}
          /> :
          <>
            <SkeletonPlaceholder>
              <View style={{ height: 40, width: 300, borderRadius: 4 }} />
              <View style={{ height: 40, width: 300, borderRadius: 4, marginTop: 16 }} />
            </SkeletonPlaceholder>
            <Text>Acessando com: <Text style={{ fontWeight: 'bold' }}>{usuario}</Text></Text>
          </>
        }


      </View>
    </View>
  </View>;
}




const styles = StyleSheet.create({
  headerLogo: {
    alignContent: "center", alignItems: 'center', backgroundColor: confEnv.main_color,
    flex: 0.5
  },
  container: {
    borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#fff',
    flex: 1, width: '100%', padding: 20
  },
  mainContainer: {
    backgroundColor: confEnv.main_color,
    flex: 1
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    textTransform: 'uppercase'
  },
  textButtonSecundary: {
    textAlign: 'center',
    color: '#252525',
    fontSize: 18,
    textTransform: 'uppercase'
  },
  centerText: {
    textAlign: 'center'
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
  marTopmarBottom36: {
    marginTop: 36,
    marginBottom: 36
  }

});




export default Login;