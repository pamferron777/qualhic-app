import React, { useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import {useDispatch} from 'react-redux';
// import { Container } from './styles';
function exitStore () {
    return {
        type: 'REMOVE_ALL'
    }
}

const Exit = ({ navigation }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(exitStore())
        
    }, []);
    return <View />;
}

export default Exit;