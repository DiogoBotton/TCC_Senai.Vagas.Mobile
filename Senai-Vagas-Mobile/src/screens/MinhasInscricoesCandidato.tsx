import React, { useState, useEffect, useContext } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
//Api
import api from '../services/api';
// Interfaces
// Token Decoder
import jwt from '../services/tokenDecoder';
// Interfaces
import token from '../interfaces/token';
//Page
import CardCandidato from '../../src/components/cardCandidato'
import AuthContext from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


function MinhasInscricoesCandidato() {

    const { GetTokenUser, Logout } = useContext(AuthContext)

    let tokenDecoded: token;

    GetTokenUser().then(token => {      
        tokenDecoded = token !== null ? jwt(token) : null;
    })

    const [Vagas, setVagas] = useState([]);

    //filtro para vagas
    const [vagafilter, setVagaFilter] = useState('');

    const [statusVaga, setStatusVaga] = useState('');
    const [idStatusVaga, setIdStatusVaga] = useState('');
    const [statusVagas, setStatusVagas] = useState([]);

    useEffect(() => {
        Listar();
    }, []);

    const initListar = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const Listar = async () => {

        if (tokenDecoded == null) {
            return Alert.alert('Não foi possível carregar as informações do candidato')
        }

        await api
            .get(`Inscricoes/usuario/${tokenDecoded.jti}`, initListar)
            .then(resp => {
                setVagas(resp.data);
            })
            .catch(erro => console.log(erro))

        await api
            .get('Vagas/buscar-statusvaga', initListar)
            .then(resp => {
                setStatusVagas(resp.data);
            })
            .catch(erro => console.log(erro))
    }

    const buscarVagas = async () => {
        if (tokenDecoded == null) {
            return Alert.alert('Não foi possível recuperar as informações do candidato para procurar vagas.')
        }

        const form = {
            filter: vagafilter
        }

        if (form.filter.length === 0) {
            return Alert.alert('O campo de busca não pode estar vazio.')
        }


        const initListar = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        await api
            .post(`Vagas/buscar/vaga-filtro/usuario/${tokenDecoded.jti}`, form, initListar)
            .then(resp => {
                if (resp.status === 200) {
                    setVagas(resp.data);
                }
            })
            .catch(error => {
                console.log(error.response)
                if (error.response) {
                    return alert(error.response.data)
                }
            })
    }


    //Funcao para pegar font
    const getFonts = () => Font.loadAsync({
        'sansation-regular': require('../assets/fonts/Sansation_Regular.ttf')
    });

    //funcao para setar a font
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (fontsLoaded) {

        return (
            <View style={styles.container}>

                <View style={styles.boxLogout}>
                    <TouchableOpacity style={styles.botaoLogout} onPress={() => Logout()}>
                        <Text style={styles.textoLogout}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.boxTitle}>

                    <Image style={styles.imageInscricao} source={require('../assets/images/IconInscricao.png')} />
                    <Text style={styles.textminhasInscricoes}>Minhas Inscrições</Text>
                </View>

                <View style={styles.boxSearch}>
                    <TextInput style={styles.inputSearch} placeholder="Busque Vagas" />
                    <TouchableOpacity style={styles.botaoSearch} onPress={event => {
                        event.preventDefault();
                        buscarVagas();
                    }}>
                        <Text style={styles.textSearch}>Buscar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.modalVaga}>

                    {
                        Vagas.map((item: any) => {
                            return (
                                <CardCandidato
                                    nomeVaga={item.nomeVaga}
                                    descricao={item.descricaoVaga}
                                    vagaId={item.id}
                                    vagaAtiva={item.vagaAtiva}
                                    recebeuConvite={item.candidatoRecebeuConvite}
                                />
                            )
                        })
                    }
                </View>
            </View>
        );
    } else {
        return (

            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontsLoaded(true)}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },

    boxLogout: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginRight: 50,
        marginTop: 5
    },

    iconSaida: {

    },

    botaoLogout: {
        backgroundColor: 'red',
        borderRadius: 5
    },

    textoLogout: {
        color: 'white',
        padding: 5
    },

    boxTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    imageInscricao: {
        marginTop: 50,
        height: 70,
        width: 70
    },

    textminhasInscricoes: {
        marginTop: 5,
        fontSize: 18,
        fontFamily: 'sansation-regular',
    },

    boxSearch: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginTop: 30,
        marginHorizontal: 80,
        backgroundColor: '#FFFFFF',

        borderColor: '#bfbfbf',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,


    },

    inputSearch: {
        fontSize: 15

    },

    botaoSearch: {
        marginLeft: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 7
    },

    textSearch: {
        color: 'white',
        fontSize: 14,
    },

    modalVaga: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 15,
    },

    boxVaga: {
        display: 'flex',
        justifyContent: 'center',
        height: 30,
        width: 250
    }
})

export default MinhasInscricoesCandidato;