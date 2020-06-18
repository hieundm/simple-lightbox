import React from 'react';
import { Button , Col, Container, Row, Navbar } from 'react-bootstrap';
import SimpleLightbox from './components/simple-lightbox';
import './App.css';
import './components/simple-lightbox/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from "./logo.svg";

function App() {

  const [canShow, setCanShow] = React.useState(false);

  const onClickToogle = () => {
    setCanShow(!canShow);
  }

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        Simple Lightbox
      </Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col md={12}>
            <Button variant="primary" onClick={() => onClickToogle()}>Click me :D</Button>
            <SimpleLightbox canShow={canShow} onClose={() => onClickToogle()}/>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
