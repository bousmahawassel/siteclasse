import React, {Component} from 'react';
import axios from "axios";
import Table from "react-bootstrap/Table"
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
            if (a.hour === b.hour) {
                if (a.day === b.day) {
                    return a.week - b.week
                }
                return a.day - b.day
            }
            return a.hour - b.hour
        });
        let hour;
        return (
            <Table striped bordered hover>
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
                    <Row edt={edt} hour={8}/>
                    <br/>
                    <Row edt={edt} hour={9}/>
                    <br/>
                    <Row edt={edt} hour={10}/>
                    <br/>
                    <Row edt={edt} hour={11}/>
                    <br/>
                    <Row edt={edt} hour={11.5}/>
                    <br/>
                    <Row edt={edt} hour={12}/>
                    <br/>
                    <Row edt={edt} hour={13}/>
                    <br/>
                    <Row edt={edt} hour={14}/>
                    <br/>
                    <Row edt={edt} hour={15}/>
                    <br/>
                    <Row edt={edt} hour={16}/>
                    <br/>
                    <Row edt={edt} hour={17}/>
                </tbody>
            </Table>
        )
    }
}

export default TimeTable