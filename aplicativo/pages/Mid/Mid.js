import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { connection } from '../../services/api';
import { useDispatch } from 'react-redux';
function removeAll() {
    return { type: 'REMOVE_ALL', payload: {} };
}
const Mid = (props) => {
    const { navigation } = props;
    const [isLogged, setIsLogged] = useState(null);
    const data = useSelector(state => state.store.auth);
    const dispatch = useDispatch();
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsLogged(null);
            get();
        });
        return unsubscribe;
    }, [navigation]);
    const get = async () => {
        try {
            let token = data.token;
            if (token) {
                try {
                    let response = await connection(token).get('/test-token');
                    if (response.status === 200)
                        setIsLogged('1');
                    else {
                        dispatch(removeAll());
                        setIsLogged('2');
                    }
                } catch (ex) {
                    dispatch(removeAll());
                    setIsLogged('2');
                }

            } else {
                dispatch(removeAll());
                setIsLogged('2');
            }
        } catch (ex) {
            dispatch(removeAll());
            setIsLogged('2');
        }

    }
    useEffect(() => {
        get();
    }, []);
    useEffect(() => {
        if (isLogged == '2') {
            navigation.navigate('Login');
            setIsLogged(null);
        }
    }, [isLogged]);
    return <View style={{ alignContent: 'center', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'#FEAC30'} />
        <Text>Aguarde, estamos te redirecionando...</Text>
    </View>;
}

export default Mid;