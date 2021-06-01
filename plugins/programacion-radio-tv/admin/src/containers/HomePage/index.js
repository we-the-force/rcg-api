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
import { Checkbox } from '@buffetjs/core';
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
        idTable: '',
        recurrency: 'Una vez',
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
                let programacionWeek = {
                    "domingo": [],
                    "lunes": [],
                    "martes": [],
                    "miercoles": [],
                    "jueves": [],
                    "viernes": [],
                    "sabado": [],
                }
                let index = 0;
                for (let day in programacionWeek) {
                    programacionWeek[day] = this.state.programacion.filter(elem => {
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

                let fechaPrimerSemana = moment(this.state.fecha_inicio);
                let fechaUltimaSemana = moment(fechaPrimerSemana);
                switch (this.state.recurrency) {
                    case 'Una vez':
                        fechaUltimaSemana.add(1, 'w').subtract(1, 'd');
                        break;
                    case 'Un mes':
                        fechaUltimaSemana.add(4, 'w').subtract(1, 'd');
                        break;
                    case '6 Meses':
                        fechaUltimaSemana.add(24, 'w').subtract(1, 'd');
                        break;
                    case 'Un año':
                        fechaUltimaSemana.add(52, 'w').subtract(1, 'd');
                        break;
                    default:
                        break;
                }
                let fechaInicioCurrent = moment(fechaPrimerSemana);
                let fechaFinalCurrent = moment(fechaPrimerSemana).add(1,'w').subtract(1, 'd');
                let response = '';
                do{
                    let res = await this.getIdTable(fechaInicioCurrent);
                    let thisIdTable = get(res, ["idProgramacion"], false);
                    let table = {
                        "fecha_inicio": fechaInicioCurrent.format('YYYY-MM-DD'),
                        "fecha_final": fechaFinalCurrent.format('YYYY-MM-DD'),
                        "Radio_TV": this.state.selectedChannelMedia,
                        "canal_estacion": {
                            "id": this.state.selectedChannel
                        },
                        "programacion": programacionWeek
                    }
                    if(!thisIdTable){
                        response = await request("/programacion-semanas", {
                            method: "POST",
                            body: table
                        });
                    }else{
                        response = await request(`/programacion-semanas/${thisIdTable}`, {
                            method: "PUT",
                            body: table
                        });
                    }
                    
                    fechaInicioCurrent.add(1, 'w');
                    fechaFinalCurrent.add(1, 'w');
                }while(fechaFinalCurrent.isSameOrBefore(fechaUltimaSemana));

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

    getIdTable = async (currentDate) => {
        let momentDate = moment(currentDate) /* fecha moment del lunes */
        let date = momentDate.format('YYYY-MM-DD'); /* formato lunes */
        try {
            /* llamada a datos */
            const res = await request(`/programacion-semanas?fecha_inicio=${date}&canal_estacion.id=${this.state.selectedChannel}`, {
                method: "GET"
            });
            /* hay datos? */
            if (res.length === 0) return [];

            /* id de la tabla */
            let idProgramacion = res[0].id;
            return { idProgramacion } /* regresa array de programas fecha actual y el id en caso de ser update */
        } catch (e) {
            console.log(e);
            strapi.notification.error(`${e}`);
        }
        return [];
    };

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
    setRecurrency = (val) => {
        this.setState({
            recurrency: val
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
                        <Row className="row">
                        <div className={"col-4"}>
                            <Label htmlFor="recurrency">Repetir programacion semanal:</Label>
                            <Select
                                name="recurrency"
                                options={['Una vez', 'Un mes','6 Meses', 'Un año']}
                                value={this.state.recurrency}
                                onChange={({ target: { value } }) =>
                                    this.setRecurrency(value)
                                }
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
