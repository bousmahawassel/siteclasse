import React, {Component} from 'react';
import Row from "./TimeTableRow";
import auth_axios from '../../utils/axios';
import './TimeTable.css';
import {ButtonGroup, Button, DropdownButton, Dropdown, Alert} from 'react-bootstrap'

class TimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edt:[],
            week: Number(props.location.pathname.substring(11))
        }
    }
    componentDidMount() {
        this.loadEdt()
    }
    async loadEdt() {
        try {
            const promise = await auth_axios.get("/infos/edt");
            if (promise === "Not authenticated") {
                this.props.history.push("/auth")
            } else {
                const status = promise.status;
                if (status === 200) {
                    let edt = promise.data;
                    this.setState({edt: edt})
                }
            }
        } catch(e) {
            console.log(e);
            if (e.response.status === 401) {
                this.props.history.push("/auth");
            }
        }
    }
    genEdt = () => {
        this.props.history.push("/reload/infos/edt");
    };
    Edt1 = () => {
        this.props.history.push("/reload/infos/edt/1");
    };
    Edt2 = () => {
        this.props.history.push("/reload/infos/edt/2");
    };
    render() {
        let edt = this.state.edt;
        if (this.state.week) {
            console.log(edt);
            edt = edt.filter((hour) => {
                return hour.week === 0 || hour.week === this.state.week
            });
            edt = edt.map((hour) => {
                hour.week = undefined;
                return hour
            })
        }
        edt.sort((a, b) => {
            if (a.day === b.day) {
                if (a.hour === b.hour) {
                    return a.week - b.week
                }
                return a.hour - b.hour
            }
            return a.day - b.day
        });
        return (
            <div className="center-very-big-div">
                <div className="center-big-div">
                    <ButtonGroup>
                        <Button onClick={() => {this.props.history.push("/infos/daily_edt")}}>Emploi du temps du jour</Button>
                        <DropdownButton as={ButtonGroup} title="emploi du temps de la semaine">
                            <Dropdown.Item as={Button} onClick={this.genEdt}>Emploi du temps général</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Button} onClick={this.Edt1}>Emploi du temps de semaine 1</Dropdown.Item>
                            <Dropdown.Item as={Button} onClick={this.Edt2}>Emploi du temps de semaine 2</Dropdown.Item>
                        </DropdownButton>
                    </ButtonGroup>
                </div>
                <br/>
                <br/>
                <Alert variant="info" className="text-center">
                    Emploi du temps {this.state.week ? `de semaine ${this.state.week}` : ""}
                </Alert>
                <br/>
                <div className="edttable" id="edttable">
                    <Row edt={edt.filter(hour => hour.day === 1)} day={1}/>
                    <Row edt={edt.filter(hour => hour.day === 2)} day={2}/>
                    <Row edt={edt.filter(hour => hour.day === 3)} day={3}/>
                    <Row edt={edt.filter(hour => hour.day === 4)} day={4}/>
                    <Row edt={edt.filter(hour => hour.day === 5)} day={5}/>
                </div>
            </div>
        )
    }
}

export default TimeTable