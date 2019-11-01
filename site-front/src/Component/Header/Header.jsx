import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Container, NavbarBrand, Nav, NavDropdown} from 'react-bootstrap'

const Header = (props) => {
    return (
        <Navbar expand="xl" bg="dark" variant="dark">
            <Container>
                <NavbarBrand as={Link} to="/">Le site des 1<sup>ère</sup> 5</NavbarBrand>
                <Navbar.Toggle data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </Navbar.Toggle>
                <Navbar.Collapse id="navbarResponsive">
                    <Nav className="ml-auto">
                        <Nav.Link className="text-nowrap" as={Link} id="link" to="/">Page d'accueil</Nav.Link>
                        <NavDropdown title="infos">
                            <NavDropdown.Item as={Link} to="infos/edt">Emplois du temps</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="infos/docs" disabled>Documents à rendre (pas encore disponible)</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="infos/vie_scolaire" disabled>Infos Vie scolaire (pas encore disponible)</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="infos/devoirs" disabled>Devoirs (pas encore disponible)</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Cours (pas encore disponible)" disabled/>
                        {/*<NavDropdown title="Cours">
                            <NavDropdown.Item>
                                <Nav.Link as={Link} href="/edt/infos">Emplois du temps</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Nav.Link as={Link}>Documents à rendre (pas encore disponible)</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Nav.Link as={Link}>Infos Vie scolaire (pas encore disponible)</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Nav.Link as={Link}>Devoirs (pas encore disponible)</Nav.Link>
                            </NavDropdown.Item>
                        </NavDropdown>*/}
                        <NavDropdown title="Travaux de groupe (pas encore disponible)" disabled/>
                        <NavDropdown title="Discussions (pas encore disponible)" disabled/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};
export default Header