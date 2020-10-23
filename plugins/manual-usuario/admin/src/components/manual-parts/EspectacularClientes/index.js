import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class EspectacularClientesPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div
                id="espectacular-clientes-block"
                name="espectacular-clientes-block"
            >
                <Block
                    title="Clientes de Espectaculares"
                    arrow={true}
                    className="card"
                >
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Espectacular
                            clientes" en "COLLECTION TYPES".
                        </li>
                        <li>
                            En la nueva ventana, seleccionas "+ Add New
                            Espectacular clientes".
                        </li>
                        <li>
                            En la sección de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre del cliente</b>
                                    <p className="step-element">
                                        El nombre del cliente.
                                    </p>
                                </li>
                                <li>
                                    <b>Logo/imagen del cliente</b>
                                    <p className="step-element">
                                        El logo o imagen del cliente.
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li>Presionas "Save".</li>
                    </ol>
                </Block>
            </div>
        );
    }
}

export default EspectacularClientesPanel;
