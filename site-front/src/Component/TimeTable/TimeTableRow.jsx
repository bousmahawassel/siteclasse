import React from 'react';
import PropTypes from 'prop-types';

export default function Row(props) {
    //let hour;
    let edt = props.edt;
    let day = props.day;
    return (
        <div className="column">
            <div className="hrow"><p>{["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"][day]}</p></div>
            {edt.map((hour) => (
                <div key={hour.id} className={"row" + (hour.subject ? "" : " empty")} style={
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
};

Row.propTypes = {
    edt: PropTypes.array.isRequired,
    day: PropTypes.number.isRequired,
};