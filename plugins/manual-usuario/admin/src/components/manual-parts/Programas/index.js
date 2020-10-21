import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class ProgramasPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="programas-block" name="programas-block">
                <Block title="Programas" className="Programas-Block">
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Programas" en "COLLECTION TYPES"</li>
                        <li>En la nueva ventana, seleccionas "+ Add New Programa"</li>
                        <li>
                            En la seccion de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre del programa</b><br/>
                                    <p className="step-element">El nombre del programa</p>
                                </li>
                                <li>
                                    <b>Descripcion del programa</b><br/>
                                    <p className="step-element">La descripcion del programa</p>
                                </li>
                            </ul>
                        </li>
                        <li>Presionas "Save"</li>
                    </ol>
                </Block>
            </div>
        );
    }
}

export default ProgramasPanel;