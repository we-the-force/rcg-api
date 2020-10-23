import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class NosotrosPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="about-us-block" name="about-us-block">
                <Block title="Nosotros" arrow={true} className="card">
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Nosotros" en
                            "SINGLE TYPES".
                        </li>
                        <li>
                            En la sección de en medio agregas:
                            <ul>
                                <li>
                                    <b>Descripcion</b>
                                    <p className="step-element">
                                        Es el texto que aparece en la parte
                                        superior de la página de "Nosotros".
                                    </p>
                                </li>
                                <li>
                                    <b>Info_mid</b>
                                    <p className="step-element">
                                        Es el texto que aparece en la parte
                                        media de la página de "Nosotros".
                                    </p>
                                </li>
                                <li>
                                    <b>Info_bottom</b>
                                    <p className="step-element">
                                        Es el texto que aparece en la parte baja
                                        de la página de "Nosotros".
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

export default NosotrosPanel;
