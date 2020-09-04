/*
 *
 * Programacion Radio TV
 *
 */

import React, { memo, Component } from 'react';
import { request } from "strapi-helper-plugin";
import PropTypes from 'prop-types';
import Row from "../../components/Row";
import Block from "../../components/Block";
import ScheduledTable from "../../components/ScheduledForm";
import { get } from "lodash";
import { Header } from "@buffetjs/custom";
import { Select, Label, Button } from "@buffetjs/core";

class HomePage extends Component {
    state = {
        buttonDisable: true,
        selectedChannel: "",
        channels: [],
        scheduleActive: false,
        channelId: "",
    };
    onSaveSchedule = async () => {
        console.log('aqui guardo los datos');
        console.log('deshabilitar antes de que aparezca la tabla');
    }
    getChannels = async () => {
        try {
            const res = await request("/canal-estacions", {
                method: "GET"
            });
            const channels = res.map(channel => {
                return {
                    label: channel.nombre, // (name is used for display_name)
                    value: channel.id // (uid is used for table creations)
                };
            });
            return { channels }
        } catch (e) {
            console.log(e);
            strapi.notification.error(`${e}`);
        }
        return [];
    };
    selectChannel = selectedChannel => {
        this.setState({ selectedChannel });
    };
    onClickSchedule = () => {
        console.log('si la tabla ya esta, manda mensaje de se perderan los cambios');
        this.setState({
            scheduleActive: true
        });
    };
    componentDidMount() {
        this.getChannels().then(res => {
            const { channels } = res;
            this.setState({
                channels,
                selectedChannel: channels ? channels[0].value : ""
            });
        });
    }
    render() {
        return (
            <div className="container-fluid" style={{ padding: "47px 13px 0 13px" }}>
                <Header
                    actions={[
                        {
                            label: 'Cancelar',
                            disabled: !this.state.buttonDisable,
                            onClick: this.onSaveSchedule,
                            color: 'cancel',
                            type: 'button',
                        },
                        {
                            label: "Guardar Programación",
                            disabled: !this.state.buttonDisable,
                            onClick: this.onSaveSchedule,
                            color: 'success',
                            type: 'submit',
                        },
                    ]}
                    title={{
                        label: 'Programación Radio/TV',
                    }}
                    content="Agrega la programación semanal de los canales/estaciones de radio y tv"
                />
                <div className="row">
                    <Block
                        title="Canal / Estación"
                        description="Selecciona el canal o estación"
                        style={{ marginBottom: 12 }}
                    >
                        <Row className="row">
                            <div className={"col-4"}>
                                <Label htmlFor="select_channel_station">Canal/Estacion:</Label>
                                <Select
                                    name="select_channel_station"
                                    options={this.state.channels}
                                    value={this.state.selectedChannel}
                                    onChange={({ target: { value } }) =>
                                        this.selectChannel(value)
                                    }
                                />
                            </div>
                            <div className="col-8 d-flex justify-content-end align-items-end">
                                <Button
                                    label={"Agregar Horario"}
                                    color={"primary"}
                                    onClick={this.onClickSchedule}
                                />
                            </div>
                        </Row>
                    </Block>
                </div>
                {this.state.scheduleActive && (
                    <Row className="row">
                        <ScheduledTable
                            channelId={this.state.selectedChannel}
                        />
                    </Row>
                )}
            </div>
        );
    };
}

export default memo(HomePage);
