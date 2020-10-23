import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class AutorPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="autor-block" name="autor-block">
                <Block title="Autor" arrow={true} className="card">
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Autors" en
                            "COLLECTION TYPES".
                        </li>
                        <li>
                            En la nueva ventana, seleccionas "+ Add New Autor".
                        </li>
                        <li>
                            Agregas:
                            <ul>
                                <li>
                                    <b>Nombre</b>
                                    <p className="step-element">
                                        El nombre del autor.
                                    </p>
                                </li>
                                <li>
                                    <b>Img</b>
                                    <p className="step-element">
                                        La imagen de perfil del autor.
                                    </p>
                                </li>
                                <li>
                                    <b>Correo</b>
                                    <p className="step-element">
                                        El correo del autor.
                                    </p>
                                </li>
                                <li>
                                    <b>Descripción</b>
                                    <p className="step-element">
                                        Una descripción para el autor.
                                    </p>
                                </li>
                                <li>
                                    <b>Url</b>
                                    <p className="step-element">
                                        No es necesario moverlo, el url que tendrá el articulo se crea automáticamente.
                                    </p>
                                </li>
                                <li>
                                    <b>Twitter_link</b>
                                    <p className="step-element">
                                        El link del perfil de Twitter del autor. Si no tiene, se puede dejar vacío.
                                    </p>
                                </li>
                                <li>
                                    <b>Facebook_link</b>
                                    <p className="step-element">
                                        El link del perfil de Facebook del autor. Si no tiene, se puede dejar vacío.
                                    </p>
                                </li>
                                <li>
                                    <b>Instagram_link</b>
                                    <p className="step-element">
                                        El link del perfil de Instagram del autor. Si no tiene, se puede dejar vacío.
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

export default AutorPanel;
