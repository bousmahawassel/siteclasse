import React, {Component} from 'react';
import axios from "axios";
import Row from "./TimeTableRow"

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
                if (a.day === b.day) {
                    return a.week - b.week
                }
                return a.day - b.day
            }
            return a.day - b.day
        });
        let day;
        return (
            <div>
                <thead>
                    <tr>
                        <th>Lundi</th>
                        <th>Mardi</th>
                        <th>Mercredi</th>
                        <th>Jeudi</th>
                        <th>Vendredi</th>
                    </tr>
                </thead>
                <tbody>
                    <Row edt={edt} day={1}/>
                    <br/>
                    <Row edt={edt} day={2}/>
                    <br/>
                    <Row edt={edt} day={3}/>
                    <br/>
                    <Row edt={edt} day={4}/>
                    <br/>
                    <Row edt={edt} day={5}/>
                </tbody>
            </e>
        )
    }
}

export default TimeTable