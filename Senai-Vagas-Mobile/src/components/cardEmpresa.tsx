import React, { useState } from 'react';
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

const CardEmpresa: React.FC<CardProps> = ({ nomeVaga, descricao, vagaAtiva, vagaId }) => {
    // Dados padrões
    const [experiencias, setExperiencias] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [faixasSalariais, setFaixasSalariais] = useState([]);
    const [areas, setAreas] = useState([]);

    // usado para funcionar em conjunto com o filtro de municípios
    const [listMunicipios, setListMunicipios] = useState([]);

    // Apenas é necessário o ID para vincular vaga com os dados abaixo
    const [idExperiencia, setIdExperiencia] = useState('');
    const [idMunicipio, setIdMunicipio] = useState('');
    const [idFaixaSalarial, setIdFaixaSalarial] = useState('');

    // Dados restantes
    const [nomeDaVaga, setNomeVaga] = useState('');
    const [dataEncerramento, setDataEncerramento] = useState('');
    const [cargo, setCargo] = useState('');
    const [descricaoVaga, setDescricaoVaga] = useState('');

    // Para funcionar o convite de entrevista
    const [usuarioCandidatoAlunoId, setUsuarioCandidatoId] = useState('');
    const [ruaConvite, setRuaConvite] = useState('');
    const [bairroConvite, setBairroConvite] = useState('');
    const [numeroConvite, setNumeroConvite] = useState('');
    const [infoComplementarConvite, setInfoComplementarConvite] = useState('');
    const [dataHoraEntrevistaConvite, setDataHoraEntrevistaConvite] = useState('');
    const [idMunicipioConvite, setIdMunicipioConvite] = useState('');

    // Para puxar coisas do ver perfil
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [curso, setCurso] = useState('');
    const [rma, setRma] = useState('');
    const [sobreOCandidato, setSobreOCandidato] = useState('');
    const [linkExterno, setLinkExterno] = useState('');
    const [sexo, setSexo] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [dataMatricula, setDataMatricula] = useState('');
    const [termo, setTermo] = useState('');


    // Reativar Vaga
    const [novaDataEncerramento, setNovaDataEncerramento] = useState('');

    // filtro para municipios
    const [filter, setFilter] = useState('');

    const [reloading, setReloading] = useState(false);

    // Lista com todas as áreas recomendadas que o usuário marcou (será preenchida quando o formulário for submetido)
    let areasRecomendadas: any = [];

    const [isLoading, setIsLoading] = useState(false);

    const [Inscricoes, setInscricoes] = useState([]);

    return(
        <View style={styles.card}>

            <View style={styles.titulo}>
                    <Text style={styles.nomeVaga}>{nomeVaga}</Text>

                    <View style={styles.sectionVaga}>
                        {
                            vagaAtiva ? <Text style={styles.vagaAtiva}>Vaga Ativa</Text> : <Text style={styles.vagaEncerrada}>Vaga Encerrada</Text>
                        }
                    </View>
            </View>

            <View style={styles.textos}>
                <Text style={styles.descricao}>{descricao.length > 300 ? descricao.substring(0, 300) + " [...]" : descricao}</Text>
            </View>

            {/* {
                Botoes(vagaId)
            } */}

        </View>
    )

}

const styles = StyleSheet.create({
    botoes: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginHorizontal: 3,
        marginBottom: 2,
    },

    btnAzul: {
        backgroundColor: '#ffffff',
        color: '#016799',
        borderColor: '#016799',
    },

    btnVermelho: {

    },

    textVermais: {

    },

    card: {
        display: 'flex',
        justifyContent: 'center',

        margin: 10,

        shadowOffset:{  width: 2,  height: 2,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },

    titulo: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10
    },

    nomeVaga: {
        color: '#303030',
        marginRight:10,
        fontFamily: 'sansation-regular',
        fontSize:25
    },

    sectionVaga: {

    },

    vagaAtiva: {
        color: '#016799',
        marginLeft: 0
    },

    vagaEncerrada: {
        color: '#df0003',
        marginLeft: 0
    },

    textos: {
        marginVertical: 12,
        marginHorizontal: 15,
        color: '#606060',
    },

    descricao: {
        fontSize: 12
    }
})
export default CardEmpresa;