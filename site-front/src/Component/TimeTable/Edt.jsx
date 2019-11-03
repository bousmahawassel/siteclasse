import React, {Component} from 'react'
import Row from './TimeTableRow'
import './TimeTable.css'
import auth_axios from '../../utils/axios'
import * as moment from 'moment'
import {Alert} from 'react-bootstrap'

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
                <br/>
                <br/>
                <Alert variant="info" className="text-center">
                    Emploi du temps du {
                        ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"][moment().day()]
                    } de semaine {week}
                </Alert>
                <br/>
                <div className="center-div">
                    <Row edt={edt} day={moment().day()}/>
                </div>
            </div>
        )
    }
}