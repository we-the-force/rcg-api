import React, { useState } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
//import "../../general-style.css";

function ArticuloPanel() {
    return (
        <div id="articulo-block" name="articulo-block">
            <Block title="Artículo" arrow={true} className="Articulo-Block card" >
                <h2 className="requirement-title hidable">(Requerimientos)</h2>
                <div className="links hidable">
                    <Scroll type="id" element="autor-block" offset={-85}>
                        <a className="requirement-element">Autores</a>
                    </Scroll>
                    <Scroll type="id" element="categoria-block" offset={-85}>
                        <a className="requirement-element">Categorías</a>
                    </Scroll>
                </div>
                <h3 className="hidable">Pasos</h3>
                <ol className="hidable">
                    <li>
                        En el sidebar izquierdo, seleccionas "Articulos" en
                        "COLLECTION TYPES".
                    </li>
                    <li>
                        En la nueva ventana, seleccionas "+ Add New Articulo".
                    </li>
                    <li>
                        En la sección de en medio agregas:
                        <ul>
                            <li>
                                <b>Título</b>
                                <p className="step-element">
                                    El título del artículo.
                                </p>
                            </li>
                            <li>
                                <b>Cover</b>
                                <p className="step-element">
                                    La imagen de cover para el artículo.
                                    <b>
                                        *Su resolución debe ser mayor a 1280x720
                                        píxeles.
                                    </b>
                                </p>
                            </li>
                            <li>
                                <b>Descripción</b>
                                <p className="step-element">
                                    El contenido del artículo.
                                </p>
                            </li>
                            <li>
                                <b>Fecha</b>
                                <p className="step-element">
                                    La fecha de publicación del artículo.
                                </p>
                            </li>
                            <li>
                                <b>Url</b>
                                <p className="step-element">
                                    No es necesario moverlo, el url que tendrá
                                    el articulo se crea automáticamente.
                                </p>
                            </li>
                            <li>
                                <b>Relevante</b>
                                <p className="step-element">
                                    Para mostrar el artículo en la sección de
                                    "Lo Más Relevante" en el home de la página.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        En el panel de la derecha agregas:
                        <ul>
                            <li>
                                <b>Autor</b>
                                <p className="step-element">
                                    Se asigna a uno de los autores que ya hayan
                                    creado previamente.
                                </p>
                            </li>
                            <li>
                                <b>Categoría</b>
                                <p className="step-element">
                                    Se asigna a una de las categorías que ya
                                    hayan creado previamente.
                                </p>
                            </li>
                            <li>
                                <b>Tags</b>
                                <p className="step-element">
                                    (Opcional) Se asignan los tags que sean
                                    necesarios para el artículo.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>Presionas "Save".</li>
                </ol>
                <div className="hidable errores">
                    <h4>Pueden ocurrir errores si:</h4>
                    <ul>
                        <li>
                            Las dimensiones del cover son menores a 1280x720
                            píxeles.
                        </li>
                        <li>El artículo no tiene autor asignado.</li>
                        <li>El artículo no tiene categoría asignada.</li>
                        <li>
                            El url ya está siendo usado por otro artículo (no
                            debería suceder a menos que haya sido cambiado
                            manualmente).
                        </li>
                    </ul>
                </div>
            </Block>
        </div>
    );
}

export default ArticuloPanel;
