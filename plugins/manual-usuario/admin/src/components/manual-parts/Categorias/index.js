import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class CategoriaPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="categorias-block" name="categorias-block">
                <Block title="Categorias" className="Categorias-Block">
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Categorias" en "COLLECTION TYPES"</li>
                        <li>En la nueva ventana, seleccionas "+ Add New Categoria"</li>
                        <li>
                            En la seccion de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre</b><br/>
                                    <p className="step-element">El nombre del categorias</p>
                                </li>
                            </ul>
                        </li>
                        <li>Presionas "Save"</li>
                    </ol>
                </Block>
            </div>
        );
    }
}

export default CategoriaPanel;