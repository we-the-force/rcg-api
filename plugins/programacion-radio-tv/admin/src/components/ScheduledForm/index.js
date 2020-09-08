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
import { appointments } from './demo/appointments';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Overlay from '../Overlay';
import Block from "../Block";
import moment from 'moment';
import Row from "../Row";

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
            data: appointments,/* aqui tengo que traer la programacion */
            currentDate: new Date('2020-10-04'),/* obtener el dia actual incluir moment */

            startDayHour: 9,/* cambiar a hora inicial */
            endDayHour: 19,/* cambiar a hora final */

            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,

            editingFormVisible: false,/* dicta si el form se ve o no */
            previousAppointment: undefined,
            isNewAppointment: false,
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
    currentDateChange = (currentDate) => { this.setState({ currentDate }); };

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
    commitChanges = ({ added, changed, deleted }) => {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                this.validateDates(added);
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                this.validateDates(changed);
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
    }

    validateDates = values => {
        console.log(values);
        this.state.data.every((value, index, array) => {
            console.log(value);
        });
    }

    componentDidMount() {
        /* aqui traigo data */
        console.log(this.state.currentDate);
        console.log(this.props.channelId);
        /* this.getData().then(res => {
            const { data } = res;
            this.setState({
                data
            });
        }); */
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
                                startDayHour={9}
                                endDayHour={17}
                            />
                            <Toolbar />
                            <DateNavigator />
                            <TodayButton />
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