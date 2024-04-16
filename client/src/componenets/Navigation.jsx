import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUp from "./SignUp";
import Login from "./Login";
import Auth from "../utils/auth";

const Navigation = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <nav>
      <header>
        <h1>Peer Prep</h1>
      </header>
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
              <Nav className="ml-auto d-flex">
              <Nav.Link as={Link} to='/sessions'>
                Sessions
              </Nav.Link>
                {/* if user is logged in show saved books and logout */}
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link as={Link} to="/savedsessions">
                      Saved Sessions
                    </Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>
                    Login/Sign Up
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* set modal data up */}
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="signup-modal"
        >
          {/* tab container to do either signup or login component */}
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="signup-modal">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey="login">
                  <Login handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <SignUp handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </>
    </nav>
  );
};

export default Navigation;