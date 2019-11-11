import React, {Component} from 'react'
import './TimeTable.css'
import * as moment from 'moment'
import {Alert, Row as BRow, Col} from 'react-bootstrap'

export default class Edt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notAuthenticated: false,
            edt: props.edt || []
        }
    }
    render() {
        let edt = this.props.edt;
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
            <>
                <Alert variant="info" className="text-center">
                    Emploi du temps du {
                        ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"][moment().day()]
                    } de semaine {week}
                </Alert>
                <BRow className="flex-nowrap" style={{overflow: "auto"}}>
                    <Col xs className="hrow">
                        <p className="text-center">
                            {["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"][moment().day()]}
                        </p>
                    </Col>
                    {
                        edt.map(
                            (hour) => (
                                <Col className={"edtrow" + (hour.subject ? "" : " empty")} xs key={hour.id}>
                                    {
                                        (hour.subject &&
                                            <p className="text-center">
                                                {hour.subject}<br/>{hour.teacher}<br/>{hour.room}
                                            </p>
                                        ) || <p className="empty" style={{color: "black"}}>Rien</p>
                                    }
                                </Col>
                            )
                        )
                    }
                </BRow>
            </>
        )
    }
}
