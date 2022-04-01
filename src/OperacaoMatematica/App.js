import  * as React from 'react';
import{Text, TouchableOpacity,TextInput, View, StyleSheet, StatusBar} from 'react-native'
import estilo from './estilo';
export default class App extends React.Component{
  state={
    Valor1:0.0,
    valor2:0.0,
    resultado:0.0
  }
  atualizaValor1=(number)=>{
    this.setState({valor1:number})
  }
  atualizaValor2=(number)=>{
    this.setState({valor2:number})
  }
  soma(){
    this.state.resultado=parseFloat(this.state.Valor1)+
    parseFloat(this.state.valor2);
    alert(this.state.resultado);
    
  }
  subtratacao(){
    this.state.resultado=parseFloat(this.state.Valor1)-
    parseFloat(this.state.valor2);
    alert(this.state.resultado);
  }
  multiplicacao(){
    this.state.resultado=parseFloat(this.state.Valor1)*
    parseFloat(this.state.valor2);
    alert(this.state.resultado);
  }
  divisao(){
    this.state.resultado=parseFloat(this.state.Valor1)/
    parseFloat(this.state.valor2);
    alert(this.state.resultado);
  }

  render(){
    return(
      <View style={estilo.container}>
      <StatusBar backgroundColor="black"/>
      <TextInput underlineColorAndroid="transparent"
      placeholder="Digite o valor 1"
      placeholderTextColor="black"
      autoCapitalize="nome"
      onChangeText={this.atualizaValor1}
     keyboardType='numeric'/>
     <StatusBar backgroundColor="black"/>
   
     <TextInput underlineColorAndroid="transparent"
     placeholder="Digite o valor 2"
     placeholderTextColor="black"
     autoCapitalize="nome"
     onChangeText={this.atualizaValor2}
    keyboardType='numeric'/>

      </View>
    );
    

      }
}