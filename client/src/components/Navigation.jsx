import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUp from "./SignUp";
import Login from "./Login";
import Auth from "../utils/auth";
import iconImage from "../../public/assets/pp_icon.jpg";
<style>
@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300..900&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <nav>
        
      <>
        <Navbar id="navigation-bar" expand="lg">
          <div id="icon-title-group">

              <img id="icon" src={iconImage}/>

              <h1 id="site-title">Peer Prep</h1>   

          </div>
          <Navbar.Toggle aria-controls='navbar' />
            <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
              <Nav className="ml-auto d-flex">
              <Nav.Link as={Link} to='/'>
                Explore Sessions
              </Nav.Link>
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link as={Link} to="/mysessions">
                      My Sessions
                    </Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>
                    Login/Sign Up
                  </Nav.Link>
                )}   
          </div>      

        </Navbar>
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="signup-modal"
        >
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