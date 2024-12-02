import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import confEnv from './../env.json';

const styles = StyleSheet.create({
    primaryButton: {
        borderRadius: 6,
        backgroundColor: confEnv.main_color,
        width: 200,
        padding: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    primaryButtonRounded: {
        borderRadius: 100,
        backgroundColor: confEnv.main_color,
        width: 60,
        height: 60,
        padding: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    primaryButtonSmall: {
        borderRadius: 6,
        backgroundColor: confEnv.main_color,
        width: 150,
        padding: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    successButtonSmall: {
        borderRadius: 6,
        backgroundColor: '#2DB327',
        width: 150,
        padding: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },

    SecundaryButton: {
        backgroundColor: '#f2f2f2',
        borderRadius: 6,
        width: 300,
        padding: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }

});
// import { Container } from './styles';

const PrimaryButton = (props) => {
    return <TouchableOpacity {...props} style={styles.primaryButton}>
        {props.children}
    </TouchableOpacity>;
}

const PrimaryButtonRounded = (props) => {
    return <TouchableOpacity {...props} style={styles.primaryButtonRounded}>
        {props.children}
    </TouchableOpacity>;
}
const PrimaryButtonSmall = (props) => {
    return <TouchableOpacity {...props} style={styles.primaryButtonSmall}>
        {props.children}
    </TouchableOpacity>;
}
const SuccessButtonSmall = (props) => {

    return <TouchableOpacity {...props} style={styles.successButtonSmall}>
        {props.children}
    </TouchableOpacity>;
}
const SecundaryButton = (props) => {
    return <TouchableOpacity {...props} style={styles.SecundaryButton}>
        {props.children}
    </TouchableOpacity>;
}


export { PrimaryButton, SecundaryButton, PrimaryButtonSmall, SuccessButtonSmall, PrimaryButtonRounded };