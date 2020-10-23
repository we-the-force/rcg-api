import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class CategoriaPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="categoria-block" name="categoria-block">
                <Block title="Categorias" arrow={true} className="card">
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Categorías" en
                            "COLLECTION TYPES".
                        </li>
                        <li>
                            En la nueva ventana, seleccionas "+ Add New
                            Categoria"
                        </li>
                        <li>
                            En la sección de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre</b>
                                    <p className="step-element">
                                        El nombre de la categoría.
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

export default CategoriaPanel;
