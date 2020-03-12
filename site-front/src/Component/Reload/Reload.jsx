import React from 'react'
import {Redirect} from 'react-router-dom'

export default function Reload(props) {
    return (<Redirect to={props.location.pathname.substring(7)}/>)
}