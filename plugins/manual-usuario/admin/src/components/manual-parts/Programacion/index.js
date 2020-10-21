import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class ProgramacionPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="programacion-block" name="programacion-block">
                <Block title="Programacion" className="Programacion-Block">
                    <h2><b className="requirement-title">Requerimientos</b></h2>
                    <Scroll type="id" element="canal-estacion-block" offset={-85}>
                        <a className="requirement-element">Canales/Estaciones</a>
                    </Scroll>
                    <Scroll type="id" element="programas-block" offset={-85}>
                        <a className="requirement-element">Programas</a>
                    </Scroll>
                    <br/>
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Programacion Radio-TV" en "PLUGINS"</li>
                        <li>Seleccionas uno de tus canales o estaciones creados previamente</li>
                        <li>Presionas el boton "Agregar Horario"</li>
                        <li>
                            Agregas Programas:
                            <ul>
                                <li>Presionas el boton de "+" o das doble click sobre una celda</li>
                                <li>
                                    Para agregar un programa:<br/>
                                    <ul>
                                        <li>Seleccionas el programa, creado previamente</li>
                                        <li>Seleccionas la hora de inicio y la hora de final</li>
                                    </ul>
                                </li>
                                <li>Una vez creado, puede arrastrar la parte superior o inferior de los programas para cambiar su duracion</li>
                                <li>Repite hasta terminar</li>
                            </ul>
                        </li>
                        <li>Presionas "Guardar Programacion"</li>
                    </ol>
                </Block>
            </div>
        );
    }
}

export default ProgramacionPanel;