import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default function Row(props) {
    let hour;
    console.log(props.edt);
    return (
        <div className="column">
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 8 && hour.day === props.day})`)
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
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 9 && hour.day === props.day})`)
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
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 10 && hour.day === props.day})`)
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
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 11 && hour.day === props.day})`)
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
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 12 && hour.day === props.day})`)
                    &&
                    ((hour.subject && (
                        <div style={{height:hour.duration * 10}}>
                            <p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>
                        </div>
                    )) || (<div style={{height: hour.duration * 10}} />))
                ) ||
                (<></>)
            }
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 13 && hour.day === props.day})`)
                    &&
                    ((hour.subject && (
                        <div style={{height:hour.duration * 10}}>
                            <p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>
                        </div>
                    )) || (<div style={{height: hour.duration * 10}} />))
                ) ||
                (<></>)
            }
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 14 && hour.day === props.day})`)
                    &&
                    ((hour.subject && (
                        <div style={{height:hour.duration * 10}}>
                            <p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>
                        </div>
                    )) || (<div style={{height: hour.duration * 10}} />))
                ) ||
                (<></>)
            }
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 15 && hour.day === props.day})`)
                    &&
                    ((hour.subject && (
                        <div style={{height:hour.duration * 10}}>
                            <p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>
                        </div>
                    )) || (<div style={{height: hour.duration * 10}} />))
                ) ||
                (<></>)
            }
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 16 && hour.day === props.day})`)
                    &&
                    ((hour.subject && (
                        <div style={{height:hour.duration * 10}}>
                            <p>{hour.subject}<br/><br/>{hour.teacher}<br/><br/>{hour.room}</p>
                        </div>
                    )) || (<div style={{height: hour.duration * 10}} />))
                ) ||
                (<></>)
            }
            {
                (
                    eval(`hour = props.edt.find((hour) => {return hour.hour === 17 && hour.day === props.day})`)
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