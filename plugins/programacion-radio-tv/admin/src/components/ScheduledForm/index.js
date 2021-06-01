import React, { Component, Fragment } from "react";
import clsx from 'clsx';
import { request } from "strapi-helper-plugin";
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { connectProps } from '@devexpress/dx-react-core';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentTooltip,
    TodayButton,
    Toolbar,
    AppointmentForm,
    DateNavigator,
    DragDropProvider,
    EditRecurrenceMenu,
    Resources
} from '@devexpress/dx-react-scheduler-material-ui';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Overlay from '../Overlay';
import Block from "../Block";
import moment from 'moment';
import Row from "../Row";
import { get } from "lodash";
import qs from 'qs';

moment.locale('es');

/* diseño de tarjetas */
const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: '#007bff',
            borderRadius: '8px',
            fontSize: '1.2rem',
        }}
    >
        {children}
    </Appointments.Appointment>
);

/* diseño de fab */
const styles = theme => ({
    fab: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(6),
    },
    addIcon: {
        fontSize: '2rem'
    },
});


class ScheduleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],/* aqui tengo que traer la programacion */
            currentDate: moment().startOf('isoWeek').toDate(),//new Date(),/* obtener el dia actual incluir moment */

            startDayHour: 9,/* cambiar a hora inicial */
            endDayHour: 19,/* cambiar a hora final */

            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,

            editingFormVisible: false,/* dicta si el form se ve o no */
            previousAppointment: undefined,
            isNewAppointment: false,

            isAnUpdate: false, /* is an update */
            TableIdUpdate: '',  /* id de la tabla */
        };

        /* manda props a form para llenar datos */
        this.appointmentForm = connectProps(Overlay, () => {
            const {
                editingFormVisible,
                editingAppointment,
                data,
                addedAppointment,
                isNewAppointment,
                previousAppointment,
            } = this.state;

            /* tarjeta actual */
            const currentAppointment = data
                .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
                || addedAppointment;

            /* cancelar datos */
            const cancelAppointment = () => {
                if (isNewAppointment) {
                    this.setState({
                        editingAppointment: previousAppointment,
                        isNewAppointment: false,
                    });
                }
            };

            /* le manda los props */
            return {
                visible: editingFormVisible, /* el form se va a ver? */
                appointmentData: currentAppointment, /* datos del appointment actual */
                commitChanges: this.commitChanges, /* hacer commit de los cambios */
                visibleChange: this.toggleEditingFormVisibility, /* funcion para cerrar form */
                onEditingAppointmentChange: this.changeEditingAppointment, /* comienza a editar */
                cancelAppointment,/* funcion para cancelar y borrar datos */
            };
        });
    }

    /* actualiza form on update */
    componentDidUpdate() {
        this.appointmentForm.update();
    }

    /* cambia visibilidad de form */
    toggleEditingFormVisibility = () => {
        const { editingFormVisible } = this.state;
        this.setState({
            editingFormVisible: !editingFormVisible,
        });
    }

    /* actualiza fecha actual */
    currentDateChange = (currentDate) => {
        this.getData(moment(currentDate).startOf('isoWeek')).then(res => { /* cuando cambian de fecha */
            let data = get(res, ["programas"], []);
            let date = get(res, ["newCurrentDate"], currentDate);
            let IdUpdate = get(res, ["idProgramacion"], false);
            let isUpdate = IdUpdate ? true : IdUpdate;
            let idTable = IdUpdate ? IdUpdate : '';
            this.setState({
                data: data,
                currentDate: date,
                isAnUpdate: isUpdate,
                TableIdUpdate: idTable,
            });
            this.props.onprogramacion(data);
            this.props.onfecha_inicio(moment(date).startOf('isoWeek').format('YYYY-MM-DD'));
            this.props.onfecha_final(moment(date).endOf('isoWeek').format('YYYY-MM-DD'));
            this.props.onIsUpdate(isUpdate, idTable);
        });
    };

    /* añade appointment */
    changeAddedAppointment = (addedAppointment) => {
        console.log('adding');
        //console.log(addedAppointment);
        this.setState({ addedAppointment });
    }

    /* continuamente editando */
    changeAppointmentChanges = (appointmentChanges) => {
        console.log('continuous editiong');
        //console.log(appointmentChanges);
        this.setState({ appointmentChanges });
    }

    /* comienza a editar */
    changeEditingAppointment = (editingAppointment) => {
        console.log('start editing');
        //console.log(editingAppointment);
        this.setState({ editingAppointment });
    }

    /* commitea los cambios */
    commitChanges = async ({ added, changed, deleted }) => {
        await this.setState((state) => {
            let { data } = state;
            if (added) {
                if (this.validateDates(added, 'added')) {
                    const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                    data = [...data, { id: startingAddedId, ...added }];
                } else {
                    strapi.notification.error(`Horario o fecha invalida`);
                }
            }
            if (changed) {
                if (this.validateDates(changed, 'changed')) {
                    data = data.map(appointment => (
                        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
                } else {
                    strapi.notification.error(`Horario o fecha invalida`);
                }
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
        this.props.onprogramacion(this.state.data);
    }

    validateDates = (values, type) => {
        let { data, currentDate } = this.state; /* todos los datos */
        let firstDayOfWeek = moment(currentDate).startOf('isoWeek');
        let lastDayOfWeek = moment(currentDate).endOf('isoWeek').add(1, 's');
        let startDate = ''; /* declaro variable local inicio de fecha */
        let endDate = ''; /* declaro variable local fin de fecha */
        let id = ''; /* id de el elemento cambiado */
        if (type === 'changed') { /* si el elemento fue modificado obtiene los valores asi */
            id = Object.keys(values)[0]; /* obtiene id */
            startDate = moment(values[id].startDate); /* moment de fecha inicio */
            endDate = moment(values[id].endDate); /* moment de fecha final */
        } else if (type === 'added') {
            startDate = moment(values.startDate); /* moment de fecha inicio */
            endDate = moment(values.endDate); /* moment de fecha final */
        }
        let data_valid = !(startDate.isBefore(firstDayOfWeek) ||
            endDate.isBefore(firstDayOfWeek) ||
            startDate.isAfter(lastDayOfWeek) ||
            endDate.isAfter(lastDayOfWeek) ||
            startDate.isAfter(endDate));
        let array_valid = data.every((val) => { /* si todos los valores cumplen con la condicion pasa si no error */
            if (id == val.id) return true; /* si el elemento es el mismo que en los datos pasa la prueba */
            let thisStartDate = moment(val.startDate); /* moment inicio del elemento a verificar */
            let thisEndDate = moment(val.endDate); /* moment final del elemento a modificar */
            /* estado a cumplir para pasar la prueba */
            let invalid = startDate.isBetween(thisStartDate, thisEndDate, undefined, '[)') ||
                endDate.isBetween(thisStartDate, thisEndDate, undefined, '(]') ||
                startDate.isBefore(thisStartDate) && endDate.isAfter(thisEndDate)
            if (invalid) return false; /* si es invalido no pasa la prueba  */
            return true; /* si paso la prueba */
        });
        return data_valid && array_valid;
    }

    componentDidMount() {
        /* aqui traigo data al accesar */
        this.getData(this.state.currentDate).then(res => {
            let data = get(res, ["programas"], []);
            let date = get(res, ["newCurrentDate"], moment().toDate());
            let IdUpdate = get(res, ["idProgramacion"], false);
            let isUpdate = IdUpdate ? true : IdUpdate;
            let idTable = IdUpdate ? IdUpdate : '';
            this.setState({
                data: data,
                currentDate: date,
                isAnUpdate: isUpdate,
                TableIdUpdate: idTable,
            });
            this.props.onprogramacion(data);
            this.props.onfecha_inicio(moment(date).startOf('isoWeek').format('YYYY-MM-DD'));
            this.props.onfecha_final(moment(date).endOf('isoWeek').format('YYYY-MM-DD'));
            this.props.onIsUpdate(isUpdate, idTable);
        });
    }

    getData = async (currentDate) => {
        let { channelId } = this.props; /* id del canal */
        let momentDate = moment(currentDate) /* fecha moment del lunes */
        let date = momentDate.format('YYYY-MM-DD'); /* formato lunes */
        try {
            /* llamada a datos */
            const res = await request(`/programacion-semanas?fecha_inicio=${date}&canal_estacion.id=${channelId}`, {
                method: "GET"
            });
            /* hay datos? */
            if (res.length === 0) return [];

            /* id de la tabla */
            let idProgramacion = res[0].id;
            let days = res[0].programacion; /* array dias de la semana */
            let index = 0; /* index para saber en que dia voy (comienza en cero para no aumentar con id)*/
            let programas = []; /* contenedor para los programas (tarjetas) */
            for (let day in days) { /* recorro los dias de la semana */
                let dayDate = moment(momentDate).add(index, 'd');/* moment del dia de la semana con id no aumenta*/
                if (day !== 'id' || days[day].length > 0) { /* si es id o no tiene contenido no lo hace */
                    let local_programs = days[day].map(val => {  /* recorres las tarjetas dias del programa */
                        let hora_inicio = moment(dayDate).add(val.hora_inicio); /* moment de la hora inicial del programa */
                        let hora_final = moment(dayDate).add(val.hora_final); /* moment de la hora final del programa */
                        return { /* regresa los valores necesarios */
                            id: val.id,
                            title: val.programa.Nombre,
                            startDate: hora_inicio.toDate(),
                            endDate: hora_final.toDate(),
                        };
                    });
                    programas = programas.concat(local_programs); /* concatena array del dia con el array general */
                }
                if (day !== 'id') index++; /* aumenta index */
            }
            let newCurrentDate = momentDate.toDate(); /* cambio de moment a date para actualizar el current date a lunex */
            /* cambiar fecha inicio y final */
            return { programas, newCurrentDate, idProgramacion } /* regresa array de programas fecha actual y el id en caso de ser update */
        } catch (e) {
            console.log(e);
            strapi.notification.error(`${e}`);
        }
        return [];
    };


    render() {
        const {
            currentDate,
            data,
            addedAppointment,
            appointmentChanges,
            editingAppointment,
            editingFormVisible,
            confirmationVisible,
            startDayHour,
            endDayHour,
        } = this.state;
        const { classes } = this.props;
        return (
            <div className={"col-12"}>
                <Row className="row">
                    <Block
                        title="Programacion"
                        description="Añade y/o elimina programas del horario"
                    >
                        <Fab
                            color="secondary"
                            onClick={() => {
                                this.setState({ editingFormVisible: true });
                                this.changeEditingAppointment(undefined);
                                this.changeAddedAppointment({
                                    startDate: new Date(currentDate).setHours(startDayHour),
                                    endDate: new Date(currentDate).setHours(startDayHour + 1),
                                });
                            }}
                            className={classes.fab}
                        >
                            <AddIcon className={classes.addIcon} />
                        </Fab>
                        <Scheduler
                            data={data}
                            height={800}
                            firstDayOfWeek={1}
                        >
                            <ViewState
                                currentDate={currentDate}
                                onCurrentDateChange={this.currentDateChange}
                            />
                            <EditingState
                                onCommitChanges={this.commitChanges}
                                addedAppointment={addedAppointment}
                                onAddedAppointmentChange={this.changeAddedAppointment}

                                appointmentChanges={appointmentChanges}
                                onAppointmentChangesChange={this.changeAppointmentChanges}

                                editingAppointment={editingAppointment}
                                onEditingAppointmentChange={this.changeEditingAppointment}
                            />
                            <WeekView
                                startDayHour={0}
                                endDayHour={24}
                            />
                            <Toolbar />
                            <DateNavigator />
                            <EditRecurrenceMenu />
                            <Appointments
                                appointmentComponent={Appointment}
                            />
                            <AppointmentTooltip
                                showOpenButton
                                showCloseButton
                                showDeleteButton
                            />
                            <AppointmentForm
                                overlayComponent={this.appointmentForm}
                                visible={editingFormVisible}
                                onVisibilityChange={this.toggleEditingFormVisibility}
                            />
                            <DragDropProvider />
                        </Scheduler>
                    </Block>
                </Row>
            </div>
        );
    }
}

export default withStyles(styles, { name: 'ScheduleForm' })(ScheduleForm);