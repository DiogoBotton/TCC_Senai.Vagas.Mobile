import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Card from '../components/cardCandidato'
import AuthContext from '../context/auth';

// Interfaces
import token from '../interfaces/token';

// Token Decoder
import jwt from '../services/tokenDecoder';

const MinhaEmpresa = () => {
    const { GetTokenUser } = useContext(AuthContext)

    let tokenDecoded: token;

    GetTokenUser().then(token => {
        tokenDecoded = token !== null ? jwt(token) : null;
    })
    return (
        <View>
            <View>
                <Image style={styles.vagas} source={require('../assets/images/IconVagas.png')} />
                <Text style={styles.vagasTitle}>Vagas Anunciadas</Text>
            </View>
            <View>
                {/* <Card vagaAtiva={true} nomeVaga="teste" descricao="teste" recebeuConvite={true} vagaId={1} /> */}
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
    }

})

export default MinhaEmpresa;