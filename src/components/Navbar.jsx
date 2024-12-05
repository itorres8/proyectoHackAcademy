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
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleTheme } from "../redux/themeSlice";
import styles from "../styles/Global.module.css";

function NavScrollExample() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bounce, setBounce] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userState = useSelector((state) => state.user);
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

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
    setSelectedIndex(0);

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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && selectedIndex !== null) {
      handleResultClick(searchResults[selectedIndex].id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    if (searchResults.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      setBounce(true);
      const timeout = setTimeout(() => setBounce(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [cartItems]);

  useEffect(() => {
    if (selectedIndex !== null && searchResults.length > 0) {
      const dropdownItems = document.querySelectorAll(".dropdown-item");
      dropdownItems[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex, searchResults]);

  return (
    <Navbar
      expand="lg"
      className={`bg-${isDark ? "dark" : "body-tertiary"} text-${
        isDark ? "light" : "dark"
      } `}
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
          <img
            src={isDark ? "/logotipo-darkmode.svg" : "/logotipo-lightmode.svg"}
            alt="logo"
            width="auto"
            height="30"
          />
        </Navbar.Brand>
        <Nav className="me-auto my-2 my-lg-0 d-flex align-items-center">
          <Nav.Link as={Link} to="/" className={"d-flex align-items-center "}>
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
              onKeyDown={handleKeyDown}
              ref={searchInputRef}
              onFocus={handleFocus}
            />
            <Button
              style={{ backgroundColor: "#F16E61", borderColor: "#F16E61" }}
              type="submit"
            >
              <i className="bi bi-search"></i>
            </Button>

            {searchQuery && searchResults.length > 0 && isDropdownOpen && (
              <div
                className="dropdown-menu show"
                ref={dropdownRef}
                style={{ position: "absolute", zIndex: 1000, top: 50 }}
              >
                {searchResults.map((movie, index) => (
                  <Link
                    key={movie.id}
                    to="#"
                    className={`dropdown-item ${
                      selectedIndex === index ? "bg-info text-white" : ""
                    }`}
                    onClick={() => handleResultClick(movie.id)}
                  >
                    {movie.title}
                  </Link>
                ))}
              </div>
            )}
          </Form>
        </div>
        <Nav className="me-auto my-2 my-lg-0 d-flex align-items-center">
          <Nav.Link
            as={Link}
            to="/About"
            className={"d-flex align-items-center "}
            style={{ marginLeft: "10px" }}
          >
            Acerca de Nosotros
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto d-flex align-items-center">
          {userState.token !== "" ? (
            <NavDropdown
              title="Perfil"
              id="navbarScrollingDropdown"
              style={{ marginRight: "-5px", marginLeft: "5px" }}
            >
              <NavDropdown.Item onClick={() => navigate("/profile")}>
                Mi Perfil
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
              <span
                className={`badge bg-secondary ms-2 ${
                  bounce ? styles.bounce : ""
                }`}
              >
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
