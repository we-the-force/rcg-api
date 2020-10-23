import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class InfoEspecPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="info-espec-block" name="info-espec-block">
                <Block
                    title="Informacion de Espectaculares"
                    arrow={true}
                    className="card"
                >
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Espectacular
                            info" en "SINGLE TYPES".
                        </li>
                        <li>
                            En la sección de en medio agregas:
                            <ul>
                                <li>
                                    <b>Porque_nosotros</b>
                                    <p className="step-element">
                                        Texto mostrado en la parte de "Por qué
                                        nosotros".
                                    </p>
                                </li>
                                <li>
                                    <b>Nosotros</b>
                                    <p className="step-element">
                                        Texto mostrado en la parte de
                                        "Nosotros".
                                    </p>
                                </li>
                                <li>
                                    <b>NosotrosImagen</b>
                                    <p className="step-element">
                                        Imagen mostrada en la parte de
                                        "Nosotros".
                                    </p>
                                </li>
                                <li>
                                    <b>PorqueNosotrosImagen</b>
                                    <p className="step-element">
                                        Imagen mostrada en la parte de "Por qué
                                        nosotros".
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li>Presionas "Save" para guardar el contenido.</li>
                    </ol>
                </Block>
            </div>
        );
    }
}

export default InfoEspecPanel;
