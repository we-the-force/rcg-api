import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class PrivacidadPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="privacidad-block" name="privacidad-block">
                <Block
                    title="Aviso de Privacidad"
                    arrow={true}
                    className="card"
                >
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Aviso de
                            privacidad" en "SINGLE TYPES".
                        </li>
                        <li>
                            En descripción escribes el aviso de privacidad,
                            usando lenguaje markdown.
                        </li>
                        <li>
                            Presionas "Save" para guardar el nuevo contenido.
                        </li>
                    </ol>
                </Block>
            </div>
        );
    }
}

export default PrivacidadPanel;
