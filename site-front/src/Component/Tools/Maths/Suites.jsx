import React, {Component} from 'react'
import auth_axios from '../../../utils/axios'

export default class Suite extends Component {
    constructor(props) {
        super();
        this.state = {
            raison: 0,
            u0: 0,
            values: {
                value1: {
                    rang: 0,
                    value: 0,
                },
                value2: {
                    rang: 0,
                    value: 0,
                }
            },
            n: 0
        }
    }

    render() {
        return (
            <div>
                <form>
                    <p>
                        Trouver une suite arithmétique à partir de 2 couples rang-valeurs
                        <br/>
                        <br/>
                        <label>
                            Première valeur :&emsp;
                            <input type="number" placeholder="Rang" value={this.state.values.value1.rang}/>&emsp;
                            <input type="number" placeholder="Valeur" value={this.state.values.value1.value}/>
                        </label>
                        <br/>
                        <br/>
                        <label>
                            Deuxième valeur :&emsp;
                            <input type="number" placeholder="Rang" value={this.state.values.value2.rang}/>&emsp;
                            <input type="number" placeholder="Valeur" value={this.state.values.value2.value}/>
                        </label>
                        <br/>
                        <br/>
                        <input type="submit" placeholder="Déterminer la suite"/>
                    </p>
                </form>
            </div>
        )
    }
}