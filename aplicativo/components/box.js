import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons'

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import confEnv from './../env.json';


const SkeletonHome = ({ keyElement }) => {

    return <View style={{ marginTop: 32 }} key={keyElement}>
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row" justifyContent={'space-evenly'} flexWrap="wrap">
                <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                <SkeletonPlaceholder.Item marginLeft={20}>
                    <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
                    <SkeletonPlaceholder.Item
                        marginTop={6}
                        width={80}
                        height={20}
                        borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item marginTop={6} width={160} height={20} borderRadius={4} />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    </View>
}

const PersonText = ({ children }) => {
    return <Text style={styles.text}>{children}</Text>
}


function LeitoCard(props) {
    const { nome, id, ultima_vistoria } = props.element;
    const { children } = props;
    const { isNavigation } = props;
    return (<TouchableOpacity
        onPress={() => { if (isNavigation) props.navigation.navigate('Leitos', { id }); }}
        style={styles.leitoContainer}>
        <FontAwesomeIcon color={'#fff'} icon={faBed} size={46} />
        <PersonText>Leito {nome}</PersonText>

        {children}
    </TouchableOpacity>);
}


const NotSearchedResults = () => {
    return <View style={{ marginTop: 36, justifyContent: 'center', alignContent: 'center', display: 'flex' }}>
        <Image source={require('../assets/images/not_found_results.png')} style={{ width: 250, height: 250, alignSelf: 'center' }} />
    </View>;
}

const Hr = (props) => {
    return <View style={{
        height: 1, width: 150, borderWidth: 1,
        marginBottom: 2, marginTop: 16, borderColor: '#505050',
        backgroundColor: "#505050"
    }} />
}

const styles = StyleSheet.create({
    leitoContainer: {
        padding: 16,
        width: 160,
        height: 160,
        marginBottom: 16,
        marginLeft:6,
        backgroundColor: confEnv.main_color,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    text: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
        marginTop: 6
    }
});


export { LeitoCard, NotSearchedResults, SkeletonHome };