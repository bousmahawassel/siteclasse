import React, {Component} from 'react'
import Row from './TimeTableRow'
import './TimeTable.css'
import auth_axios from '../../utils/axios'
import * as moment from 'moment'
import {ButtonGroup, Button, Alert, Dropdown, DropdownButton} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class Edt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notAuthenticated: false,
            edt: []
        }
    }
    componentDidMount() {
        this.loadEdt()
    }
    async loadEdt() {
        try {
            const promise = await auth_axios.get("/infos/edt");
            if (promise === "Not authenticated") {
                this.setState({notAuthenticated: true})
            } else {
                const status = promise.status;
                if (status === 200) {
                    let edt = promise.data;
                    this.setState({edt: edt})
                }
            }
        } catch(e) {
            if (e.response.status === 401) {
                this.setState({notAuthenticated: true})
            }
        }
    }
    render() {
        let edt = this.state.edt;
        edt.sort((a, b) => {
            if (a.day === b.day) {
                if (a.hour === b.hour) {
                    return a.week - b.week
                }
                return a.hour - b.hour
            }
            return a.day - b.day
        });
        let week = moment().week() % 2 + 1;
        edt = edt.filter((hour) => {
            return (hour.day === moment().day()) && (hour.week !== week || hour.week === 0)
        });
        edt = edt.map((hour) => {
            hour.week = undefined;
            return hour
        });
        return (
            <div className="center-big-div">
                <ButtonGroup>
                    <Button onClick={() => {this.props.history.push("/infos/daily_edt")}}>Emploi du temps du jour</Button>
                    <DropdownButton as={ButtonGroup} title="emploi du temps de la semaine">
                        <Dropdown.Item as={Link} to="/infos/edt">Emploi du temps général</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to="/infos/edt/1">Emploi du temps de semaine 1</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/infos/edt/2">Emploi du temps de semaine 2</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                <br/>
                <br/>
                <Alert variant="info" className="text-center">
                    Emploi du temps du {
                        ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"][moment().day()- 1]
                    } de semaine {week}
                </Alert>
                <br/>
                <div className="center-div">
                    <Row edt={edt} day={moment().day() - 1}/>
                </div>
            </div>
        )
    }
}