import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class CanalEstacionPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="canal-estacion-block" name="canal-estacion-block">
                <Block title="Canales/Estaciones" className="Canal-Estacion-Block">
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "CanalEstacions" en "COLLECTION TYPES"</li>
                        <li>En la nueva ventana, seleccionas "+ Add New CanalEstacion"</li>
                        <li>
                            En la seccion de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre</b><br/>
                                    <p className="step-element">El nombre del canal/estacion</p>
                                </li>
                                <li>
                                    <b>Logo</b><br/>
                                    <p className="step-element">El logo del canal/estacion</p>
                                </li>
                                {/* TE QUEDATES AQUI VATO LUL */}
                                <li>
                                    <b>Radio_TV</b><br/>
                                    <p className="step-element">Determina si es un canal o una estacion<br/>ON = TV, OFF = Radio</p>
                                </li>
                                <li>
                                    <b>Source_Url</b><br/>
                                    <p className="step-element">El url del media que se va a reproducir</p>
                                </li>
                                <li>
                                    <b>Url</b><br/>
                                    <p className="step-element">El url que tendra la estacion, se crea automaticamente. No mover</p>
                                </li>
                                <li>
                                    <b>Descripcion</b><br/>
                                    <p className="step-element">La descripcion del canal/estacion</p>
                                </li>
                            </ul>
                        </li>
                        <li>Presionas "Save"</li>
                    </ol>
                    <h3>**Pueden ocurrir errores si:</h3>
                    <ul>
                        <li>Ya hay otro canal/estacion con el mismo url</li>
                    </ul>
                </Block>
            </div>
        );
    }
}

export default CanalEstacionPanel;