import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Nav, Card, NavDropdown, Button} from 'react-bootstrap'
import * as constants from '../../utils/constants'
import auth_axios from "../../utils/axios"
export default class Forums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.token,
            student_pseudo: "Wassel",
            students: [{"pseudo": "was", "is_active": true, "name": "Wassel Bousmaha", "status": "super_admin"}],
            forum: props.location.pathname.substring(8),
            forums: {
                "Général": {
                    "general": "Général",
                    "divers": "Divers"
                },
                "Sciences": {
                    "maths": "Maths",
                    "es": "Enseignement Scientifique",
                    "physique": "Physique-chimie",
                    "ben": "Physique (Ben Belkacem)",
                    "bernaud": "Physique (Bernaud)",
                    "svt": "SVT",
                    "nsi": "NSI",
                },
                "Littéraire": {
                    "francais": "Français",
                "hg": "Histoire-Géo",
                "lva":"Anglais",
                "espagnol": "Espagnol",
                "allemand": "Allemand",
                "chinois": "Chinois",
                "italien": "Italien",
                "latin": "latin"
                }
            },
            temp_forums: {},
            "messages": [],
        };
        this.URL = constants.BACKEND_WS + "/forums/" + this.state.forum + "/";
    }
    async componentDidMount() {
        let response = await auth_axios.get("/forums/get_messages");
        let token = response.data.token;
        console.log(response.data.messages);
        this.setState({"messages": response.data.messages});
        this.ws = new WebSocket(this.URL + token);
        this.ws.onopen = () => {
            console.log('connected')
        };

        this.ws.onmessage = evt => {
            const message = JSON.parse(evt.data);
            console.log(message);
            this.addMessage(message)
        };

        this.ws.onclose = () => {
            console.log('disconnected');
            this.setState({
                ws: new WebSocket(this.URL),
            })
        }
    }
    addMessage(message) {
        if (message.message.forum ===this.state.forum) {
            this.setState({messages: [...this.state.messages, message.message]})
        }
    }
    putAuthor = (message, index) => {
        return !(this.state.token === message.author ||
            Object.assign({}, this.state.messages[index - 1]).author === message.author)
    };
    onSubmit = () => {
        let text = document.getElementById("text_input").value;
        let message = {
            message: {
                pseudo: this.state.student_pseudo,
                message: text,
                date: new Date(),
                author: this.state.token,
                forum: this.state.forum
            },
            type: "chat_message"
        };
        this.ws.send(JSON.stringify(message))
    };
    changeForum = (event) => {
        this.props.history.push(`/forums/${event.target.id}`);
        this.setState({forum: event.target.id})
    };
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={4}>
                        {
                            this.state.students.map((student) => (
                                <Card className="text-center" key={student.name}>
                                    <Card.Header>{student.pseudo}</Card.Header>
                                    <Card.Body>
                                        {
                                            (student.is_active && (<Card.Text>Connecté</Card.Text>))
                                            || (<Card.Text>Dernière connexion : {student.last_co}</Card.Text>)
                                        }
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                        Nom: {student.name}<br/>
                                        Statut: {student.status}
                                        </Card.Footer>
                                </Card>
                            ))
                        }
                    </Col>
                    <Col xs={8}>
                        <Row>
                            <Col>
                                <Nav variant="tabs" justify defaultActiveKey={this.state.forum}>
                                    {Object.entries(this.state.forums).map((categorie) => (
                                        <NavDropdown title={categorie[0]} key={categorie[0]}>
                                            {Object.entries(categorie[1]).map((forum) => (
                                                <Nav.Item key={forum[0]}>
                                                    <Button id={forum[0]} to={`/forums/${forum[0]}`}
                                                            onClick={this.changeForum}>
                                                        {forum[1]}
                                                    </Button>
                                                </Nav.Item>
                                            ))}
                                        </NavDropdown>
                                    ))}
                                    <NavDropdown title="Forums temporaires">
                                        {
                                            Object.entries(this.state.temp_forums).map((forum) => (
                                                <Nav.Item key={forum[0]}>
                                                    <Nav.Link eventKey={forum[0]} as={Link}
                                                              to={`/forums/temp/${forum[0]}`}>
                                                        {forum[1]}
                                                    </Nav.Link>
                                                </Nav.Item>
                                            ))
                                        }
                                    </NavDropdown>
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                {this.state.messages.map((message, index) => {
                                    return message.forum === this.state.forum && (
                                    <Row key={message.date}>
                                        <Col xs={{span: 6, offset: message.author===this.state.token && 6}}>
                                            <Card>
                                                {
                                                    this.putAuthor(message, index) &&
                                                    <Card.Header style={{"padding": 0}}>{message.pseudo}</Card.Header>
                                                }
                                                <Card.Body style={{"padding": 0}}>{message.message}</Card.Body>
                                                <Card.Footer style={{"padding": 0}} className="text-muted">
                                                    {message.date}
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    </Row>
                                )})}
                                <Row>
                                    <Col xs={10}>
                                        <textarea id="text_input" style={{width: "100%"}} placeholder="Envoyer un message..."/>
                                    </Col>
                                    <Col xs={2}>
                                        <Button onClick={this.onSubmit}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>)
    }
}