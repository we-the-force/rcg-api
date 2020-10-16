/*
 *
 * Programacion Radio TV
 *
 */

import React, { memo, Component } from 'react';
import ContentIndex from "../../components/manual-parts/ContentIndex";
import Articulo from "../../components/manual-parts/Articulo";
import Autor from "../../components/manual-parts/Autor";
import Banner from "../../components/manual-parts/Banner";
import Calca from "../../components/manual-parts/Calca";
import CanalEstacion from "../../components/manual-parts/CanalEstacion";
import Categorias from "../../components/manual-parts/Categorias";
import EspectacularClientes from "../../components/manual-parts/EspectacularClientes";
import Espectaculares from "../../components/manual-parts/Espectaculares";
import Programacion from "../../components/manual-parts/Programacion";
import Programas from "../../components/manual-parts/Programas";
import Tags from "../../components/manual-parts/Tags";
import AvisoPrivacidad from "../../components/manual-parts/AvisoPrivacidad";
import Contacto from "../../components/manual-parts/Contacto";
import Replica from "../../components/manual-parts/Replica";
import InfoEspec from "../../components/manual-parts/InfoEspec";
import Nosotros from "../../components/manual-parts/Nosotros";
import FAQ from "../../components/manual-parts/FAQ";
import Block from "../../components/Block";
import Scroll from "../../components/Scroll.js";
import smoothscroll from 'smoothscroll-polyfill';

// import Row from "../../components/Row";
// import Block from "../../components/Block";
// import ScheduledTable from "../../components/ScheduledForm";
// import { get } from "lodash";
// import { Header } from "@buffetjs/custom";
import moment from 'moment';
// import { Select, Label, Button } from "@buffetjs/core";
// import { LoadingIndicator } from "strapi-helper-plugin";

import "./style.css";

moment.locale('es');

class HomePage extends Component {
    render() {
        return (
            <div className="container-fluid" style={{ padding: "47px 13px 0 13px" }}>
                <h1 className="Home-Title">Manual de Usuario</h1>
                <ContentIndex/>
                <Articulo/>
                <Autor/>
                <Banner/>
                <Calca/>
                <CanalEstacion/>
                <Categorias/>
                <EspectacularClientes/>
                <Espectaculares/>
                <Programacion/>
                <Programas/>
                <Tags/>
                <div className="divider"></div>
                <AvisoPrivacidad/>
                <Contacto/>
                <Replica/>
                <InfoEspec/>
                <Nosotros/>
                <FAQ/>
            </div>
        );
    };
}

export default memo(HomePage);
