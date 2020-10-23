import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class TagsPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="tags-block" name="tags-block">
                <Block title="Tags"  arrow={true} className="card">
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Tags" en
                            "COLLECTION TYPES".
                        </li>
                        <li>
                            En la nueva ventana, seleccionas "+ Add New Tag".
                        </li>
                        <li>
                            En la sección de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre</b>
                                    <p className="step-element">
                                        El nombre del tag.
                                    </p>
                                </li>
                                <li>
                                    <b>**Articulos**</b>
                                    <p className="step-element">
                                        <b> No mover manualmente.</b> Esta parte
                                        se actualiza dinámicamente conforme se
                                        van asignando tags a los artículos.
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

export default TagsPanel;
