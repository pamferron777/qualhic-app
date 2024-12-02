import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {Field} from 'formik'
const style = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#505050',
        width: 300
    },
    inputGroup: {
        marginTop: 16,
        marginBottom: 16
    }
});

const Input = (props) => {
    return <View style={style.inputGroup}>
        <TextInput {...props} style={style.input}>
            {props.children}
        </TextInput>
    </View>;
}
const InputField = (props) => {
    return <View style={style.inputGroup}>
        <Field {...props} style={style.input}>
            {props.children}
        </Field>
    </View>;
}

export default {Input, InputField};