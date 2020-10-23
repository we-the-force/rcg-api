import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class ReplicaPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="replica-block" name="replica-block">
                <Block title="Derecho de Replica" arrow={true} className="card">
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Derecho de
                            replica" en "SINGLE TYPES".
                        </li>
                        <li>
                            En la sección de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre</b>
                                    <p className="step-element">
                                        Nombre del responsable de derecho de
                                        réplica.
                                    </p>
                                </li>
                                <li>
                                    <b>Direccion</b>
                                    <p className="step-element">
                                        Dirección del contacto responsable.
                                    </p>
                                </li>
                                <li>
                                    <b>Telefono</b>
                                    <p className="step-element">
                                        Teléfono del contacto responsable.
                                    </p>
                                </li>
                                <li>
                                    <b>Correo</b>
                                    <p className="step-element">
                                        Correo del contacto responsable.
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

export default ReplicaPanel;
