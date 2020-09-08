import React, { Component, Fragment } from "react";
import { request } from "strapi-helper-plugin";
import {
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import Row from "../Row";
import Block from "../Block";


class BasicLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            programs: [],
        };
    }

    componentDidMount() {
        this.getPrograms().then(res => {
            const { programs } = res;
            this.setState({
                programs
            });
        });
    }

    getPrograms = async () => {
        try {
            const res = await request("/programas", {
                method: "GET"
            });
            const programs = res.map(program => {
                return {
                    text: program.Nombre, // (name is used for display_name)
                    id: program.Nombre // (uid is used for table creations)
                };
            });
            return { programs }
        } catch (e) {
            console.log(e);
            strapi.notification.error(`${e}`);
        }
        return [];
    };

    onTitleFieldChange = (nextValue) => {
        this.props.onFieldChange({ title: nextValue});
    };

    render() {
        const { onFieldChange, appointmentData } = this.props;
        return (
            <div className="d-flex flex-column">
                <Row className="row d-flex flex-column">
                    <div className="col-12">
                        <AppointmentForm.Label
                            text="Detalles"
                            type="title"
                        />
                        <AppointmentForm.Select
                            availableOptions={this.state.programs}
                            value={appointmentData.title ? appointmentData.title : ''}
                            onValueChange={this.onTitleFieldChange}
                            type="filledSelect"
                        />
                    </div>
                </Row>
                <Row className="row d-flex pt-0">
                    <div className="col-6">
                        <AppointmentForm.DateEditor
                            value={appointmentData.startDate ? appointmentData.startDate : ''}
                            onValueChange={onFieldChange}
                        />
                    </div>
                    <div className="col-6">
                        <AppointmentForm.DateEditor
                            value={appointmentData.endDate ? appointmentData.endDate : ''}
                            onValueChange={onFieldChange}
                        />
                    </div>
                </Row>
            </div>
        );
    }
}

export default BasicLayout;