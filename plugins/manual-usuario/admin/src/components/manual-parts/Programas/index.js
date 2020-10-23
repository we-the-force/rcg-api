import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class ProgramasPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="programas-block" name="programas-block">
                <Block title="Programas" arrow={true} className="card">
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Programas" en
                            "COLLECTION TYPES".
                        </li>
                        <li>
                            En la nueva ventana, seleccionas "+ Add New
                            Programa".
                        </li>
                        <li>
                            En la sección de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre del programa</b>
                                    <p className="step-element">
                                        El nombre del programa.
                                    </p>
                                </li>
                                <li>
                                    <b>Descripción del programa</b>
                                    <p className="step-element">
                                        La descripción del programa.
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

export default ProgramasPanel;
