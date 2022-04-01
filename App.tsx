import * as React from 'react';
import { StyleSheet,Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Home from './src/home/home_page';
import DatabaseInit from './src/bancodedados/inicializacao';
import FlatListScreem  from './src/FlatList/App';
import SpeechScreem from './src/Speech/App';
import OperacaoMatematica from './src/OperacaoMatematica/App';

export default class App extends React.Component {

    constructor(props) {
    super(props);
    new DatabaseInit
    console.log("initialize database")
  }

  render() {

      return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Crud" component={HomeScreen} />
            <Tab.Screen name="Speech" component={SpeechScreem} />
            <Tab.Screen name="FlatList" component={FlatListScreem} />
            <Tab.Screen name="peracaoMatematica" component={OperacaoMatematica} />
            
          </Tab.Navigator>
        </NavigationContainer>
      );
  }

}


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Home />
    </View>
  );
}
function FlatlistScreem() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>FlatList!</Text>
    </View>
  );
}
function speechScreem() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>speechScreem!</Text>
    </View>
  );
}
function peracaoMatematica() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>OperacaoMatematica!</Text>
    </View>
  );
}


const Tab = createMaterialBottomTabNavigator();




// jogar fora
export function APP() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Speech" component={SpeechScreem} />
        <Tab.Screen name="FlatList" component={FlatListScreem} />
        <Tab.Screen name="peracaoMatematica" component={OperacaoMatematica} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}