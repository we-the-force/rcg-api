import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class ProgramacionPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="programacion-block" name="programacion-block">
                <Block title="Programacion" arrow={true} className="card">
                    <h2 className="requirement-title hidable">
                        (Requerimientos)
                    </h2>
                    <div className="links hidable">
                        <Scroll
                            type="id"
                            element="canal-estacion-block"
                            offset={-85}
                        >
                            <a className="requirement-element">
                                Canales/Estaciones
                            </a>
                        </Scroll>
                        <Scroll
                            type="id"
                            element="programas-block"
                            offset={-85}
                        >
                            <a className="requirement-element">Programas</a>
                        </Scroll>
                    </div>
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Programacion
                            Radio-TV" en "PLUGINS".
                        </li>
                        <li>
                            Seleccionas uno de tus canales o estaciones creados
                            previamente.
                        </li>
                        <li>Presionas el botón "Agregar Horario".</li>
                        <li>
                            Agregas Programas:
                            <ul>
                                <li>
                                    Presionas el botón de "+" o das doble click
                                    sobre una celda.
                                </li>
                                <li>
                                    Para agregar un programa:
                                    <ul>
                                        <li>
                                            Seleccionas el programa (creado
                                            previamente).
                                        </li>
                                        <li>
                                            Seleccionas la hora de inicio y la
                                            hora de final.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Una vez creado, puedes arrastrar la parte
                                    superior o inferior de los programas para
                                    cambiar su duración. (opcional)
                                </li>
                                <li>Repite hasta terminar.</li>
                            </ul>
                        </li>
                        <li>Presionas "Guardar Programacion".</li>
                    </ol>
                </Block>
            </div>
        );
    }
}

export default ProgramacionPanel;
