import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class CanalEstacionPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="canal-estacion-block" name="canal-estacion-block">
                <Block title="Canales/Estaciones" arrow={true} className="card">
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas
                            "CanalEstacions" en "COLLECTION TYPES".
                        </li>
                        <li>
                            En la nueva ventana, seleccionas "+ Add New
                            CanalEstacion".
                        </li>
                        <li>
                            En la sección de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre</b>
                                    <p className="step-element">
                                        El nombre del canal/estación.
                                    </p>
                                </li>
                                <li>
                                    <b>Logo</b>
                                    <p className="step-element">
                                        El logo del canal/estación.
                                    </p>
                                </li>
                                <li>
                                    <b>Radio_TV</b>
                                    <p className="step-element">
                                        Determina si es un canal o una estación.
                                    </p>
                                    <p className="step-element">
                                        ON = TV, OFF = Radio
                                    </p>
                                </li>
                                <li>
                                    <b>Source_Url</b>
                                    <p className="step-element">
                                        El url del media que se va a reproducir.
                                    </p>
                                </li>
                                <li>
                                    <b>Url</b>
                                    <br />
                                    <p className="step-element">
                                        No es necesario moverlo. El url que
                                        tendrá la estación se crea
                                        automáticamente.
                                    </p>
                                </li>
                                <li>
                                    <b>Descripción</b>
                                    <p className="step-element">
                                        La descripción del canal/estación.
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li>Presionas "Save".</li>
                    </ol>
                    <div className="hidable errores">
                        <h4>Pueden ocurrir errores si:</h4>
                        <ul>
                            <li>
                                Ya hay otro canal/estación con el mismo url.
                            </li>
                        </ul>
                    </div>
                </Block>
            </div>
        );
    }
}

export default CanalEstacionPanel;
