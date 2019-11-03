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
                <BRow><Col><p className="text-center">{this.state.days[this.props.day]}</p></Col></BRow>
                {
                    this.props.edt.map((hour) => (
                        (!hour.week &&
                            (
                                <BRow key={hour.id} style={{height: `${hour.duration * 125 + (hour.duration - 1) * 2}px`}}>
                                    {
                                        hour.subject &&
                                        (
                                            <Col xs={hour.week ? 6 : 12}>
                                                <p className="text-center">
                                                    {hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}
                                                </p>
                                            </Col>
                                        )
                                    }
                                </BRow>
                            )
                        )) ||
                        (
                            hour.week === 2 &&
                            (
                                <Col key={hour.id} xs={6}>
                                    <p className="text-center">
                                        {hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}
                                    </p>
                                </Col>
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