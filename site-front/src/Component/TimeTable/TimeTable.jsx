import React, {Component} from 'react';
import Row from "./TimeTableRow";
import auth_axios from '../../utils/axios';
import './TimeTable.css'
import {Redirect}  from 'react-router-dom'
import * as constants from '../../utils/constants'

class TimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edt:[],
            notAuthenticated: false
        }
    }
    componentDidMount() {
        this.loadEdt()
    }
    async loadEdt() {
        try {
            const promise = await auth_axios.get(constants.BACKEND_SERVER + "/infos/edt");
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
        if (!this.state.notAuthenticated) {
            return (
                <div className="table">
                    <Row edt={edt.filter(hour => hour.day === 1)} day={0}/>
                    <Row edt={edt.filter(hour => hour.day === 2)} day={1}/>
                    <Row edt={edt.filter(hour => hour.day === 3)} day={2}/>
                    <Row edt={edt.filter(hour => hour.day === 4)} day={3}/>
                    <Row edt={edt.filter(hour => hour.day === 5)} day={4}/>
                </div>
            )
        } else {
            return (<Redirect to="/auth/"/>)
        }
    }
}

export default TimeTable