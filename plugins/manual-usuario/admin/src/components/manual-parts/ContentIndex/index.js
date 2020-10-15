import React, { Component } from "react";

import Block from "../../Block";
import Scroll from "../../Scroll";

import "./style.css";

class ContentIndex extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <Block title="Indice">
                <div>
                    {/* <h2>Indice</h2> */}
                    <Scroll type="id" element="articulo-block" offset={-85}>
                        <h3><a href="#articulo-block" className="Index-Element">   Articulos</a>                                   </h3>
                    </Scroll>
                    <h3><a href="https://www.google.com" className="Index-Element">   Autores</a>                                     </h3>
                    <h3><a href="https://www.google.com" className="Index-Element">   Banners</a>                                     </h3>
                    <h3><a href="https://www.google.com" className="Index-Element">   Calcas</a>                                      </h3>
                    <h3><a href="https://www.google.com" className="Index-Element">   CanalEstacions</a>                              </h3>
                    <h3><a href="https://www.google.com" className="Index-Element">   Categorias</a>                                  </h3>
                    <h3><a href="https://www.google.com" className="Index-Element">   Comentarios</a>                                 </h3>
                    <h3><a href="https://www.google.com" className="Index-Element">   Espectacular Clientes</a>                       </h3>
                    <h3><a href="https://www.google.com" className="Index-Element">   Espectaculares</a>                              </h3>
                    <h3><a href="https://www.google.com" className="Index-Element">   Programacion Radio-TV (ProgramacionSemanas)</a> </h3>
                    <h3><a href="https://www.google.com" className="Index-Element">   Programas</a>                                   </h3>
                    <h3><a href="https://www.google.com" className="Index-Element">   Tags</a>                                        </h3>
                </div>
            </Block>
        );
    }
}

export default ContentIndex;