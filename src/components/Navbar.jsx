import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
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
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleTheme } from "../redux/themeSlice";

function NavScrollExample() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userState = useSelector((state) => state.user);
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogout = () => {
    dispatch(logout());
    toast.success("Sesión cerrada con éxito!", {
      position: "top-center",
      autoClose: 3000,
    });
    navigate("/");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const fetchSearchResults = async () => {
        try {
          const results = await searchMovies(query);
          setSearchResults(results);
          setIsDropdownOpen(true);
        } catch (err) {
          setSearchResults([]);
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  };

  const handleResultClick = (id) => {
    setIsDropdownOpen(false);
    navigate(`/movie/${id}`);
  };

  return (
    <Navbar
      expand="lg"
      className={`bg-${isDark ? "dark" : "body-tertiary"} text-${
        isDark ? "light" : "dark"
      }`}
      variant={isDark ? "dark" : "light"}
      style={{ marginRight: "-8px" }}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
          style={{ marginRight: "5px" }}
        >
          HackPlus
        </Navbar.Brand>
        <Nav className="me-auto my-2 my-lg-0 d-flex align-items-center">
          <Nav.Link as={Link} to="/" className="ms-2">
            Inicio
          </Nav.Link>
        </Nav>
        <div className="d-flex justify-content-center flex-grow-1">
          <Form className="d-flex w-50">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-3"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button variant="success" type="submit">
              <i className="bi bi-search"></i>
            </Button>
            {searchQuery && searchResults.length > 0 && isDropdownOpen && (
              <div
                className="dropdown-menu show"
                style={{ position: "absolute", zIndex: 1000, top: 50 }}
              >
                {searchResults.map((movie) => (
                  <Link
                    key={movie.id}
                    to="#"
                    className="dropdown-item"
                    onClick={() => handleResultClick(movie.id)}
                  >
                    {movie.title}
                  </Link>
                ))}
              </div>
            )}
          </Form>
        </div>
        <Nav.Link
          as={Link}
          to="/About"
          className="d-flex align-items-center"
          style={{ marginLeft: "10px" }}
        >
          Acerca de Nosotros
        </Nav.Link>
        <Nav className="ms-auto d-flex align-items-center">
          {userState.token !== "" ? (
            <NavDropdown
              title="Perfil"
              id="navbarScrollingDropdown"
              className={isDark ? "bg-dark text-light" : "bg-light text-dark"}
              style={{ marginRight: "-8px", marginLeft: "15px" }}
            >
              <NavDropdown.Item>
                <NavLink
                  to="/profile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Mi Perfil
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={userLogout}>
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link
              as={Link}
              to="/login"
              className="d-flex align-items-center"
            >
              Iniciar sesión
            </Nav.Link>
          )}
          <Nav.Link
            as={Link}
            to="/cart"
            className="d-flex align-items-center ms-2"
          >
            <FaShoppingCart size={20} />
            {cartItems?.length > 0 && (
              <span className="badge bg-secondary ms-2">
                {cartItems?.length}
              </span>
            )}
          </Nav.Link>
          <Button
            variant="link"
            onClick={() => dispatch(toggleTheme())}
            className="text-decoration-none d-flex align-items-center"
          >
            {isDark ? (
              <FaSun size={20} color="#FFD700" />
            ) : (
              <FaMoon size={20} color="#000" />
            )}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
