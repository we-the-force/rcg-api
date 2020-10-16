import React, { Component } from "react";
import Block from "../../Block";
import Scroll from "../../Scroll";
import "./style.css";
import "../../general-style.css";

class CalcaPanel extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div  id="calca-block" name="calca-block">
                <Block title="Calca">
                    <b className="requirement-element">Las calcas no se agregan como tal; se guardan para consultarlas<br/>No cambiar</b>
                </Block>
            </div>
        );
    }
}

export default CalcaPanel;