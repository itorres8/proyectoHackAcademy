import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { searchMovies } from "../Api/tmdbAPI";
import { useState } from "react";
import { NavLink } from 'react-router-dom';


function NavScrollExample() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para los resultados de búsqueda
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar la visibilidad del dropdown
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userState = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook de navegación

  const userLogout = () => {
    dispatch(logout());
    navigate('/');  // Redirige a la página de inicio
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Si hay texto en la búsqueda, realizar la búsqueda de películas
    if (query.trim()) {
      const fetchSearchResults = async () => {
        try {
          const results = await searchMovies(query);
          setSearchResults(results);
          setIsDropdownOpen(true); // Mostrar el dropdown si hay resultados
        } catch (err) {
          setSearchResults([]); // En caso de error, no mostrar resultados
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]); // Limpiar resultados si no hay búsqueda
      setIsDropdownOpen(false); // Ocultar el dropdown
    }
  };

  // Función para manejar el clic en un resultado
  const handleResultClick = (id) => {
    setIsDropdownOpen(false); // Cerrar el dropdown
    navigate(`/movie/${id}`); // Navegar a la página de detalles de la película
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Hack Plus
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange} // Actualizar estado de búsqueda
              />
              <Button variant="success" type="submit">
                <i className="bi bi-search"></i>
              </Button>

              {/* Si hay resultados de búsqueda, mostrar el dropdown */}
              {searchQuery && searchResults.length > 0 && isDropdownOpen && (
                <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: 1000, top: 50}}>
                  {searchResults.map((movie) => (
                    <Link
                      key={movie.id}
                      to="#"
                      className="dropdown-item"
                      onClick={() => handleResultClick(movie.id)} // Manejar el clic en el resultado
                    >
                      {movie.title}
                    </Link>
                  ))}
                </div>
              )}
            </Form>

            {userState.token !== "" ? (
              <NavDropdown title="Perfil" id="navbarScrollingDropdown">
                <NavDropdown.Item><NavLink to = "/profile">Mi Perfil</NavLink></NavDropdown.Item> 
                <NavDropdown.Item href="#action3">Suscripción</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={userLogout}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                Iniciar sesión
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
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
