import "./App.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

// Import Pages
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar className="shadow-sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">CookiesMe</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Log in</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Pages Router */}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
