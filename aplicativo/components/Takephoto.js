import React from 'react';
import { PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import * as RNFS from 'react-native-fs';
const launchCamera = (handlingAfterSuccessPhoto) => {
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Permissão de camera para o Localeasy",
                    message: "O aplicativo Localeasy precisa da sua permissão para poder tirar foto!",
                    buttonNeutral: "Pergunte-me depois",
                    buttonNegative: "Cancelar",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                let options = {
                    storageOptions: {
                        skipBackup: true,
                        path: 'images',
                    },
                };
                ImagePicker.launchCamera(options, (response) => {
                    if (response.didCancel) {
                        // console.log('User cancelled image picker');
                    } else if (response.error) {
                        // console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        // console.log('User tapped custom button: ', response.customButton);
                        // alert(response.customButton);
                    } else {
                        RNFS.readFile(response.assets[0].uri, "base64").then(based => {
                            handlingAfterSuccessPhoto({
                                base64:based
                            });
                        });
                    }
                });
            } else {
                // console.log("Camera permission denied");
            }
        } catch (err) {
            // console.warn(err);
        }
    };
    requestCameraPermission();

}
export {
    launchCamera
}