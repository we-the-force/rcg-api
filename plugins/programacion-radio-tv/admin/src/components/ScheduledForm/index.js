import React, { Component } from "react";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import Block from "../Block";
import Row from "../Row";

const currentDate = '2018-11-01';
const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

class ScheduleForm extends Component {
    state = {
    };
    render() {
        return (
            <div className={"col-12"}>
                <Row className={"row"}>
                    <Block
                        title="Programacion"
                        description="Añade y/o elimina programas del horario"
                    >
                        <Scheduler
                            data={schedulerData}
                        >
                            <ViewState
                                currentDate={currentDate}
                            />
                            <DayView
                                startDayHour={9}
                                endDayHour={14}
                            />
                            <Appointments />
                        </Scheduler>
                    </Block>
                </Row>
            </div>
        );
    }
}

export default ScheduleForm;