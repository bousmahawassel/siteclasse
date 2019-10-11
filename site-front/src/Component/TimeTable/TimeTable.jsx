import React, {Component} from 'react';
import axios from "axios";
import Row from "./TimeTableRow";
import './TimeTable.css'

class TimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {edt:[]}
    }
    componentDidMount() {
        this.loadEdt()
    }
    async loadEdt() {
        const promise = await axios.get("http://localhost:8000/infos/edt");
        const status = promise.status;
        if (status === 200) {
            let edt = promise.data;
            this.setState({edt: edt})
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
        return (
            <div className="table">
                <Row edt={edt.filter(hour => hour.day === 1)} day={0}/>
                <Row edt={edt.filter(hour => hour.day === 2)} day={1}/>
                <Row edt={edt.filter(hour => hour.day === 3)} day={2}/>
                <Row edt={edt.filter(hour => hour.day === 4)} day={3}/>
                <Row edt={edt.filter(hour => hour.day === 5)} day={4}/>
            </div>
        )
    }
}

export default TimeTable