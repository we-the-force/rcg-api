import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class ContactoPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="contacto-block" name="contacto-block">
                <Block title="Contacto" className="Contacto-Block">
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Contacto" en "SINGLE TYPES"</li>
                        <li>
                            En la seccion de en medio agregas:
                            <ul>
                                <li>
                                    <b>Telefono</b><br/>
                                    <p className="step-element">El telefono para contactar</p>
                                </li>
                                <li>
                                    <b>Correo</b><br/>
                                    <p className="step-element">Correo para contactar</p>
                                </li>
                                <li>
                                    <b>Whatsapp</b><br/>
                                    <p className="step-element">El numero de WhatsApp para contactar</p>
                                </li>
                                <li>
                                    <b>Video_source</b><br/>
                                    <p className="step-element">El video que se mostrara en la pagina de contacto</p>
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

export default ContactoPanel;