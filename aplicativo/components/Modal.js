import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { PrimaryButtonSmall } from "./buttons";


function ModalTool({ toolInfo, showModal, handlingModalStatus }) {
    const [observacao, setObservacao] = useState('');
    useEffect(() => { if (toolInfo?.desc) setObservacao(toolInfo?.desc); }, [toolInfo]);
    return (
        <View style={{ flex: 1 }}>
            <Modal isVisible={showModal}>
                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <View style={{justifyContent:'flex-end', alignItems:'flex-end', width:'100%', padding:24}}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (handlingModalStatus)
                                        handlingModalStatus(null);
                                }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 64 }} />
                        
                        <Text style={{ color: '#101010', fontWeight: 'bold', fontSize: 18 }}>Relatar problema</Text>
                        <View style={{ marginBottom: 32 }} />

                        <View>
                            <Text style={{ fontWeight: 'bold', marginBottom: 16 }}>Descreva seu problema: </Text>
                            <TextInput placeholder={'Descrição'}
                                value={observacao}
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#505050',
                                    width: 280,
                                    height: 120
                                }}
                                onChangeText={(e) => { setObservacao(e) }}
                                multiline={true}
                                numberOfLines={6}
                                secureTextEntry={true} autoCorrect={false} />
                        </View>
                        <View style={{
                            marginBottom: 16,
                            marginTop: 16
                        }} />
                        <PrimaryButtonSmall
                            onPress={() => {
                                if (handlingModalStatus)
                                    handlingModalStatus(observacao);
                            }}>
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>Relatar problema</Text>
                        </PrimaryButtonSmall>



                        <View style={{ marginBottom: 32 }} />
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
}


function ModalChecar({ toolInfo, showModal, handlingModalStatus }) {
    const [observacao, setObservacao] = useState('');
    useEffect(() => {
        if (toolInfo?.desc)
            setObservacao(toolInfo?.desc);
    }, [toolInfo]);
    return (
        <View style={{ flex: 1 }}>
            <Modal isVisible={showModal}>
                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginTop: 64 }} />
                        <Text style={{ color: '#101010', fontWeight: 'bold', fontSize: 18 }}>Relatar problemas</Text>
                        <View style={{ marginBottom: 32 }} />

                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Descreva seu problema: </Text>
                            <TextInput placeholder={'Descrição'}
                                value={observacao}
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#505050',
                                    width: 280
                                }}
                                onChangeText={(e) => { setObservacao(e) }}
                                multiline={true}
                                numberOfLines={6}
                                secureTextEntry={true} autoCorrect={false} />
                        </View>
                        <View style={{
                            marginBottom: 16,
                            marginTop: 16
                        }} />
                        <PrimaryButtonSmall
                            onPress={() => {
                                if (handlingModalStatus)
                                    handlingModalStatus(observacao, id);
                            }}>
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>Relatar problema</Text>
                        </PrimaryButtonSmall>
                        <View style={{ marginBottom: 32 }} />
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32
    },
    button: {
        backgroundColor: '#373E70',
        borderRadius: 4,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
        width: 120,
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
});

export default ModalTool;
export {
    ModalChecar
}