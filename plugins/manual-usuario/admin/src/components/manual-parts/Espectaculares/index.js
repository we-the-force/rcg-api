import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class EspectacularesPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="espectacular-block" name="espectacular-block">
                <Block title="Espectaculares" className="Espectaculares-Block">
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Espectaculars" en "COLLECTION TYPES"</li>
                        <li>En la nueva ventana, seleccionas "+ Add New Espectacular"</li>
                        <li>
                            En la seccion de en medio agregas:
                            <ul>
                                <li>
                                    <b>Zona</b><br/>
                                    <p className="step-element">La zona donde se encuentra el espectacular</p>
                                </li>
                                <li>
                                    <b>ID del espectacular</b><br/>
                                    <p className="step-element">Un identificador para el espectacular<br/><b>*Debe ser unico</b></p>
                                </li>
                                <li>
                                    <b>Cara1</b><br/>
                                    <p className="step-element">Una imagen de la cara 1 actual del espectacular</p>
                                </li>
                                <li>
                                    <b>Cara2</b><br/>
                                    <p className="step-element">Una imagen de la cara 2 actual del espectacular</p>
                                </li>
                                <li>
                                    <b>Lugar</b><br/>
                                    <p className="step-element">Direccion de donde se encuentra el espectacular</p>
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

export default EspectacularesPanel;