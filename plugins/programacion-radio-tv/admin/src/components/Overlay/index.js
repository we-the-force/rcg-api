import React, { Component, Fragment } from "react";
import { request } from "strapi-helper-plugin";
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import CalendarToday from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Create from '@material-ui/icons/Create';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import MomentUtils from '@date-io/moment';
import Row from "../Row";
import Block from "../Block";

const containerStyles = theme => ({
    container: {
        width: theme.spacing(68),
        padding: 0,
        paddingBottom: theme.spacing(2),
    },
    content: {
        padding: theme.spacing(2),
        paddingTop: 0,
    },
    header: {
        overflow: 'hidden',
        paddingTop: theme.spacing(0.5),
    },
    closeButton: {
        float: 'right',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
    },
    button: {
        marginLeft: theme.spacing(2),
    },
    picker: {
        marginRight: theme.spacing(2),
        '&:last-child': {
            marginRight: 0,
        },
        width: '50%',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 0),
    },
    icon: {
        margin: theme.spacing(2, 0),
        marginRight: theme.spacing(2),
    },
    textField: {
        width: '100%',
    },
});

class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointmentChanges: {},
            programs: [],
            programSelected: null,
        };
    }

    componentDidMount() {
        /* traer programas cuando cargue */
        this.getPrograms().then(res => {
            const { programs } = res;
            this.setState({
                programs
            });
        });
    }

    /* traer los programas */
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

    /* obtiene los datos del appointment de los props */
    getAppointmentData = () => {
        const { appointmentData } = this.props;
        return appointmentData;
    };

    /* obtiene los cambios del appointment de los props */
    getAppointmentChanges = () => {
        const { appointmentChanges } = this.state;
        return appointmentChanges;
    };

    /* actualiza los cambios del appointment sin commitear */
    changeAppointment = ({ field, changes }) => {
        const nextChanges = {
            ...this.getAppointmentChanges(),
            [field]: changes,
        };
        this.setState({
            appointmentChanges: nextChanges,
        });
    }

    /* commitea appointment */
    commitAppointment = (type) => {
        const { commitChanges } = this.props;
        const appointment = {
            ...this.getAppointmentData(),
            ...this.getAppointmentChanges(),
        };
        let valid_base = x => x !== undefined && x !== null && x !== '';
        let valid = valid_base(appointment.title) && valid_base(appointment.startDate) && valid_base(appointment.endDate);
        if (valid) {
            if (type === 'deleted') {
                commitChanges({ [type]: appointment.id });
            } else if (type === 'changed') {
                commitChanges({ [type]: { [appointment.id]: appointment } });
            } else {
                commitChanges({ [type]: appointment });
            }
            this.setState({
                appointmentChanges: {},
            });
        } else {
            strapi.notification.error('Error: Faltan algunos datos');
        }
    }

    render() {
        const {
            classes,
            visible,
            visibleChange,
            appointmentData,
            cancelAppointment,
            target,
            onHide,
        } = this.props;
        const { appointmentChanges, programs } = this.state;

        const displayAppointmentData = {
            ...appointmentData,
            ...appointmentChanges,
        };

        const isNewAppointment = appointmentData.id === undefined;
        const applyChanges = isNewAppointment
            ? () => this.commitAppointment('added')
            : () => this.commitAppointment('changed');

        const SelectProps = field => ({
            variant: 'outlined',
            onChange: ({ target: change }) => {
                let program = this.state.programs.find(prog => {
                    return prog.text === change.value
                });
                this.setState({
                    programSelected: program.id,
                });
                this.changeAppointment({
                    field: [field], changes: change.value,
                });
            },
            value: displayAppointmentData[field] || '',
            label: field[0].toUpperCase() + field.slice(1),
            className: classes.textField,
        });

        const pickerEditorProps = field => ({
            className: classes.picker,
            ampm: false,
            value: displayAppointmentData[field],
            onChange: date => this.changeAppointment({
                field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
            }),
            inputVariant: 'outlined',
            format: 'DD/MM/YYYY HH:mm',
            onError: () => null,
        });

        const cancelChanges = () => {
            this.setState({
                appointmentChanges: {},
            });
            visibleChange();
            cancelAppointment();
        };

        return (
            <AppointmentForm.Overlay
                visible={visible}
                target={target}
                fullSize={false}
                onHide={onHide}
            >
                <div>
                    <div className={classes.header}>
                        <IconButton
                            className={classes.closeButton}
                            onClick={cancelChanges}
                        >
                            <Close color="action" />
                        </IconButton>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.wrapper}>
                            <Create className={classes.icon} color="action" />
                            <Select
                                {...SelectProps('title')}
                            >
                                {programs.map((val, i) => {
                                    return (<MenuItem key={i} value={val.text}>{val.text}</MenuItem>);
                                })}
                            </Select>
                        </div>
                        <div className={classes.wrapper}>
                            <CalendarToday className={classes.icon} color="action" />
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDateTimePicker
                                    label="Start Date"
                                    {...pickerEditorProps('startDate')}
                                />
                                <KeyboardDateTimePicker
                                    label="End Date"
                                    {...pickerEditorProps('endDate')}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                    <div className={classes.buttonGroup}>
                        {!isNewAppointment && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.button}
                                onClick={() => {
                                    visibleChange();
                                    this.commitAppointment('deleted');
                                }}
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                visibleChange();
                                applyChanges();
                            }}
                        >
                            {isNewAppointment ? 'Create' : 'Save'}
                        </Button>
                    </div>
                </div>
            </AppointmentForm.Overlay>
        );
    }


    /* componentDidMount() {
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
    } */
}

export default withStyles(containerStyles, { name: 'AppointmentFormContainer' })(Overlay);