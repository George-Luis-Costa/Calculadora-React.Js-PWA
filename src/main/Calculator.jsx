import React, { Component } from "react" //importando 'Component' para classe
import './Calculator.css' //importando o css

import Button from '../components/Button'
import Display from '../components/Display'


//objeto
const initialState = {
    displayValue: '0',     // valor a ser exibido no display
    clearDisplay: false,    // Uma propriedade pra dizer se precisa ou nao limpar o display
    operation: null,        // Armazenar as operaçoes
    values: [0, 0],          // Array com 2 valores para armazenar as informaçoes a serem operadas
    current: 0              // Escolher o indice do array ( 0 ou 1)
}


//Usando uma classe por aqui porque usaremos states no componentes. OBS: Devemos evitar colocar states em varios componentes,
// focando esse controle em poucos componentes para o gerenciamento ser mais simples.
export default class Calculator extends Component {

    state = { ...initialState }

    //Referenciando o this correto pelo metodo bind(), poderia ser feito com arrow function como exemplo anterior no material
    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    //3 açoes que a calculadora pode fazer, sao elas: limpar memoria, definir operaçao e adicionar o digito. 
    //Ao acionar o evento "click", ele envia para a funcao corresponde ativada o input.
    clearMemory() {
        this.setState({ ...initialState }) //altera o estado
    }

   //Nessa funçao só entra operaçoes
   setOperation(operation) { 
    // Uma OBS: Ao setar operacao devemos manipular o array "values" no indice 1,
    // pois o indice 0 ja terá algo inserido -> values: [0, 0]
    
    if (this.state.current === 0) {  //verificando se o indice está no 0 
        this.setState({ operation, current: 1, clearDisplay: true }) // Passa o operation , seta o current para 1 e limpa o display

    } else { //caso o current seja 1, ou seja, o indice 0 do 'values: [0, 0]'
        const equals = operation === '='
        const currentOperation = this.state.operation // input-operacao-input,
                    // armazena-se isso em currentOperation. ao invez de =, o user usa outro operador como +,-,*,/

        const values = [...this.state.values]  // fazendo uma clonagem e recebendo em "values"
        try { // tentar execuçao

            //A função eval() computa um código JavaScript representado como uma string.
            //Uso de template String -> ` ${ } ` // Envolvido por acentos graves que é prenchido por strings e o ${ },
                          // significa interpolacao de expressoes JS
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) // Estou manipulando os valores
                            // dos 2 indices (0,1) e fazendo a operacao entre eles,
                            // depois guarda-se tudo isso no indice 0, para desocupar o indice 1

            if (isNaN(values[0]) || !isFinite(values[0])) { // Reseta caso resulte em NaN.
                this.clearMemory()
                return
            }

        } catch (e) { //Caso dê um erro, tratar dessa forma
            values[0] = this.state.values[0] //Retorno para o valor que estava antes do try{}
        }

        values[1] = 0 // Desocupando o indice 1
 

        if ((values[0] % 2) != 0) { // se resto for = 0 
            values[0] = values[0].toPrecision(8) // toPrecision() para limitar o comprimento total
        }

        this.setState({
            displayValue: values[0], // resultado da operacao, que esta no indice 0, passa para o display
            operation: equals ? null : operation, // Se for equals null, se for outra operacao passe "operation"
            current: equals ? 0 : 1, //Condicao para manipular o indice 0 ou 1, depende do que foi digitado
            clearDisplay: !equals, // Diferente de equals limpa o display
            values // Valores para serem substituidos no state
        })
    }

}

    // Nessa funcao só entra numeros e ponto
    addDigit(n) {
        // //Evitar operaçoes quando o user digitar mais de 1 ponto no display.

        // // (Se receber o digito que é um ponto) && (ja ter no display um ponto),
				// logo nao posso aceitar esse cenario, entao, inserimos um retorno vazio
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        // // Limpar os display em 2 situacoes 
        // // Quando o display só contem o numero 0, com isso é limpado para add um novo digito
        // // Ou quando a variavel clearDisplay estiver true
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        const currentValue = clearDisplay ? ' ' : this.state.displayValue  // Condiçao, depende se o display vai ser limpo ou nao.
				// Se for limpo recebe " "(vazio), caso contrario recebe "this.state.displayValue" valor atual que está no display
        
				const displayValue = currentValue + n // Recebe currentValue + n, em que n é o valor digitado
        this.setState({ displayValue, clearDisplay: false }) // passando para o State o "displayValue" e o " clearDisplay: false",
				// pois foi digitado algo, entao por isso "false"

        // // Se for digitado qualquer valor diferente de "."
        if (n !== '.') {
            //indices:  0,1
            const i = this.state.current  // Estou mexendo no indice do array  values: [0,0] 
            const newValue = parseFloat(displayValue)  // convertendo para um FLoat e armazenando em newValue
            const values = [...this.state.values]      //clonando o array values
            values[i] = newValue       //Atribui o valor de "newValue" no indice 0 ou 1
            this.setState({ values }) // Substitui o valor do array "values" dentro de State
            console.log(values)       //ver o que está acontecendo no console do browser
        }
    }

    render() {

        return (
            <div className="calculator">

                {/* Display para exibir */}
                <Display value={this.state.displayValue} />
                {/* Agora referencia o displayValue do State  */}

                {/* Inserindo os botoes da calculadora e estilo*/}
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div >
        )
    }
}