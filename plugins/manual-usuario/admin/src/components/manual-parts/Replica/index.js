import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class ReplicaPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="replica-block" name="replica-block">
                <Block title="Derecho de Replica" className="Replica-Block">
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Derecho de replica" en "SINGLE TYPES"</li>
                        <li>
                            En la seccion de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre</b><br/>
                                    <p className="step-element">Nombre del responsable de derecho de replica</p>
                                </li>
                                <li>
                                    <b>Direccion</b><br/>
                                    <p className="step-element">Direccion del deste</p>
                                </li>
                                <li>
                                    <b>Telefono</b><br/>
                                    <p className="step-element">Telefono del deste</p>
                                </li>
                                <li>
                                    <b>Correo</b><br/>
                                    <p className="step-element">Correo del contacto</p>
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

export default ReplicaPanel;