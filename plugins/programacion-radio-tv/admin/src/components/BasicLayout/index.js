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
            selectedProgram: "",
            programs: [],
            date_1: null,
            date_2: null,
        };
    }

    componentDidMount() {
        this.getPrograms().then(res => {
            const { programs } = res;
            this.setState({
                programs,
                selectedProgram: programs ? programs[0].id : ""
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
                    id: program.id // (uid is used for table creations)
                };
            });
            return { programs }
        } catch (e) {
            console.log(e);
            strapi.notification.error(`${e}`);
        }
        return [];
    };

    selectProgram = selectedProgram => {
        this.setState({ selectedProgram: selectedProgram });
    };

    onChangeDate1 = date1 => {
        this.setState({ date_1: date1 });
    };

    onChangeDate2 = date2 => {
        this.setState({ date_2: date2 });
    };

    render() {
        const { } = this.state;
        console.log(this.props);
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
                            value={this.state.selectedProgram}
                            onValueChange={e => this.selectProgram(e)}
                            type="filledSelect"
                        />
                    </div>
                </Row>
                <Row className="row d-flex pt-0">
                    <div className="col-6">
                        <AppointmentForm.DateEditor
                            value={this.state.date_1}
                            onValueChange={this.onChangeDate1}
                        />
                    </div>
                    <div className="col-6">
                        <AppointmentForm.DateEditor
                            value={this.state.date_2}
                            onValueChange={this.onChangeDate2}
                        />
                    </div>
                </Row>
            </div>
        );
    }
}

export default BasicLayout;