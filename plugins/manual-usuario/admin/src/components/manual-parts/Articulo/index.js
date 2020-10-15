import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class ArticuloPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="articulo-block" name="articulo-block">
                <Block title="Articulo" className="Articulo-Block">
                    <h2><b className="requirement-title">Requerimientos</b></h2>
                    <Scroll type="id" element="autor-block" offset={-85}>
                        <a className="requirement-element">Autores</a>
                    </Scroll>
                    <Scroll type="id" element="categoria-block" offset={-85}>
                        <a className="requirement-element">Categorias</a>
                    </Scroll>
                    <br/>
                    <h3>Pasos</h3>
                    <ol>
                        <li>En el sidebar izquierdo, seleccionas "Articulos" en "COLLECTION TYPES"</li>
                        <li>En la nueva ventana, seleccionas "+ Add New Articulo"</li>
                        <li>
                            En la seccion de en medio agregas:
                            <ul>
                                <li>
                                    <b>Titulo</b><br/>
                                    <p className="step-element">El titulo del articulo</p>
                                </li>
                                <li>
                                    <b>Cover</b><br/>
                                    <p className="step-element">La imagen de cover del articulo <br/><b>*Su resolucion debe ser mayor a 1280x720</b></p>
                                </li>
                                <li>
                                    <b>Descripcion</b><br/>
                                    <p className="step-element">El contenido del articulo</p>
                                </li>
                                <li>
                                    <b>Fecha</b><br/>
                                    <p className="step-element">La fecha de publicacion del articulo</p>
                                </li>
                                <li>
                                    <b>Url</b><br/>
                                    <p className="step-element">El url que tendra el articulo, se crea automaticamente. No mover</p>
                                </li>
                                <li>
                                    <b>Relevante</b><br/>
                                    <p className="step-element">Para mostrar el articulo en la seccion de "Lo Mas Relevante" en el home de la pagina</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            En el panel de la derecha agregas:
                            <ul>
                                <li>
                                    <b>Autor</b><br/>
                                    <p className="step-element">Se asigna a uno de los autores que ya hayan creado previamente</p>
                                </li>
                                <li>
                                    <b>Categoria</b><br/>
                                    <p className="step-element">Se asigna a una de las categorias que ya hayan creado previamente</p>
                                </li>
                                <li>
                                    <b>Tags</b><br/>
                                    <p className="step-element">(Opcional) Se asignan los tags que sean necesarios para el articulo</p>
                                </li>
                            </ul>
                        </li>
                        <li>Presionas "Save"</li>
                    </ol>
                    <h3>**Pueden ocurrir errores si:</h3>
                    <ul>
                        <li>Las dimensiones del cover son menores a 1280x720 pixeles</li>
                        <li>El articulo no tiene autor asignado</li>
                        <li>El articulo no tiene categoria asignada</li>
                        <li>El url ya esta siendo usado por otro articulo (no deberia suceder a menos que haya sido cambiado manualmente)</li>
                    </ul>
                </Block>
            </div>
        );
    }
}

export default ArticuloPanel;