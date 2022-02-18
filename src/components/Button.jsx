import React from "react"
import './Button.css'

export default function Button(props) {
    // "classes" será usada para estilizar
    //Exibicao condicional de classes

    let classes = 'button '  // Espaço no final para concatenar com as outras strings, como 'button' sempre vai ser definido na String.
     // Aqui há condiçoes: se a props estiver definida (true), coloca-se a classe "operation", caso contrario " " (vazio).
		 // Esse vazio vai servir para concatenar as 3 props(caso ative as 3) em strings
		
		classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return (
        <button
                        // para garantir
            onClick={e => props.click && props.click(props.label)} // Para testar, ao clicar no botton, mostrar o conteudo de cada botao no console
            className={classes}>   {/*Passando as classes para se estilizar  */}
            {props.label}
        </button>
    )
}