import React, { memo } from "react";
import PropTypes from "prop-types";
import { Wrapper, Sub } from "./components";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const Block = ({ children, description, style, title, className }) => (
    <div className="col-md-12" style={{ padding: "0px" }}>
        <Wrapper style={style} className={className}>
            <Sub style={{ display: "flex" }}>
                {!!title && <p className="titulo">{title} </p>}{" "}
                {!!description && <p>{description} </p>}
                <ArrowDropDownIcon
                    style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "5px",
                        color: "red",
                    }}
                />
                <ArrowDropUpIcon
                    style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "5px",
                        color: "red",
                    }}
                />
            </Sub>
            {children}
        </Wrapper>
    </div>
);
Block.defaultProps = {
    children: null,
    description: null,
    style: {},
    title: null,
};
Block.propTypes = {
    children: PropTypes.any,
    description: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
};
export default memo(Block);
