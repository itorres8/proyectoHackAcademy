import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";



function NavScrollExample() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  console.log(user);

  

  const userLogout = () => {
    dispatch(logout())
  }
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        
        <Navbar.Brand as={Link} to="/">
          Hack Plus
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="success">
                <i className="bi bi-search"></i>
              </Button>
            </Form>

            
            { user.token !=="" ?<NavDropdown title="Perfil" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Suscripción</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={userLogout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
            :<Nav.Link
            as={Link}
            to="/login"
            className="d-flex align-items-center"
          >Iniciar sesión
          </Nav.Link>
          }

            
            <Nav.Link
              as={Link}
              to="/cart"
              className="d-flex align-items-center"
            >
              Carrito
              {cartItems?.length > 0 && (
                <span className="badge bg-secondary ms-2">
                  {cartItems?.length}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
