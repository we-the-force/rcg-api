import React, { Component } from "react";
import Block from "../../Block";
import "./style.css";
import "../../general-style.css";

class ArticuloPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <Block id="articulo-block" name="articulo-block" title="Articulo" className="Articulo-Block">
                <b className="requirement-title">Requerimientos</b><br/>
                <a className="requirement-element">Autores</a>
                <a className="requirement-element">Categorias</a>
            </Block>
        );
    }
}

export default ArticuloPanel;