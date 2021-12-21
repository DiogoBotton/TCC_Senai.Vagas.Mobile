import React, { useState, useEffect, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Auth Context
import AuthContext from './context/auth';

//Pages
import Login from '../src/screens/login/Login';
import Nova_Senha from '../src/screens/Nova_Senha';
import MeuPerfil from '../src/screens/MeuPefil';
import HomeCandidato from '../src/screens/HomeCandidato';
import MinhasInscricoesCandidato from '../src/screens/MinhasInscricoesCandidato';

import MinhaEmpresa from '../src/screens/MinhaEmpresa';
import CadastrarVaga from '../src/screens/CadastrarVaga';
import HomeEmpresa from '../src/screens/VagasAnunciadasEmpresa';

import DashboardAdmin from '../src/screens/DashboardAdmin';
import CadastrarAdmin from '../src/screens/CadastrarAdmin';
import CandidatosAdmin from '../src/screens/CandidatosAdmin';
//pagina nao encontrada
import NotFound from '../src/screens/NotFound';

import { ActivityIndicator, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

function Routes() {

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  // Adquirindo propriedades do authContext
  const { logged, IsAdmin, IsCandidato, IsEmpresa , Logout} = useContext(AuthContext);


  


  // Stack de UserNotAuthenticated (telas de usuário que não está autenticado)
  const UserNotAuthenticated = () => {
    return (
      <Tab.Navigator >
        <Tab.Screen
          name="Login"
          component={Login}
        />

        <Tab.Screen
          name="Nova Senha"
          component={Nova_Senha}
        />

      </Tab.Navigator>
    );
  }

  const Admin = () => {
    return (
      <Drawer.Navigator initialRouteName="Home Admin">
        <Drawer.Screen
          name="Dashboard Admin"
          component={DashboardAdmin}
        />
        <Drawer.Screen
          name="Cadastrar Admin"
          component={CadastrarAdmin}
        />
        <Drawer.Screen
          name="Candidatos Admin"
          component={CandidatosAdmin}
        />
      </Drawer.Navigator>
    );
  }

  const Candidato = () => {
    return (
      <Drawer.Navigator initialRouteName="Minhas Inscricoes">

        <Drawer.Screen
          name="Meu Perfil"
          component={MeuPerfil}
        />
        <Drawer.Screen
          name="Home Candidato"
          component={HomeCandidato}
        />
        <Drawer.Screen
          name="Minhas Inscricoes"
          component={MinhasInscricoesCandidato}
        />
      
      </Drawer.Navigator>
      
    );
  }

  const Empresa = () => {
    return (
      <Drawer.Navigator initialRouteName="Home Empresa">

        <Drawer.Screen
          name="Minha Empresa"
          component={MinhaEmpresa}
        />

        <Drawer.Screen
          name="Home Empresa"
          component={HomeEmpresa}
        />

        <Drawer.Screen
          name="Cadastrar Vaga"
          component={CadastrarVaga}
        />

      </Drawer.Navigator>
    )
  }

  return (

    <Stack.Navigator>

      {
        logged ? IsAdmin ?
          (<Stack.Screen name="Admin" component={Admin}
          />) :

          IsCandidato ?
            (<Stack.Screen
              name="Candidato" component={Candidato}
            />) :

            (<Stack.Screen
              name="Empresa" component={Empresa}
            />) :

          (< Stack.Screen
            name="Login" component={UserNotAuthenticated}
          />)
      }

    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  
})
export default Routes;