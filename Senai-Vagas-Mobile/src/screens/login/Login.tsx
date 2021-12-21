import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import { StyleSheet, Text, View , Image, TextInput , TouchableOpacity, Alert, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import AuthContext from '../../context/auth';
import LoginProps from '../../interfaces/login';

const getFonts = () => Font.loadAsync({
  'sansation-regular': require('../../assets/fonts/Sansation_Regular.ttf')
});

export default function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const { Login } = useContext(AuthContext);
    
    const login = async () => {
        const form: LoginProps = {
            email: email,
            senha: senha,
        };

        if (form.email.length === 0 || form.senha.length === 0) {
            return Alert.alert('Preencha os campos de email e senha corretamente.');
        }

        // Função do context que irá fazer a autenticação e retornar erro (na própria função) caso precise
        Login(form);
  };
  const [fontsLoaded, setFontsLoaded] = useState(false);


    if (fontsLoaded) {
      return (
        <View style={styles.container}>
       <View>
       <Image 
         style={styles.logo}
         source={require('../../assets/images/LogoAppVermelho.png')}
         />
       </View>
        
        <Text style={styles.tlogin}>Faça seu login</Text>
        
        <Text style={styles.ti}>Email</Text>
         <TextInput
         style={styles.input}
         placeholder=""
         onChangeText={(e: any) => setEmail(e)}
         />
  
         <Text style={styles.ti}>Senha</Text>
         <TextInput
         style={styles.input}
         secureTextEntry={true}
         placeholder=""
         onChangeText={(e: any) => setSenha(e)}
         />
   
         <TouchableOpacity  onPress={event => {
                        event.preventDefault();
                        login();
                    }} style={styles.button}>
           <Text style={styles.textoB}>
             Login
           </Text>
         </TouchableOpacity>
   
         <TouchableOpacity onPress={ ()=>{ Linking.openURL('http://senai-vagas.herokuapp.com/')}} style={styles.buttonES}>
           <Text style={styles.textoB}>
             Esqueci minha senha
           </Text>
         </TouchableOpacity>
   
         <TouchableOpacity onPress={ ()=>{ Linking.openURL('http://senai-vagas.herokuapp.com/')}} style={styles.buttonc}>
           <Text style={styles.textoBc}>
             cadastrar como candidato
           </Text>
         </TouchableOpacity>
   
         <TouchableOpacity onPress={ ()=>{ Linking.openURL('http://senai-vagas.herokuapp.com/')}} style={styles.buttonc}>
           <Text style={styles.textoBc}>
             cadastrar como empresa
           </Text>
         </TouchableOpacity>
   
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
      alignItems: 'center',
      justifyContent: 'center',
      height: 860,
      
    },
    
    logo: {
      width:220,
      height: 60,
    },
  
    input: {
      backgroundColor: '#FFFFFF',
      margin: 10,
      borderRadius: 15,
      width: 200,
      height:35,
      //shadowOffset:{  width: 2,  height: 2,  },
      //shadowColor: 'black',
      //shadowOpacity: 0.3,
      borderColor: "black",
      borderWidth: 0.2,
    },
  
    button: {
      backgroundColor: '#D20003',
      margin: 10,
      borderRadius: 15,
      width: 200,
      height:35,
      textAlign: "center",
      justifyContent: 'center',
      
    },
  
    buttonES: {
      backgroundColor: '#016799',
      margin: 10,
      borderRadius: 15,
      width: 200,
      height:35,
      textAlign: "center",
      justifyContent: 'center',
  
    },
  
    buttonc: {
      backgroundColor: '#ffff',
      margin: 10,
      borderRadius: 15,
      width: 150,
      height:35,
      textAlign: "center",
      justifyContent: 'center',
      shadowOffset:{  width: 2,  height: 2,  },
      shadowColor: 'black',
      shadowOpacity: 0.3,
      fontSize: 12
      
  
    },
  
    tlogin: {
      textDecorationColor: '#505050',
      fontFamily: 'sansation-regular',
      //marginTop: 20,
      padding :30,
    },
  
    ti:{
      marginRight: 150,
      textDecorationColor: '#505050',
      fontFamily: 'sansation-regular'
    },
  
    textoBc: {
      color: '#016799',
      fontFamily: 'sansation-regular',
      textAlign: "center",
      justifyContent: 'center',
    },
    textoB:{
      fontFamily: 'sansation-regular',
      color:'#E0E0E0',
      textAlign: "center",
      justifyContent: 'center',
    }
  });
  
