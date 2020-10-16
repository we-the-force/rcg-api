import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class InfoEspecPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="info-espec-block" name="info-espec-block">
                <Block title="Informacion de Espectaculares" className="Info-Espec-Block">
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Espectacular info" en "SINGLE TYPES"</li>
                        <li>
                            En la seccion de en medio agregas:
                            <ul>
                                <li>
                                    <b>Porque_nosotros</b><br/>
                                    <p className="step-element">Texto mostrado en la parte de "Por que nosotros"</p>
                                </li>
                                <li>
                                    <b>Nosotros</b><br/>
                                    <p className="step-element">Texto mostrado en la parte de "Nosotros"</p>
                                </li>
                                <li>
                                    <b>NosotrosImagen</b><br/>
                                    <p className="step-element">Imagen mostrada en la parte de "Nosotros"</p>
                                </li>
                                <li>
                                    <b>PorqueNosotrosImagen</b><br/>
                                    <p className="step-element">Imagen mostrada en la parte de "Por que nosotros"</p>
                                </li>
                            </ul>
                        </li>
                        <li>Presionas "Save" para guardar el contenido</li>
                    </ol>
                </Block>
            </div>
        );
    }
}

export default InfoEspecPanel;