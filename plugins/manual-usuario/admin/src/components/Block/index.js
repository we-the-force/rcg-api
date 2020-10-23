import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Wrapper, Sub } from "./components";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const Block = ({ children, description, style, title, className, arrow }) => {
    const [flow, setFlow] = useState(false);
    const _className = arrow && flow ? ' collapsed' : '';
    return (
        <div className="col-md-12" style={{ padding: "0px" }}>
            <Wrapper style={style} className={className + _className}>
                <Sub style={{ display: "flex" }}>
                    {!!title && !!arrow && (
                        <a
                            onClick={() => {
                                setFlow(!flow);
                            }}
                        >
                            <p className="titulo">{title} </p>
                        </a>
                    )}{" "}
                    {!!title && !arrow && <p className="titulo">{title} </p>}{" "}
                    {!!description && <p>{description} </p>}
                    {!!arrow && flow && (
                        <a
                            onClick={() => {
                                setFlow(!flow);
                            }}
                        >
                            <ArrowDropDownIcon
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    marginLeft: "5px",
                                    color: "red",
                                }}
                            />
                        </a>
                    )}
                    {!!arrow && !flow && (
                        <a
                            onClick={() => {
                                setFlow(!flow);
                            }}
                        >
                            <ArrowDropUpIcon
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    marginLeft: "5px",
                                    color: "red",
                                }}
                            />
                        </a>
                    )}
                </Sub>
                {children}
            </Wrapper>
        </div>
    );
};
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
