import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {Container, Row, Col, Image, Card, Button} from 'react-bootstrap';
import logo from '../../Logo_classe.png'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            importantMessage: {
                show: false,
                message: ""
            },
            infos: {
                nb: 0,
                info1: {
                    show: false,
                    title: "",
                    message: ""
                },
                info2: {
                    show: false,
                    title: "",
                    message: ""
                },
                info3: {
                    show: false,
                    title: "",
                    message: ""
                }
            }
        }
    }
    render() {
        if (!localStorage.getItem("token")) {
            return (
                <Redirect to="/auth"/>
            )
        } else {
            return (
                <Container>
                    <Row className="align-items-center my-5">
                        <Col lg={7}>
                            <Image fluid rounded className="mb-4 mb-lg-0" src={logo} alt="logo de la classe"/>
                        </Col>
                        <Col lg={5}>
                            <h1 className="font-weight-light">Le site de la classe des 1ère 5 de Saint-Pierre Fourier
                                !</h1>
                            <p>Voici le site que j'ai fait pour notre classe. Pour l'instant, il gère:</p>
                            <ul>
                                <li><Link to="/infos/edt">Les emplois du temps</Link></li>
                                <li>
                                    Et c'est tout (j'ai pas eu le temps de faire le reste...). Mais ne vous
                                    inquiétez
                                    pas, d'autres fonctionnalités arriveront !
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Card hidden={!this.state.importantMessage.show} bg="secondary" text="white" className="my-5 py-4 text-center">
                        <Card.Body>
                            <p className="text-white m-0">{this.state.importantMessage.message}</p>
                        </Card.Body>
                    </Card>
                    <Row>
                        <Col md={
                            (this.state.infos.nb === 3 && 4) ||
                            (this.state.infos.nb === 2 && 6) ||
                            (this.state.infos.nb === 1 && 12)
                        } className="mb-5">
                            <Card hidden={!this.state.infos.info1.show} className="h-100">
                                <Card.Body>
                                    <Card.Title as="h2">{this.state.infos.info1.title}</Card.Title>
                                    <Card.Text>{this.state.infos.info1.message}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button as={Link} size="sm" to="/infos/info1" variant="primary">More Info</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col md={
                            (this.state.infos.nb === 3 && 4) ||
                            (this.state.infos.nb === 2 && 6) ||
                            (this.state.infos.nb === 1 && 12)
                        } className="mb-5">
                            <Card hidden={!this.state.infos.info2.show} className="h-100">
                                <Card.Body>
                                    <Card.Title as="h2">{this.state.infos.info2.title}</Card.Title>
                                    <Card.Text>{this.state.infos.info2.message}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button as={Link} size="sm" to="/infos/info3" variant="primary">More Info</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col md={
                            (this.state.infos.nb === 3 && 4) ||
                            (this.state.infos.nb === 2 && 6) ||
                            (this.state.infos.nb === 1 && 12)
                        } className="mb-5">
                            <Card hidden={!this.state.infos.info3.show} className="h-100">
                                <Card.Body>
                                    <Card.Title as="h2">{this.state.infos.info3.title}</Card.Title>
                                    <Card.Text>{this.state.infos.info3.message}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button as={Link} size="sm" to="/infos/info3" variant="primary">More Info</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
};

export default Home
