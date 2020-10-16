import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class BannerPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="banner-block" name="banner-block">
                <Block title="Banner">
                    <h2><b className="requirement-title">Requerimientos</b></h2>
                    <Scroll type="id" element="articulo-block" offset={-85}>
                        <a className="requirement-element">Articulos</a>
                    </Scroll>
                    <br/>
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Banners" en "COLLECTION TYPES"</li>
                        <li>En la nueva ventana, seleccionas "+ Add New Banner"</li>
                        <li>
                            Seleccionas:
                            <ul>
                                <li>
                                    <b>Posicion</b><br/>
                                    <p className="step-element">La posicion en que va a salir en el banner <br/><b>No se pueden repetir</b></p>
                                </li>
                                <li>
                                    <b>Articulo</b><br/>
                                    <p className="step-element">El articulo a mostrar <br/><b>No se peuden repetir</b></p>
                                </li>
                            </ul>
                        </li>
                        <li>Presionas "Save"</li>
                    </ol>
                    <h3>**Pueden ocurrir errores si:</h3>
                    <ul>
                        <li>Ya hay otro banner con la misma posicion</li>
                        <li>Ya hay otro banner con el mismo articulo</li>
                    </ul>
                </Block>
            </div>
        );
    }
}

export default BannerPanel;