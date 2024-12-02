import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Alert, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faUser, faArrowLeft, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import { Container } from './styles';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

const Header = ({ navigation, data }) => {
    return <><View style={styles.header}>
        <TouchableOpacity onPress={navigation.openDrawer}>
            <FontAwesomeIcon style={styles.menu} icon={faBars} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Sair") }} style={styles.containerUser}>
            <FontAwesomeIcon icon={faUser} style={styles.iconPerson} /><Text style={styles.nome}>{data.nome}</Text>
        </TouchableOpacity>

    </View>
        <View style={{ alignContent: 'flex-end', alignItems: 'flex-end', marginRight: 12, marginBottom: 12 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{data?.funcao_nome}</Text>
        </View>
    </>;
}
const HeaderSecundary = ({ navigation: { goBack }, navigation, data, routePerson }) => {
    return <><View style={styles.header}>
        <TouchableOpacity onPress={() => {
            if (routePerson)
                navigation.navigate(routePerson);
            else
                goBack();
        }}>
            <FontAwesomeIcon style={styles.menu} icon={faAngleLeft} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Sair") }} style={styles.containerUser}>
            <FontAwesomeIcon icon={faUser} style={styles.iconPerson} /><Text style={styles.nome}>{data.nome}</Text>
        </TouchableOpacity>
    </View>
        <View style={{ alignContent: 'flex-end', alignItems: 'flex-end', marginRight: 12, marginBottom: 12 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{data?.funcao_nome}</Text>
        </View>
    </>
        ;
}

const HeaderProduto = ({ navigation: { goBack }, navigation, data, mainImage, nextImage, previousImage }) => {
    return <View style={styles.headerProduto}>
        <TouchableOpacity onPress={() => {
            goBack();
        }}>
            <FontAwesomeIcon style={styles.menu} icon={faAngleLeft} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Sair") }} style={styles.containerUser}>
            <FontAwesomeIcon icon={faUser} style={styles.iconPerson} /><Text style={styles.nome}>{data.nome}</Text>
        </TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    containerUser: {
        flexDirection: 'row'
    },
    menu: {
        color: '#fff',
        marginLeft: 24
    },
    nome: {
        color: '#fff',
        marginRight: 24
    },
    iconPerson: {
        color: '#fff',
        marginRight: 4
    },
    white: {
        color: '#fff'
    },
    header: {
        paddingTop: 12,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    headerProduto: {
        paddingTop: 12,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
});

export default Header;
export { HeaderSecundary, HeaderProduto }