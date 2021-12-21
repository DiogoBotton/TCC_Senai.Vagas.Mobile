import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';

import jwt from '../services/tokenDecoder';
import api from '../services/api';
import AuthContext from '../context/auth';
// Interfaces
import token from '../interfaces/token';
interface CardProps {
    nomeVaga: string;
    descricao: string;
    vagaAtiva: Boolean;
    vagaId: number;
}


const cardCandidatoHome: React.FC<CardProps> = ({ nomeVaga, descricao, vagaAtiva, vagaId }) => {
    const { GetTokenUser } = useContext(AuthContext)

    let tokenDecoded: token;

    GetTokenUser().then(token => {
        tokenDecoded = token !== null ? jwt(token) : null;
    })

    // Dados estáticos
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [tipoExperiencia, setExperiencia] = useState('');
    const [cargo, setCargo] = useState('');
    const [faixaSalarial, setFaixaSalarial] = useState('');

    const [nomeMunicipio, setNomeMunicipio] = useState('');
    const [ufSigla, setUfSigla] = useState<any>({});

    const [dataEncerramento, setDataEncerramento] = useState('');
    const [areaVagaRecomendadas, setAreaVagaRecomendadas] = useState([]);


    const VerMais = async (vagaId: number) => {
        if (tokenDecoded== null) {
            return Alert.alert('Não foi possível carregar as informações do candidato')
        }

        const initListar = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        await api
            .get(`Vagas/buscar/vaga/${vagaId}`, initListar)
            .then(resp => {
                setNomeEmpresa(resp.data.nomeEmpresa);
                setExperiencia(resp.data.tipoExperiencia.descricao);
                setCargo(resp.data.cargo);
                setFaixaSalarial(resp.data.faixaSalarial.descricao);
                setNomeMunicipio(resp.data.municipio.descricao);
                setUfSigla(resp.data.municipio.ufSigla);
                setDataEncerramento(new Date(resp.data.dataEncerramento).toLocaleDateString('pt-BR', { timeZone: 'UTC' }));
                setAreaVagaRecomendadas(resp.data.areaVagaRecomendadas);
            })
            .catch(error => {
                if (error.response) {
                    return alert(error.response.data)
                }
            })
    }

    const Botoes = (vagaId: number) => {
        if (vagaAtiva) {
            return (
                <View>
                    <View style={styles.botoes}>
                        <TouchableOpacity style={styles.btnAzul} onPress={event => {
                            event.preventDefault();
                            VerMais(vagaId);
                        }}><Text>Ver Mais</Text></TouchableOpacity>
                    </View>
                </View>
            )
        }
    }


    return(
        <View style={styles.cardTeste}>
            <View style={styles.titulo}>
                <Text style={styles.nomeVaga}>{nomeVaga}</Text>

                <View style={styles.sectionVaga}>
                {
                    vagaAtiva ? <Text style={styles.vagaAtiva}>Vaga Ativa</Text> : <Text style={styles.vagaEncerrada}>Vaga Encerrada</Text>
                }
                </View>

            </View>

                <View style={styles.textos}>
                    <Text>{descricao.length > 300 ? descricao.substring(0, 300) + " [...]" : descricao}</Text>
                </View>

                {
                    Botoes(vagaId)
                }

        </View>
    )
}

const styles = StyleSheet.create({
    botoes : {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginHorizontal : 3,
        marginBottom: 2,
    },
    
    btnAzul : {
        backgroundColor: '#ffffff',
        color: '#016799',
        borderColor: '#016799',
    },

    btnVermelho : {

    },

    textVermais:{

    },

    cardTeste : {
        marginTop: 3,
        width: 45,
        minHeight: 100,
        borderRadius: 10,
        marginHorizontal: 5
    },

    titulo : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 3,
        marginTop: 2
        
    },

    nomeVaga : {
        color: '#303030',
    },

    sectionVaga :{

    },

    vagaAtiva : {
        color: '#016799',
        marginLeft: 0
    },

    vagaEncerrada : {
        color: '#df0003',
        marginLeft: 0
    },

    textos : {
        display: 'flex',
        textAlign: 'justify',
        marginHorizontal: 3,
        color: '#606060',
    },
})

export default cardCandidatoHome;