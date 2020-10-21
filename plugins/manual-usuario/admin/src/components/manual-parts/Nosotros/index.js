import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class NosotrosPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="about-us-block" name="about-us-block">
                <Block title="Nosotros" className="About-Us-Block">
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Nosotros" en "SINGLE TYPES"</li>
                        <li>
                            En la seccion de en medio agregas:
                            <ul>
                                <li>
                                    <b>Descripcion</b><br/>
                                    <p className="step-element">Es el texto que aparece en la parte superior de la pagina de "Nosotros"</p>
                                </li>
                                <li>
                                    <b>Info_mid</b><br/>
                                    <p className="step-element">El texto que aparece en la parte media de la pagina de "Nosotros"</p>
                                </li>
                                <li>
                                    <b>Info_bottom</b><br/>
                                    <p className="step-element">El texto que aparece en la parte media de la pagina de "Nosotros"</p>
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

export default NosotrosPanel;