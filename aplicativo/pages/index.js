import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, LogBox } from 'react-native';
import Home from './Home/Home';
import Login from './Login/Login';
import SideBar from './SideBar/SiderBar';
import Exit from './Exit/Exit';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connection } from '../services/api';
import { Provider } from 'react-redux';
import storeRedux from '../services/Store';
import { useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useDispatch } from 'react-redux';
import confEnv from './../env.json';
import Mid from './Mid/Mid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotificationMessageHandler, requestUserPermission } from '../services/HandlerNotification/handlerNotification';
import HomeAdmin from './Admin/Home/HomeAdmin';
import Register from './Admin/Register/Register';
import PostColab from './Colab/Post/PostColab';
import Dashboard from './Dashboard/Dashboard';
function removeAll() {
    return { type: 'REMOVE_ALL', payload: {} };
}
const reducers = combineReducers({
    store: storeRedux
});
const persistedReducer = persistReducer({
    storage: AsyncStorage,
    key: 'root'
}, reducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const Routes = () => {
    const [isLogged, setIsLogged] = useState(false);
    const data = useSelector(state => state.store.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        requestUserPermission(data);
        NotificationMessageHandler(data);
    }, []);
    useEffect(() => {
        requestUserPermission(data);
    }, [data]);

    const get = async () => {
        try {
            let token = data.token;
            if (token) {
                try {
                    let response = await connection(token).get('/test-token');
                    if (response.status === 200)
                        setIsLogged(true);
                    else {
                        dispatch(removeAll());
                        setIsLogged(false);
                    }
                } catch (ex) {
                    dispatch(removeAll());
                    setIsLogged(false);
                }

            } else {
                dispatch(removeAll());
                setIsLogged(false);
            }
        } catch (ex) {
            dispatch(removeAll());
            setIsLogged(false);
        }

    }
    useEffect(() => {
        get();

    }, []);
    useEffect(() => {
        get();
    }, [data]);
    return (
        <NavigationContainer>
            <SafeAreaView style={{ flex: 0, backgroundColor: confEnv.main_color }} />
            <SafeAreaView style={{ flex: 1 }}>
                {!isLogged ?
                    <Stack.Navigator screenOptions={{}} initialRouteName="Mid" >
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                title: '', headerTransparent: true,
                                headerShown: false
                            }}
                            navigationsOptions={{

                            }}
                        />
                        <Stack.Screen
                            name="Mid"
                            component={Mid}
                            options={{ title: '', headerTransparent: true }}

                        />
                    </Stack.Navigator>
                    :
                    data?.funcao_nome == 'Administrador' ? <>
                        <Drawer.Navigator initialRouteName="Home" drawerContent={SideBar}>
                            <Drawer.Screen name="Home" component={HomeAdmin} options={{ title: 'Home', headerTransparent: true, headerTintColor: '#fff' }} />
                            <Drawer.Screen name="Registrar" component={Register} options={{ title: 'Registrar', headerTransparent: true, headerTintColor: '#fff' }} />
                            <Drawer.Screen name="Registrar" component={Dashboard} options={{ title: 'Dashboard', headerTransparent: true, headerTintColor: '#fff' }} />
                            <Drawer.Screen name="Sair" component={Exit}
                                options={{ title: 'Sair', headerTransparent: true, headerTintColor: '#fff' }}
                                navigationsOptions={{
                                    drawerLabel: () => null
                                }}
                            />
                        </Drawer.Navigator>
                    </> : <>
                        <Drawer.Navigator initialRouteName="Home" drawerContent={SideBar}>
                            <Drawer.Screen name="Home" component={Home} options={{ title: 'Home', headerTransparent: true, headerTintColor: '#fff' }} />
                            <Drawer.Screen name="Atividade" component={PostColab} options={{ title: 'Atividade', headerTransparent: true, headerTintColor: '#fff' }} />
                            <Drawer.Screen name="Sair" component={Exit}
                                options={{ title: 'Sair', headerTransparent: true, headerTintColor: '#fff' }}
                                navigationsOptions={{
                                    drawerLabel: () => null
                                }}
                            />
                        </Drawer.Navigator>
                    </>

                }
            </SafeAreaView>
            <StatusBar backgroundColor={confEnv.main_color} barStyle='light-content' />
        </NavigationContainer>

    )
}
const RouteProvider = () => {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Routes />
        </PersistGate>
    </Provider>

}
export default RouteProvider;

