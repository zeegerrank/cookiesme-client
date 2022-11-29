// import logo from './logo.svg';
import "./App.css";
import { Container, Nav, Navbar } from "react-bootstrap";

function App() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>CookiesMe</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/login">Log in</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default App;
