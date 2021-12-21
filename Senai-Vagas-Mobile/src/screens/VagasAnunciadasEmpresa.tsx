import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import Card from '../components/cardCandidato'
import CardEmpresa from '../components/cardEmpresa';
import AuthContext from '../context/auth';
import token from '../interfaces/token';
import api from '../services/api';
import jwt from '../services/tokenDecoder';

const VagasAnunciadasEmpresa = () => {


    const { GetTokenUser, Logout } = useContext(AuthContext)

    let tokenDecoded: token;

    GetTokenUser().then(token => {
        tokenDecoded = token !== null ? jwt(token) : null;
    })

    const [Vagas, setVagas] = useState([]);

    useEffect(() => {
        Listar();
    })

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
            .get(`Vagas/vagas-empresa/buscar/usuario/${tokenDecoded.jti}`, initListar)
            .then(resp => {
                setVagas(resp.data);
            })
            .catch(error => {
                if (error.response) {
                    return Alert.alert(error.response.data)
                }
            })

    }


    return (
        <View>
            <View>
                <View style={styles.boxLogout}>
                    <TouchableOpacity style={styles.botaoLogout} onPress={() => Logout()}>
                        <Text style={styles.textoLogout}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <Image style={styles.vagas} source={require('../assets/images/IconVagas.png')} />
                <Text style={styles.vagasTitle}>Vagas Anunciadas</Text>
            </View>
            <View style={styles.pagina}>
                {
                    Vagas.map((item: any) => {
                        return (

                            <CardEmpresa nomeVaga={item.nomeVaga} descricao={item.descricaoVaga} vagaId={item.id} vagaAtiva={item.vagaAtiva} />

                        )
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        height: 100,
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 30
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
    logo: {
        height: 60,
        width: 180,
        marginLeft: 'auto',
        marginRight: 30
    },
    menu: {
        height: 40,
        width: 40,
        marginLeft: 30,
        marginTop: 5
    },
    vagas: {
        height: 70,
        width: 70,
        alignSelf: 'center',
        marginTop: 20
    },
    vagasTitle: {
        fontSize: 15,
        textAlign: 'center'
    },

    pagina: {

    }

})

export default VagasAnunciadasEmpresa;