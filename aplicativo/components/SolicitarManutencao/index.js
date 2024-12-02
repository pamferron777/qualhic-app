import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, View, TextInput, Alert, Image } from 'react-native';
import { PrimaryButton } from '../../components/buttons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { URL_FOTO } from '../../services/api';
import { launchCamera } from '../Takephoto';
import ModalTool from '../Modal';
const styleInput = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#505050',
        width: 280
    },
    inputGroup: {
        marginTop: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    danger: {
        color: '#e74c3c'
    },
    iconFont: {
        color: '#505050'
    },
});



const RatingBar = (props) => {
    const { onChangeRating } = props;
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    useEffect(() => {
        if (onChangeRating)
            onChangeRating(defaultRating);
    }, [defaultRating]);
    useEffect(() => {
        setDefaultRating(2);
    }, [])
    return (
        <View style={{ padding: 20, borderWidth: 1, borderColor: '#505050' }}>


            <Text style={{ fontWeight: 'bold', color: '#505050', fontSize: 16 }}>
                Avaliação</Text>
            <Text style={{ color: '#505050' }}>De 1 estrela a 5 estrelas, qual o nível de conservação da ATI?
            </Text>
            <View style={styles.ratingBarStyle}>
                {maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => setDefaultRating(item)}>
                            <Image
                                style={styles.starImageStyle}
                                source={
                                    item <= defaultRating
                                        ? require('../../assets/images/star_fill.png')
                                        : require('../../assets/images/star.png')
                                }
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};



const CardItemConfiguracao = ({ nome, urlFoto, id, onPress }) => {
    return <TouchableOpacity
        style={{ maxWidth: 120, justifyContent: 'center', alignItems: 'center', padding: 12, borderRadius: 4, marginRight: 2 }}
        onPress={() => {
            onPress();
        }}>
        <Image
            style={{ width: 100, height: 100 }}
            source={{
                uri: URL_FOTO + urlFoto,
            }}
        />
        <Text style={{ fontWeight: 'bold', color: '#707070' }}>{nome}</Text>
    </TouchableOpacity>


}

export default function SolicitarManutencao(props) {
    const [chooseNecessitaManutencao, setChooseNecessitaManutencao] = useState([{ value: "0", nome: "Não necessita manutenção" },
    { value: "1", nome: "Necessita manutenção" }]);
    const [validationSchema, setValidationSchema] = useState(Yup.object().shape({
        observacao: Yup.string(),
        necessita_manutencao: Yup.string()
            .required('Campo obrigatório'),
        avaliacao: Yup.string()
    }));


    const [necessitaManutencao, setNecessitaManutencao] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [infosEquip, setInfosEquip] = useState({ toolName: '', toolPhoto: '', id: null, problem: { photo: '', desc: '', id: null } });
    const [problems, setProblems] = useState([]);
    useEffect(() => { setProblems([]); }, [])
    const submitInfos = (photo, desc, id) => {
        let searched = false;
        for (let el of problems) {
            if (el?.id == id)
                searched = true;
        }
        if (searched)
            setProblems(problems.map(it => it.id == id ? { id: id, photo: photo, desc: desc } : it));
        else
            setProblems(old => [...old, { photo: photo, desc: desc, id: id }]);
        setShowModal(false);
    }
    const getProblemById = (id) => {
        let obj = {
            photo: '',
            desc: '',
            id: null
        }
        for (let el of problems) {
            if (el?.id == id)
                obj = el;
        }
        return obj;
    }


    return (
        <Formik

            initialValues={
                {
                    avaliacao: '',
                    observacao: '',
                    necessita_manutencao: '0'
                }
            }
            onSubmit={(values) => {
                let object = {
                    avaliacao: values.avaliacao,
                    observacao: values.observacao,
                    necessita_manutencao: values.necessita_manutencao,
                    problems: problems
                };
                if (values.necessita_manutencao != '1') {
                    object.avaliacao = '5';
                }
                props.submit(object);
            }}
            validationSchema={validationSchema}
            style={styles.alignItemsCenter}>
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched, submitForm }) => (
                <View>
                    <ModalTool toolInfo={infosEquip} showModal={showModal} handlingModalStatus={submitInfos} />
                    <KeyboardAvoidingView>
                        <View style={styleInput.inputGroup}>
                            <Picker
                                selectedValue={values.necessita_manutencao}
                                style={{ height: 50, width: 280, borderBottomWidth: 1, borderColor: '#505050' }}
                                onBlur={() => setFieldTouched('necessita_manutencao', true)}
                                onValueChange={(itemValue) => {
                                    handleChange('necessita_manutencao', itemValue);
                                    setFieldValue('necessita_manutencao', itemValue);
                                    setNecessitaManutencao(itemValue == '1' ? true : false);
                                    if (itemValue == '0') {
                                        setValidationSchema(Yup.object().shape({
                                            observacao: Yup.string(),
                                            necessita_manutencao: Yup.string()
                                                .required('Campo obrigatório'),
                                            avaliacao: Yup.string()
                                        }))
                                    } else {
                                        setValidationSchema(Yup.object().shape({
                                            observacao: Yup.string()
                                                .required("Campo obrigatório"),
                                            necessita_manutencao: Yup.string()
                                                .required('Campo obrigatório'),
                                            avaliacao: Yup.string()
                                                .required("Campo obrigatório")
                                        }))
                                    }
                                }}>
                                {chooseNecessitaManutencao.map(element => <Picker.Item key={element.value} label={element.nome} value={element.value} />)}
                            </Picker>
                            {errors.necessita_manutencao && touched.necessita_manutencao && <Text style={styleInput.danger}>{errors.necessita_manutencao}</Text>}

                        </View>

                        {necessitaManutencao ? <>
                            <View style={{ marginBottom: 16 }} />
                            <RatingBar onChangeRating={(value) => {
                                handleChange('avaliacao', value.toString());
                                setFieldValue('avaliacao', value.toString());
                            }} />
                            <View style={{ marginTop: 16 }} />
                            <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: '#101010' }}>Equipamentos </Text>
                            <Text style={{ textAlign: 'center', color: '#101010' }}>Por favor, selecione os equipamentos que estão com problemas.</Text>
                            <View style={{ justifyContent: 'center', alignContent: 'center', width: '100%', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {props?.equipamentos ?
                                    props?.equipamentos.map(function (el) {
                                        return <CardItemConfiguracao key={el?.id} nome={el?.equipamento?.nome} urlFoto={el?.equipamento?.foto} id={el?.id} onPress={
                                            () => {
                                                setShowModal(true);
                                                setInfosEquip({ toolName: el?.equipamento?.nome, toolPhoto: el?.equipamento?.foto, id: el?.equipamento?.id, problem: getProblemById(el?.equipamento?.id) });
                                            }
                                        } />
                                    }) : <></>}
                            </View>
                            <View style={{ marginBottom: 16 }} />
                        </>
                            : <View />}
                        <View style={styleInput.inputGroup}>
                            <TextInput placeholder={'Observação geral do problema'}
                                value={values.observacao}
                                style={styleInput.input}
                                onChangeText={handleChange('observacao')}
                                onBlur={() => setFieldTouched('observacao', true)}
                                multiline={true}
                                numberOfLines={6}
                                secureTextEntry={true} autoCorrect={false} />
                            {errors.observacao && touched.observacao && <Text style={styleInput.danger}>{errors.observacao}</Text>}
                        </View>

                        <View style={styles.alignItemsCenter}>
                            <PrimaryButton onPress={submitForm}>
                                <Text style={styles.textButton}>Avaliar</Text>
                            </PrimaryButton>
                        </View>
                        <View style={{ marginBottom: 32 }}></View>
                    </KeyboardAvoidingView>
                </View>
            )}
        </Formik>
    )
};


const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: '#8F4DE2',
        flex: 1
    },
    textButton: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    centerText: {
        textAlign: 'center'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    marTopmarBottom36: {
        marginTop: 36,
        marginBottom: 36
    },
    starImageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },

    ratingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    }

});