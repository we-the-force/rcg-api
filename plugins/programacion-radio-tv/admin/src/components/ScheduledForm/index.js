import React, { Component, Fragment } from "react";
import { request } from "strapi-helper-plugin";
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
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
    Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { appointments } from './demo/appointments';
import BasicLayout from '../BasicLayout';
import Block from "../Block";
import Row from "../Row";

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

class ScheduleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: appointments,
            currentDate: new Date('2020-10-04'),


            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,
        };
    }

    currentDateChange = (currentDate) => { this.setState({ currentDate }); };

    changeAddedAppointment = (addedAppointment) => {
        console.log('adding');
        //console.log(addedAppointment);
        this.setState({ addedAppointment });
    }

    changeAppointmentChanges = (appointmentChanges) => {
        console.log('continuous editiong');
        //console.log(appointmentChanges);
        this.setState({ appointmentChanges });
    }

    changeEditingAppointment = (editingAppointment) => {
        console.log('start editing');
        //console.log(editingAppointment);
        this.setState({ editingAppointment });
    }

    commitChanges = ({ added, changed, deleted }) => {
        console.log('commit');
        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
    }

    render() {
        const {
            currentDate, data, addedAppointment, appointmentChanges, editingAppointment
        } = this.state;
        return (
            <div className={"col-12"}>
                <Row className="row">
                    <Block
                        title="Programacion"
                        description="Añade y/o elimina programas del horario"
                    >
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
                                basicLayoutComponent={BasicLayout}
                            />
                            <DragDropProvider />
                        </Scheduler>
                    </Block>
                </Row>
            </div>
        );
    }
}

export default ScheduleForm;