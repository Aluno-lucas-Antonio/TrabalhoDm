import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import ContatoServico from '../servico/contato_servico'
import Icon from 'react-native-vector-icons/Ionicons'
import { Contato } from '../modelo/Contato'


// métodos da home

export default class App extends React.Component {
  
constructor(props) {
    super(props);
    this.findAllContato() 
    }
    
    state = {
    contato:Contato,
    lista_array_dados_contato: [],
    value: null, 
    Id_pesquisar:null, 
    onChangeText: null,
    formularioId: null,
    formularioNome:null,
    formularioValor:null,
    formularioCategoria:null,
    formularioGraficos:null,
    formularioNota:null
    }
    
    //acionado quando o componente e montado
    componentDidMount () {
    this.instanciarContato();
    this.findAllContato ();
    }
    
    //escuta atualizações na lista
    componentDidUpdate (prevProps, prevState) {
    if (prevState.lista_array_dados_contato !== this.state.lista_array_dados_contato) {
    this.findAllContato ();
    }
    }

    findAllContato=()=> {
        ContatoServico.findAll()
        .then((response: any) => {
        this.setState({
        lista_array_dados_contato: response._array,
        isLoading: false,
        })
        }), (error) => {
        console.log(error);
        }
        }


    deleteContato=(id)=> {
    this.findContatoById(id)
    if (this.state.formularioId != null || this.state.formularioId != undefined) {
        ContatoServico.deleteById(id)
    Alert.alert("contato excluido com sucesso: ")
    }
    }
    
    atualizaContato=(item0, item1, item2, item3, item4, item5)=> {
    let contato=new Contato()// cria objeto memória
    contato.id=item0 // seta o atributo nome do objeto
    contato.nome=item1 // seta o atributo nome do objeto 
    contato.valor=item2 // seta o atributo nome do objeto 
    contato.categoria=item3 // seta o atributo nome do objeto
    contato.graficos=item4 // seta o atributo nome do objeto 
    contato.nota=item5 // seta o atributo nome do objeto 
    // com o valor(state) do item
    
    ContatoServico.updateByObjeto(contato).then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    // popular o objeto da memória
    Alert.alert("Atualizado"); 
    
    } else {
    Alert.alert("Nome não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    
    insertContato=(item1, item2, item3, item4, item5)=> {
    let contato=new Contato()// cria objeto memória
    contato.nome=item1 // seta o atributo nome do objeto 
    contato.valor=item2 // seta o atributo nome do objeto 
    contato.categoria=item3 // seta o atributo nome do objeto
    contato.graficos=item4 // seta o atributo nome do objeto 
    contato.nota=item5 // seta o atributo nome do objeto  
    // com o valor(state) do item
    
    // cria um id no banco para persistir o objeto
    const insertId=ContatoServico.addData(contato);
    // testa pra ver se deu certo a criação do id
    if(insertId==null || insertId==undefined){
    Alert.alert("Não foi possivel inserir o novo contato")
    }
    return contato
    }
    
    instanciarContato=()=>{
    let contato:Contato=new Contato()// cria objeto memória
    return contato
    }
    
    
    
    findContatoById=(id)=> {
    ContatoServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    } else {
    Alert.alert("id não encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }
    
    localizaContato=(id)=> { 
    ContatoServico.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    let contatopesquisa:Contato=new Contato()// cria objeto memória
    const contatoretorno=response._array.map((item,key)=>{
    contatopesquisa.id=item.id;
    contatopesquisa.nome=item.nome;
    contatopesquisa.valor=item.valor;
    contatopesquisa.categoria=item.categoria;
    contatopesquisa.graficos=item.graficos;
    contatopesquisa.nota=item.nota;
    })
    // o SetState abaixo mostra para o usuário o objeto recuperado do banco
    // e atualmente somente em memória 

    this.setState({
    contato:contatopesquisa,
    formularioId: contatopesquisa.id,
    formularioNome:contatopesquisa.nome,
    formularioValor:contatopesquisa.valor,
    formularioCategoria:contatopesquisa.categoria,
    formularioGraficos:contatopesquisa.graficos,
    formularioNota:contatopesquisa.nota,
    })
    // popular o objeto da memória
    //Alert.alert("Atualizado"); 
        } else {
    Alert.alert("jogo nao encontrado")
    }
    }), (error) => {
    console.log(error);
    }
    }


    // fim da parte de funções
    // agora é necessário passar os parametros para a visão através de renderização
    


    // aqui temos a renderização da tela (visão)
    render() {

        //extrai as propriedades entre chaves
        const {contato,lista_array_dados_contato,value,Id_pesquisar,formularioId,formularioNome,formularioValor, formularioCategoria, formularioGraficos, formularioNota} = this.state;
        // se tivermos animais listados oriundos do banco
        // a lista é mostrada na visão
        //const {animal}=animal;
        
        const contatoList = lista_array_dados_contato.map((item, key) => {
            return (
                <> 
                    <Text >id:{item.id} nome:{item.nome} valor:{item.valor} categoria:{item.categoria} graficos:{item.graficos} nota:{item.nota}</Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                <Text style={{ fontSize: 20, paddingBottom: 20 }}>Crud de jogos</Text>

                <TextInput
                    placeholder="digite o id do jogo"
                    style={styles.textInput}
                    onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                    value={Id_pesquisar}
                />

                <Text>{formularioId}</Text>
                    
              
                <TextInput
                    placeholder="digite o nome do novo jogo"
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioNome => { this.setState({ formularioNome: formularioNome }) }}
                    value={formularioNome}
                />

                <TextInput
                    placeholder="digite o custo desse jogo"
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioValor => { this.setState({ formularioValor: formularioValor }) }}
                    value={formularioValor}
                    
                />

                <TextInput
                    placeholder="digite a categoria do jogo "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioCategoria => { this.setState({ formularioCategoria: formularioCategoria }) }}
                    value={formularioCategoria}
                    
                />

                <TextInput
                    placeholder="digite o tipo de grafico do jogo "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioGraficos => { this.setState({ formularioGraficos: formularioGraficos }) }}
                    value={formularioGraficos}
                    
                />

                <TextInput
                    placeholder="digite a sua nota para o jogo "
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioNota => { this.setState({ formularioNota: formularioNota }) }}
                    value={formularioNota}
                    
                />
               
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioNome == null  ? Alert.alert("O campo de nome não pode ser vazio") :this.insertContato(formularioNome, formularioValor, formularioCategoria, formularioGraficos, formularioNota)}} style={{ alignItems: "center", backgroundColor: 'black' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  {formularioId == null  ? Alert.alert("Não tem Objeto para atualizar faça uma pesquisa") :this.atualizaContato(formularioId, formularioNome, formularioValor, formularioCategoria, formularioGraficos, formularioNota)}} style={{ alignItems: "center", backgroundColor: 'black' }}>
                        <Icon name="md-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("O campo de id não pode ser vazio") : this.localizaContato(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'black' }}>
                        <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("O campo de id não pode ser vazio") : this.deleteContato(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'black' }}>
                        <Icon  name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {contatoList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput:{
        alignItems: "center", 
        width: 200, 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 
    },
    containerTouch:{
        width: 200,
         padding: 10
    }
});