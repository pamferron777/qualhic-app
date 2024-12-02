import React from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, View, TextInput, Alert, Button } from 'react-native';
import { InputField, Input } from '../../components/input';
import { PrimaryButton } from '../../components/buttons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faLock, faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'

const styleInput = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#909090',
        width: 280,
        color:'#909090'
    },
    inputGroup: {
        marginTop: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    danger: {
        color: '#e74c3c',
        width:'100%',
        textAlign:'center',
        marginTop:16
    },
    iconFont: {
        color: '#505050',
        marginRight:6
    },
});

export default function PersonForm(props) {
    return (
        <Formik

            initialValues={{ usuario: '', senha: '' }}
            onSubmit={(values) => {
                props.onChangeUsuario(values.usuario);
                props.onChangeSenha(values.senha);
                props.submit(values.usuario, values.senha);
            }}
            validationSchema={Yup.object().shape({
                usuario: Yup.string()
                    .required('Campo obrigatório')
                    .min(4, 'Digite pelo menos 4 caracteres')
                ,
                senha: Yup.string()
                    .required('Campo obrigatório')
                    .min(4, 'Digite pelo menos 4 caracteres')
            })}
            style={styles.alignItemsCenter}>
            {({ values, errors, touched, handleChange, handleBlur, setFieldTouched, submitForm }) => (
                <View>
                    <KeyboardAvoidingView>
                        <View style={styleInput.inputGroup}>
                        <FontAwesomeIcon style={styleInput.iconFont} icon={faUser} />
                            <TextInput placeholder="Usuário"
                                value={values.usuario}
                                style={styleInput.input}
                                onChangeText={handleChange('usuario')}
                                onBlur={() => setFieldTouched('usuario', true)}
                                autoCapitalize={'none'}
                                autoCorrect={false} />
                            
                            {errors.usuario && touched.usuario && <Text style={styleInput.danger}>{errors.usuario}</Text>}
                        </View>

                        <View style={styleInput.inputGroup}>
                        <FontAwesomeIcon style={styleInput.iconFont} icon={faLock} />
                            <TextInput placeholder={'Senha'}
                                value={values.senha}
                                style={styleInput.input}
                                onChangeText={handleChange('senha')}
                                onBlur={() => setFieldTouched('senha', true)}
                                secureTextEntry={true} autoCorrect={false} />
                            
                            {errors.senha && touched.senha && <Text style={styleInput.danger}>{errors.senha}</Text>}

                        </View>

                        <View style={styles.alignItemsCenter}>
                            <PrimaryButton onPress={submitForm}>
                                <Text style={styles.textButton}>ACESSAR&nbsp;
                                <FontAwesomeIcon style={{color:'#101010', marginLeft:6}} icon={faPaperPlane} />
                                </Text>
                            </PrimaryButton>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            )}
        </Formik>
    )
};


const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: '#8F4DE2',
        flex: 1
    },
    textButton: {
        textAlign: 'center',
        color: '#101010',
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