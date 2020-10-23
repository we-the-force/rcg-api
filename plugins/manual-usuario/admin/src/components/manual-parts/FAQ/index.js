import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class FAQPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="faq-block" name="faq-block">
                <Block
                    title="Preguntas Frecuentes"
                    arrow={true}
                    className="card"
                >
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Preguntas
                            frecuentes" en "SINGLE TYPES".
                        </li>
                        <li>Presionas el botón "Add New Entry".</li>
                        <li>
                            Seleccionas la nueva pregunta e ingresas:
                            <ul>
                                <li>
                                    <b>Pregunta</b>
                                    <p className="step-element">
                                        La pregunta que quieras responder.
                                    </p>
                                </li>
                                <li>
                                    <b>Respuesta</b>
                                    <p className="step-element">
                                        La respuesta a la pregunta.
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

export default FAQPanel;
