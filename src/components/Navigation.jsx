import "./navigation.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return ( 
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">Dinner Made Easy</Navbar.Brand> 
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Genesis</a>
                        </Navbar.Text>
                        <Nav className="mx-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link> 
                            <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
                            <Nav.Link as={Link} to="/meals">Meals</Nav.Link>
                            <Nav.Link as={Link} to="/list">List</Nav.Link>
                            <Nav.Link as={Link} to="/submit-recipe">Submit Recipe</Nav.Link>
                            <Nav.Link href="#bye">Sign Out</Nav.Link> 
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}



export default Navigation

