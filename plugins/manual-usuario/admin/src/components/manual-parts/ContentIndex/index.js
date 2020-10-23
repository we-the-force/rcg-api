import React from "react";

import Block from "../../Block";
import Scroll from "../../Scroll";

import "./style.css";

function ContentIndex() {
    return (
        <Block title="Índice" arrow={false} className="indice">
            <div>
                <Scroll type="id" element="articulo-block" offset={-85}>
                    <a href="#articulo-block" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">1</p>
                        </div>
                        <div className="container">
                            <p>Artículos</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="autor-block" offset={-85}>
                    <a href="#autor-block" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">2</p>
                        </div>
                        <div className="container">
                            <p>Autores</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="banner-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">3</p>
                        </div>
                        <div className="container">
                            <p>Banners</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="calca-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">4</p>
                        </div>
                        <div className="container">
                            <p>Calcas</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="canal-estacion-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">5</p>
                        </div>
                        <div className="container">
                            <p>Canales y Estaciones (CanalEstacions)</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="categoria-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">6</p>
                        </div>
                        <div className="container">
                            <p>Categorías</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll
                    type="id"
                    element="espectacular-clientes-block"
                    offset={-85}
                >
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">7</p>
                        </div>
                        <div className="container">
                            <p>Espectacular Clientes</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="espectacular-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">8</p>
                        </div>
                        <div className="container">
                            <p>Espectaculares</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="programacion-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">9</p>
                        </div>
                        <div className="container">
                            <p> 
                                Programación Radio-TV (Programación Semanas)
                            </p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="programas-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">10</p>
                        </div>
                        <div className="container">
                            <p>Programas</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="tags-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">11</p>
                        </div>
                        <div className="container">
                            <p>Tags</p>
                        </div>
                    </a>
                </Scroll>
            </div>
            <div className="index-static">
                <Scroll type="id" element="privacidad-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">12</p>
                        </div>
                        <div className="container">
                            <p>Aviso de Privacidad</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="contacto-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">13</p>
                        </div>
                        <div className="container">
                            <p>Contacto</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="replica-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">14</p>
                        </div>
                        <div className="container">
                            <p>Derecho de Réplica</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="info-espec-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">15</p>
                        </div>
                        <div className="container">
                            <p>Info de Espectaculares</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="about-us-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">16</p>
                        </div>
                        <div className="container">
                            <p>Nosotros</p>
                        </div>
                    </a>
                </Scroll>
                <Scroll type="id" element="faq-block" offset={-85}>
                    <a href="" className="Index-Element">
                        <div className="numCont">
                            <p className="numero">17</p>
                        </div>
                        <div className="container">
                            <p>Preguntas Frecuentes</p>
                        </div>
                    </a>
                </Scroll>
            </div>
        </Block>
    );
}

export default ContentIndex;
