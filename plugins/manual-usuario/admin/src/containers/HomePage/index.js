/*
 *
 * Programacion Radio TV
 *
 */

import React, { memo, Component } from 'react';
import ContentIndex from "../../components/manual-parts/ContentIndex";
import Articulo from "../../components/manual-parts/Articulo";
import Block from "../../components/Block";
import smoothscroll from 'smoothscroll-polyfill';

// import Row from "../../components/Row";
// import Block from "../../components/Block";
// import ScheduledTable from "../../components/ScheduledForm";
// import { get } from "lodash";
// import { Header } from "@buffetjs/custom";
import moment from 'moment';
// import { Select, Label, Button } from "@buffetjs/core";
// import { LoadingIndicator } from "strapi-helper-plugin";

moment.locale('es');

class HomePage extends Component {
    render() {
        return (
            <div className="container-fluid" style={{ padding: "47px 13px 0 13px" }}>
                <h1 className="Home-Title">Manual de Usuario</h1>
                {/* <ContentIndex/>
                <Articulo/>
                <ContentIndex/>
                <ContentIndex/>
                <ContentIndex/>
                <ContentIndex/>
                <ContentIndex/> */}

                <Block title="Indice">
                    <div>
                        {/* <h2>Indice</h2> */}
                        <h3><a href="#articulo-block" className="Index-Element">   Articulos</a>                                   </h3>
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
                <Block id="articulo-block" name="articulo-block" title="Articulo" className="Articulo-Block">
                    <b className="requirement-title">Requerimientos</b><br/>
                    <a className="requirement-element">Autores</a>
                    <a className="requirement-element">Categorias</a>
                </Block>
                <Block title="Indice">
                    <div>
                        {/* <h2>Indice</h2> */}
                        <h3><a href="#articulo-block" className="Index-Element">   Articulos</a>                                   </h3>
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
                <Block title="Indice">
                    <div>
                        {/* <h2>Indice</h2> */}
                        <h3><a href="#articulo-block" className="Index-Element">   Articulos</a>                                   </h3>
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
                <Block title="Indice">
                    <div>
                        {/* <h2>Indice</h2> */}
                        <h3><a href="#articulo-block" className="Index-Element">   Articulos</a>                                   </h3>
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
                <Block title="Indice">
                    <div>
                        {/* <h2>Indice</h2> */}
                        <h3><a href="#articulo-block" className="Index-Element">   Articulos</a>                                   </h3>
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
            </div>
        );
    };
}

export default memo(HomePage);
