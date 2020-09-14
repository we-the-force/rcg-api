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
import moment from 'moment';
import { Select, Label, Button } from "@buffetjs/core";
import { LoadingIndicator } from "strapi-helper-plugin";

moment.locale('es');

class HomePage extends Component {
    state = {
        selectedChannel: "", //identificador del canal
        channels: [],
        scheduleActive: false,
        selectedChannelMedia: null, //false == radio, true == tv
        fecha_inicio: '',
        fecha_final: '',
        programacion: {},
        uploading: false,
        isUpdate: false,
        idTable: ''
    };
    onSaveSchedule = async () => {
        this.setState({ uploading: true }, async () => {
            try {
                let programas = [];
                try {
                    let res = await request("/programas", {
                        method: "GET"
                    });
                    programas = res.map(program => {
                        return {
                            text: program.Nombre, // (name is used for display_name)
                            id: program.id // (uid is used for table creations)
                        };
                    });
                } catch (e) {
                    strapi.notification.error(`${e}`);
                    return;
                }
                let programacion = {
                    "lunes": [],
                    "martes": [],
                    "miercoles": [],
                    "jueves": [],
                    "viernes": [],
                    "sabado": [],
                    "domingo": []
                }
                let index = 1;
                for (let day in programacion) {
                    programacion[day] = this.state.programacion.filter(elem => {
                        let fechaInicio = moment(elem.startDate);
                        let fechaFinal = moment(elem.endDate);
                        if (fechaInicio.format('d') == index && fechaFinal.format('d') == index) {
                            return true;
                        }
                        return false;
                    }).map(el => {
                        let fechaInicio = moment(el.startDate);
                        let fechaFinal = moment(el.endDate);
                        let programId = programas.find(prog => {
                            return prog.text === el.title
                        }).id;
                        return {
                            "hora_inicio": fechaInicio.format("HH:mm:ss.SSS"),
                            "hora_final": fechaFinal.format("HH:mm:ss.SSS"),
                            "programa": {
                                "id": programId
                            }
                        }
                    });
                    index++;
                }
                let table = {
                    "fecha_inicio": this.state.fecha_inicio,
                    "fecha_final": this.state.fecha_final,
                    "Radio_TV": this.state.selectedChannelMedia,
                    "canal_estacion": {
                        "id": this.state.selectedChannel
                    },
                    "programacion": programacion
                }
                let response = '';
                if(!this.state.isUpdate){
                    response = await request("/programacion-semanas", {
                        method: "POST",
                        body: table
                    });
                }else{
                    response = await request(`/programacion-semanas/${this.state.idTable}`, {
                        method: "PUT",
                        body: table
                    });
                }

                this.setState({ uploading: false, isUpdate: true, idTable: response.id}, () => {
                    strapi.notification.success(`Schedule added Successfully`);
                });
            } catch (e) {
                this.setState({ uploading: false }, () => {
                    strapi.notification.error(`Schedule creation Failed, try again`);
                    strapi.notification.error(`${e}`);
                    console.log(e);
                });
            }
        });
    }
    getChannels = async () => {
        try {
            const res = await request("/canal-estacions", {
                method: "GET"
            });
            const channels = res.map(channel => {
                return {
                    label: channel.nombre, // (name is used for display_name)
                    value: channel.id, // (uid is used for table creations)
                    media: channel.Radio_TV
                };
            });
            return { channels }
        } catch (e) {
            console.log(e);
            strapi.notification.error(`${e}`);
        }
        return [];
    };
    selectChannel = (selectedChannel) => {
        let value = this.state.channels.find(channel => {
            return channel.value == selectedChannel;
        });
        this.setState({
            selectedChannel,
            selectedChannelMedia: value.media,
            scheduleActive: false
        });
    };
    onClickSchedule = () => {
        this.setState({
            scheduleActive: true
        });
    };
    onProgramaciónChange = (prog) => {
        this.setState({
            programacion: prog
        });
    };
    onFechaInicioChange = (fi) => {
        this.setState({
            fecha_inicio: fi
        });
    };
    onIsUpdate = (iu, id) => {
        this.setState({
            isUpdate: iu,
            idTable: id
        });
    };
    onFechaFinalChange = (ff) => {
        this.setState({
            fecha_final: ff
        });
    };
    componentDidMount() {
        this.getChannels().then(res => {
            const { channels } = res;
            this.setState({
                channels,
                selectedChannel: channels ? channels[0].value : "",
                selectedChannelMedia: channels ? channels[0].media : "",
            });
        });
    }
    render() {
        return (
            <div className="container-fluid" style={{ padding: "47px 13px 0 13px" }}>
                <Header
                    actions={[
                        {
                            label: "Guardar Programación",
                            disabled: !this.state.scheduleActive,
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
                    {this.state.uploading && <LoadingIndicator />}
                </div>
                {this.state.scheduleActive && (
                    <Row className="row">
                        <ScheduledTable
                            channelId={this.state.selectedChannel}
                            onfecha_inicio={this.onFechaInicioChange}
                            onfecha_final={this.onFechaFinalChange}
                            onprogramacion={this.onProgramaciónChange}
                            onIsUpdate={this.onIsUpdate}
                        />
                    </Row>
                )}
            </div>
        );
    };
}

export default memo(HomePage);
