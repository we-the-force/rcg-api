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
                    <Scroll type="id" element="autor-block" offset={-85}>
                        <h3><a href="#autor-block" className="Index-Element">   Autores</a>                                     </h3>
                    </Scroll>
                    <Scroll type="id" element="banner-block" offset={-85}>
                        <h3><a href="" className="Index-Element">   Banners</a>                                     </h3>
                    </Scroll>
                    <Scroll type="id" element="calca-block" offset={-85}>
                        <h3><a href="" className="Index-Element">   Calcas</a>                                      </h3>
                    </Scroll>
                    <Scroll type="id" element="canal-estacion-block" offset={-85}>
                        <h3><a href="" className="Index-Element">   CanalEstacions</a>                              </h3>
                    </Scroll>
                    <Scroll type="id" element="categoria-block" offset={-85}>
                        <h3><a href="" className="Index-Element">   Categorias</a>                                  </h3>
                    </Scroll>
                    <Scroll type="id" element="espectacular-clientes-block" offset={-85}>
                        <h3><a href="" className="Index-Element">   Espectacular Clientes</a>                       </h3>
                    </Scroll>
                    <Scroll type="id" element="espectacular-block" offset={-85}>
                        <h3><a href="" className="Index-Element">   Espectaculares</a>                              </h3>
                    </Scroll>
                    <Scroll type="id" element="programacion-block" offset={-85}>
                        <h3><a href="" className="Index-Element">   Programacion Radio-TV (ProgramacionSemanas)</a> </h3>
                    </Scroll>
                    <Scroll type="id" element="programas-block" offset={-85}>
                        <h3><a href="" className="Index-Element">   Programas</a>                                   </h3>
                    </Scroll>
                    <Scroll type="id" element="tags-block" offset={-85}>
                        <h3><a href="" className="Index-Element">   Tags</a>                                        </h3>
                    </Scroll>
                </div>
            </Block>
        );
    }
}

export default ContentIndex;