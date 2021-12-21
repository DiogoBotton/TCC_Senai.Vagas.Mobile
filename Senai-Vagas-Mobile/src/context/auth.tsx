import React, { createContext, useState, useEffect } from 'react';

// AsyncStorage ("localStorage" do react native)
import AsyncStorage from '@react-native-async-storage/async-storage';

// Token Decoder Service
import jwt from '../services/tokenDecoder';

//importacao da api
import api from '../services/api';

// Interfaces
import LoginProps from '../interfaces/login';

// Outras bibliotecas
import { Alert } from 'react-native';

import tokenProps from '../interfaces/token'

interface AuthContextData {
    logged: boolean,
    IsCandidato: boolean,
    IsEmpresa: boolean,
    IsAdmin: boolean,
    IsLoading: boolean,
    tokenDecoded: tokenProps | null,
    Login(form: LoginProps): Promise<void>,
    Logout(): Promise<void>,
    GetTokenUser(): Promise<string | null>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Exportando AuthProvider para se rusado no routes
export const AuthProvider: React.FC = ({ children }: any) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isCandidato, setIsCandidato] = useState(false);
    const [isEmpresa, setIsEmpresa] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [tokenDecoded, setTokenDecoded] = useState<tokenProps | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Logged();
    }, []);

    // Função assíncrona para adquirir atributo que esta guardado no "AsyncStorage"
    const Logged = async () => {
        const response = await AsyncStorage.getItem('token-usuario');
        userLogged(response);
    }

    const GetTokenUser = async () => {
        const response = await AsyncStorage.getItem('token-usuario');
        return response;
    }

    const userLogged = async (response: any) => {

        // Muda o estado de 'isLogged' caso usuário esteja ou não autenticado
        if (!response) {
            setIsLogged(false)
            setIsAdmin(false)
            setIsCandidato(false)
            setIsEmpresa(false)
            setIsLoading(false)
            setTokenDecoded(null)
        }
        else {
            setIsLogged(true)

            // Token Decoder
            let tokenDecoded = jwt(response);

            // Muda o estado dos tipos de usuario
            if (tokenDecoded.role === "1") {
                (setIsAdmin(false), setIsCandidato(true), setIsEmpresa(false));
            }

            else if (tokenDecoded.role === "2") {
                (setIsAdmin(false), setIsCandidato(false), setIsEmpresa(true));
            }

            else if (tokenDecoded.role === "3") {
                (setIsAdmin(true), setIsCandidato(false), setIsEmpresa(false));
            }
            //console.log(tokenDecoded)
            setTokenDecoded(tokenDecoded)
        }
    }


    const Login = async (form: LoginProps) => {
        const init = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        };

        // Se você estiver executando o servidor e o emulador em seu computador, 127.0.0.1:(port) fará referência ao emulador em si e não ao servidor.
        // O 10.0.2.2 é a solução para esse problema 
        // (atualmente utilizando o IP da maquina para aplicação mobile com EXPO)
        await fetch('http://wolfrosfay4-001-site1.btempurl.com/api/Login', init)
            .then(resp => resp.json())
            .then(data => {
                // Verifica se a propriedade token é diferente de indefinida (se a propriedade existe no retorno do json)
                if (data.token !== undefined) {
                    AsyncStorage.setItem('token-usuario', data.token);
                    userLogged(data.token);

                    console.log(data)
                    
                }
                else {
                    // Erro caso email ou senha sejam inválidos
                    setIsLogged(false);
                    setIsAdmin(false);
                    setIsCandidato(false);
                    setIsEmpresa(false);

                    // Retorna para a tela de Login o erro do backend
                    Alert.alert(data);
                }
            })
            .catch(error => {
                console.log('ERROR em logar: ' + error.message);
            });
    }

    const Logout = async () => {
        await AsyncStorage.clear()
            .then(() => {
                setIsLogged(false);
                setIsAdmin(false);
                setIsCandidato(false);
                setIsEmpresa(false);
                setTokenDecoded(null);
            })
    }

    return (
        <AuthContext.Provider value={{ logged: isLogged, IsAdmin: isAdmin, IsCandidato: isCandidato, IsEmpresa: isEmpresa, IsLoading: isLoading, tokenDecoded: tokenDecoded, Login, Logout, GetTokenUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;