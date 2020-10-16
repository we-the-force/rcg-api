import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class AutorPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="autor-block" name="autor-block">
                <Block title="Autor">
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Autors" en "COLLECTION TYPES"</li>
                        <li>En la nueva ventana, seleccionas "+ Add New Autor"</li>
                        <li>
                            Agregas:
                            <ul>
                                <li>
                                    <b>Nombre</b><br/>
                                    <p className="step-element">El nombre del autor</p>
                                </li>
                                <li>
                                    <b>Img</b><br/>
                                    <p className="step-element">La imagen de perfil del autor</p>
                                </li>
                                <li>
                                    <b>Correo</b><br/>
                                    <p className="step-element">El correo del autor</p>
                                </li>
                                <li>
                                    <b>Descripcion</b><br/>
                                    <p className="step-element">Una descripcion del autor</p>
                                </li>
                                <li>
                                    <b>Url</b><br/>
                                    <p className="step-element">El url que tendra el autor, se crea automaticamente. No cambiar</p>
                                </li>
                                <li>
                                    <b>Twitter_link</b><br/>
                                    <p className="step-element">El link del perfil de Twitter del autor. Si no tiene, se puede dejar vacio</p>
                                </li>
                                <li>
                                    <b>Facebook_link</b><br/>
                                    <p className="step-element">El link del perfil de Facebook del autor. Si no tiene, se puede dejar vacio</p>
                                </li>
                                <li>
                                    <b>Instagram_link</b><br/>
                                    <p className="step-element">El link del perfil de Instagram del autor. Si no tiene, se puede dejar vacio</p>
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

export default AutorPanel;