import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default function Row(props) {
    let hour;
    console.log(props.edt);
    return (
        <div className="column">
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 8 && hour.day === 1})`)
                    &&
                    ((hour.subject && (
                        <div style={{height:hour.duration * 10}}>
                            <p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>
                        </div>
                    )) || (<div style={{height:hour.duration * 10}}/>))
                ) ||
                (<></>)
            }
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === ${props.hour} && hour.day === 2})`)
                    &&
                    ((hour.subject && (
                        <div style={{height:hour.duration * 10}}>
                            <p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>
                        </div>
                    )) || (<div style={{height:hour.duration * 10}}/>))
                ) ||
                (<></>)
            }
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === ${props.hour} && hour.day === 3})`)
                    &&
                    ((hour.subject && (
                        <div style={{height:hour.duration * 10}}>
                            <p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>
                        </div>
                    )) || (<div style={{height:hour.duration * 10}}/>))
                ) ||
                (<></>)
            }
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === ${props.hour} && hour.day === 4})`)
                    &&
                    ((hour.subject && (
                        <div style={{height:hour.duration * 10}}>
                            <p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>
                        </div>
                    )) || (<div style={{height:hour.duration * 10}}/>))
                ) ||
                (<></>)
            }
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === ${props.hour} && hour.day === 5})`)
                    &&
                    ((hour.subject && (
                        <div style={{height:hour.duration * 10}}>
                            <p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>
                        </div>
                    )) || (<div style={{height: hour.duration * 10}} />))
                ) ||
                (<></>)
            }
        </div>
    )
}

Row.propTypes = {
    edt: PropTypes.array.isRequired,
    hour: PropTypes.number.isRequired,
};