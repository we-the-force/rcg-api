import React, { memo } from "react";
import PropTypes from "prop-types";
import { Wrapper, Sub } from "./components";
const Block = ({ children, description, style, title, className }) => (
    <div className="col-md-12" style={{padding: '0px'}}>
        <Wrapper style={style} className={className}>
            <Sub>
                {!!title && <p className="titulo">{title} </p>}{" "}
                {!!description && <p>{description} </p>}
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
