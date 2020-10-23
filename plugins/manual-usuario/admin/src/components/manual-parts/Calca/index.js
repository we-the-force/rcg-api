import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class CalcaPanel extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="calca-block" name="calca-block">
                <Block title="Calca" arrow={true} className="card">
                    <h3 className="hidable">
                        <b> No cambiar.</b>
                    </h3>
                    <p className="hidable">
                        <b>
                            Las calcas no se agregan como tal, solo se guardan
                            para consultarlas.
                        </b>
                    </p>
                </Block>
            </div>
        );
    }
}

export default CalcaPanel;
