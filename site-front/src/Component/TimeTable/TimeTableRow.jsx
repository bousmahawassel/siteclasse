import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row as BRow} from 'react-bootstrap'

export default class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edt: props.edt,
            day: props.day,
            days: ["Dimanche","Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
        }
    }
    render() {
        return (
            <Col>
                <BRow className="hrow"><Col><p className="text-center">{this.state.days[this.props.day]}</p></Col></BRow>
                {
                    this.props.edt.map((hour) => (
                        (
                            !hour.hours &&
                            (
                                <BRow key={hour.id} className={!hour.week && "edtrow"}
                                      style={{height: `${hour.duration * 150 + (hour.duration - 1) * 2}px`}}
                                >
                                    <Col xs={hour.week ? 6 : 12} className={hour.week && "edtrow"}>
                                        {hour.subject && (
                                            <p className="text-center">
                                                {hour.subject}<br/>{hour.teacher}<br/>{hour.room}
                                            </p>
                                        )}
                                    </Col>
                                </BRow>
                            )
                        )) ||
                        (
                            hour.hours &&
                            (
                                <BRow key={hour.id} style={{height: `${hour.duration * 150 + (hour.duration - 1) * 2}px`}}>
                                    {
                                        hour.hours.map((microHour) => (
                                            <Col key={microHour.id} xs={6} className="edtrow">
                                                <p className="text-center">
                                                    {microHour.subject}<br/>{microHour.teacher}<br/>{microHour.room}
                                                </p>
                                            </Col>
                                        ))
                                    }
                                </BRow>
                            )

                        )
                    )
                }
            </Col>
        )
    }
};

Row.propTypes = {
    edt: PropTypes.array.isRequired,
    day: PropTypes.number.isRequired,
};