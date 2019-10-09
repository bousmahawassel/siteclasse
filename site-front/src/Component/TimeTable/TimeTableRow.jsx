import React from 'react';
import PropTypes from 'prop-types';

export default function Row(props) {
    //let hour;
    let edt = props.edt;
    return (
        <div className="column">
            {edt.map((hour) => (
                <div key={hour.id} className="row" style={{height: `${hour.duration * 150}px`}}>
                    {
                        (
                            hour.subject &&
                            (<p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>)
                        ) ||
                        (
                            <p>Étude</p>
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