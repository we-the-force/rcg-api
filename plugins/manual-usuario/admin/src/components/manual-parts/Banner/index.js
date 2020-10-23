import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class BannerPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="banner-block" name="banner-block">
                <Block title="Banner" arrow={true} className="card">
                    <h2 className="requirement-title hidable">
                        (Requerimientos)
                    </h2>
                    <div className="links hidable">
                        <Scroll type="id" element="articulo-block" offset={-85}>
                            <a className="requirement-element">Artículos</a>
                        </Scroll>
                    </div>
                    <h3 className="hidable">Pasos</h3>
                    <ol className="hidable">
                        <li>
                            En el sidebar izquierdo, seleccionas "Banners" en
                            "COLLECTION TYPES".
                        </li>
                        <li>
                            En la nueva ventana, seleccionas "+ Add New Banner".
                        </li>
                        <li>
                            Seleccionas:
                            <ul>
                                <li>
                                    <b>Posición</b>
                                    <p className="step-element">
                                        La posición en que va a salir en el
                                        banner (1-10),{" "}
                                        <b> no se pueden repetir.</b>
                                    </p>
                                </li>
                                <li>
                                    <b>Artículo</b>
                                    <p className="step-element">
                                        El artículo a mostrar, <b> no se puede repetir. </b>
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li>Presionas "Save".</li>
                    </ol>
                    <div className="hidable errores">
                        <h4>Pueden ocurrir errores si:</h4>
                        <ul>
                            <li>Ya hay otro banner con la misma posición.</li>
                            <li>Ya hay otro banner con el mismo artículo.</li>
                        </ul>
                    </div>
                </Block>
            </div>
        );
    }
}

export default BannerPanel;
