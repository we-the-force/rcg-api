import React, { Component } from "react";
import { Select } from "@buffetjs/core";
import { get } from "lodash";

class TargetFieldSelect extends Component {
    state = {
        selectedTarget: ""
    };
    componentDidMount() {
        const options = this.fillOptions();
        this.setState({ selectedTarget: options && options[0] });
    }
    onChange(selectedTarget) {
        this.props.onChange(selectedTarget);
        this.setState({ selectedTarget });
    }
    fillOptions() {
        const { targetModel } = this.props;
        const schemaAttributes = get(targetModel, ["schema", "attributes"], {});
        var options;
        if(targetModel.apiID === 'articulo'){
            options = Object.keys(schemaAttributes)
            .map(fieldName => {
                const attribute = get(schemaAttributes, [fieldName], {});
                let relation = attribute.type ? false : true;
                return { label: fieldName, value: fieldName, relation: relation };
            });
        }else{
            options = Object.keys(schemaAttributes)
                .map(fieldName => {
                    const attribute = get(schemaAttributes, [fieldName], {});
                    return attribute.type && { label: fieldName, value: fieldName, relation: false };
                })
                .filter(obj => obj !== undefined);
        }

        return [{ label: "None", value: "none", relation: false }, ...options];
    }
    render() {
        return (
            <Select
                name={"targetField"}
                value={this.state.selectedTarget}
                options={this.fillOptions()}
                onChange={({ target: { value } }) => this.onChange(value)}
            />
        );
    }
}
export default TargetFieldSelect;