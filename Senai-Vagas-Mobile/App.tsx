import React from 'react';
import {View, StyleSheet} from 'react-native';

import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

//importacoes para decodificar o codigo
import { decode, encode } from 'base-64';


// Container que englobará todas os tipos de navegação
import { NavigationContainer } from '@react-navigation/native';

// Auth Context
import { AuthProvider } from './src/context/auth';

import Login from './src/screens/login/Login';

//Routes
import Routes from './src/routes';


// Importação global de atob para decodificar token
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;



