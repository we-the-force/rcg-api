import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class ContactoPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="contacto-block" name="contacto-block">
                <Block title="Contacto" arrow={true} className="card">
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Contacto" en
                            "SINGLE TYPES".
                        </li>
                        <li>
                            En la sección de en medio agregas:
                            <ul>
                                <li>
                                    <b>Telefono</b>
                                    <p className="step-element">
                                        El teléfono para contactar.
                                    </p>
                                </li>
                                <li>
                                    <b>Correo</b>
                                    <p className="step-element">
                                        Correo para contactar
                                    </p>
                                </li>
                                <li>
                                    <b>Whatsapp</b>
                                    <p className="step-element">
                                        El número de WhatsApp para contactar.
                                    </p>
                                </li>
                                <li>
                                    <b>Video_source</b>
                                    <p className="step-element">
                                        El video que se mostrará en la página de
                                        contacto.
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

export default ContactoPanel;
