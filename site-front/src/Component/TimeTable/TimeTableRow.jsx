import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edt: props.edt,
            day: props.day,
            days: ["dimanche","Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "samedi"]
        }
    }
    render() {
        return (
            <div className={`edtcolumn ${this.props.className}`}>
                <div className="hrow"><p>{this.state.days[this.props.day]}</p></div>
                {this.props.edt.map((hour) => (
                    <div key={hour.id} className={"edtrow" + (hour.subject ? "" : " empty")} style={
                        {
                            height: `${hour.duration * 125 + (hour.duration - 1) * 2}px`,
                            width: hour.week ? "148px" : "299px",
                            fontSize: hour.week ? "7px" : "14px",
                        }
                    }>
                        {
                            (
                                hour.subject &&
                                (<p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>)
                            )
                        }
                    </div>
                ))}
            </div>
        )
    }
};

Row.propTypes = {
    edt: PropTypes.array.isRequired,
    day: PropTypes.number.isRequired,
};