/*
 *
 * Programacion Radio TV
 *
 */

import React, { memo, Component } from 'react';
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
                Ay la wea
            </div>
        );
    };
}

export default memo(HomePage);
