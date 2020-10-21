import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class TagsPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="tags-block" name="tags-block">
                <Block title="Tags" className="Tags-Block">
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Tags" en "COLLECTION TYPES"</li>
                        <li>En la nueva ventana, seleccionas "+ Add New Tag"</li>
                        <li>
                            En la seccion de en medio agregas:
                            <ul>
                                <li>
                                    <b>Nombre</b><br/>
                                    <p className="step-element">El nombre del tag</p>
                                </li>
                                <li>
                                    <b>**Articulos**</b><br/>
                                    <p className="step-element">Esta parte se actualiza dinamicamente conforme se van asignando tags a articulos, <b>No mover manualmente</b></p>
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

export default TagsPanel;