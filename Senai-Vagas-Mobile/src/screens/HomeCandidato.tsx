import React, { useState, useEffect, useContext } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Text, Alert } from 'react-native';

import api from '../services/api';
import jwt from '../services/tokenDecoder';
import AuthContext from '../context/auth';

// Interfaces
import token from '../interfaces/token';

import CardCandidatoHome from '../components/cardCandidatoHome';


function HomeCandidato() {
    const { GetTokenUser, Logout } = useContext(AuthContext)

    let tokenDecoded: token;

    GetTokenUser().then(token => {
        
        tokenDecoded = token !== null ? jwt(token) : null;
        console.log('-----------------------------------------------------------------')
        console.log(tokenDecoded)
        console.log('-----------------------------------------------------------------')
    })

    //dados Alteráveis
    const [palavraChave, setPalavraChave] = useState('')

    // Variavel com matriz de vagas, com o método que atualizará a lista
    const [vagas, updateVagas] = useState([]);

    const [Vagas, setVagas] = useState([]);

    //dados Estáticos
    const [municipios, setMunicipios] = useState([]);
    const [faixasSalariais, setFaixasSalariais] = useState([]);
    const [areasRecomendadas, setAreasRecomendadas] = useState([]);

    const [listMunicipios, setListMunicipios] = useState([]);

    const [idAreaRecomendada, setIdAreaRecomendada] = useState('');
    const [idMunicipio, setIdMunicipio] = useState('');
    const [idFaixaSalarial, setIdFaixaSalarial] = useState('');

    // filtro para municipios
    const [filter, setFilter] = useState('');
    //filtro para vagas
    const [vagafilter, setVagaFilter] = useState('');

    // Listar as vagas pela área de interesse de usuário e completa campos do filtro
    useEffect(() => {
        ListarVaga();
    }, []);

    const ListarVaga = async () => {

        if (tokenDecoded == null) {
            return Alert.alert('Não foi possível carregar as informações do candidato')
        }

        const initListar = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        await api
            .get(`Vagas/buscar/area-candidato/${tokenDecoded.jti}`, initListar)
            .then(resp => {
                setVagas(resp.data);
                console.log(resp.data)
            })
            .catch(error => {
                if (error.response) {
                    return alert(error.response.data)
                }
            })

        await api
            .get('FaixasSalariais/Buscar-faixas-salariais', initListar)
            .then(resp => {
                setFaixasSalariais(resp.data);
            })
            .catch(erro => console.log(erro))

        await api
            .get('Areas/Buscar-areas', initListar)
            .then(resp => {
                setAreasRecomendadas(resp.data);
            })
            .catch(erro => console.log(erro))

        await api
            .get('Enderecos/buscar-municipios', initListar)
            .then(resp => {
                setListMunicipios(resp.data);
                setMunicipios(resp.data);
                setIdMunicipio(resp.data[0].id)
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
            return alert('O campo de busca não pode estar vazio.')
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

    const getFonts = () => Font.loadAsync({
        'sansation-regular': require('../assets/fonts/Sansation_Regular.ttf')
    });

    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (fontsLoaded) {

        return (
            <View style={styles.container}>

                <View style={styles.boxTitle}>
                <TouchableOpacity style={styles.botaoSearch} onPress={event => {
                        event.preventDefault();
                        Logout();
                    }}>
                        <Text style={styles.textSearch}>Sair</Text>
                </TouchableOpacity>

                    <Image style={styles.imageInscricao} source={require('../assets/images/IconVagas.png')} />
                    <Text style={styles.textTitle}>Procurar Vagas</Text>
                </View>

                <View style={styles.boxSearch}>
                    <TextInput style={styles.inputSearch} placeholder="Busque Vagas" />
                    <TouchableOpacity style={styles.botaoSearch} onPress={event => {
                        event.preventDefault();
                        // buscarVagas();
                    }}>
                        <Text style={styles.textSearch}>Buscar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.modalVaga}>

                    {
                        Vagas.map((item: any) => {
                            return (
                                <CardCandidatoHome
                                    nomeVaga={item.nomeVaga}
                                    descricao={item.descricaoVaga}
                                    vagaId={item.id}
                                    vagaAtiva={item.vagaAtiva}
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

    textTitle: {
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
        borderColor: 'white',
    }
})

export default HomeCandidato;