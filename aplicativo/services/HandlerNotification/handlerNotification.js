import messaging from '@react-native-firebase/messaging';
import { connection } from '../api';
import { Alert } from 'react-native';
import { requestNotifications, PERMISSIONS } from 'react-native-permissions';
async function requestUserPermission(data) {
    try {
        requestNotifications([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]);

        const authStatus = await messaging().requestPermission();

        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled)
            saveTokenDataBase(data);

    } catch (ex) {
        console.log(`Erro ao request: ${ex}`);
    }

}




async function saveTokenDataBase(data, token = null) {
    if (!token)
        token = await messaging().getToken();
    console.log(`Token: ${token}`);


    if (!data.token || !token)
        return;
    try {
        await connection(data?.token).post("/api/save-token", {
            token: token
        });
    } catch (ex) {
        console.error("Erro ao salvar o token:", ex);
    }
}




const NotificationMessageHandler = (data) => {

    messaging().getInitialNotification().then(async remoteMessage => {
        if (remoteMessage?.notification)
            console.log(remoteMessage.notification.title, remoteMessage.notification.body);
    });
    messaging().onMessage(async remoteMessage => {
        if (remoteMessage?.notification)
            Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        if (remoteMessage?.notification)
            console.log(remoteMessage.notification.title, remoteMessage.notification.body);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage)
            console.log(remoteMessage.notification.title, remoteMessage.notification);
    });
    messaging().onTokenRefresh(token => {
        saveTokenDataBase(data, token);
    });

}



export {
    saveTokenDataBase,
    requestUserPermission,
    NotificationMessageHandler
}