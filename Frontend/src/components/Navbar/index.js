import React, { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import background from "../../images/f1.png";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  TopImg,
} from "./NavbarElements";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";


const Navbar = ({ user, toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const auth = useContext(AuthContext);

  const signOut = () => {
    auth.logout();
    <Redirect to={"/login"} />;
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              RP Management Tool
            </NavLogo>

            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>

            <NavMenu>
              {auth.isLoggedIn && (
                <NavItem>
                  <NavLinks
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </NavLinks>
                </NavItem>
              )}
              {auth.role === "supervisor" && (
                <NavItem>
                  <NavLinks
                    to="/chat"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Chat
                  </NavLinks>
                </NavItem>
              )}

              {auth.role === "cosupervisor" && (
                <NavItem>
                  <NavLinks
                    to="/chat"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Chat
                  </NavLinks>
                </NavItem>
              )}
              {auth.role === "supervisor" && (
                <NavItem>
                  <NavLinks
                    to="/requests"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Requests
                  </NavLinks>
                </NavItem>
              )}

              {auth.role === "cosupervisor" && (
                <NavItem>
                  <NavLinks
                    to="/requests"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Requests
                  </NavLinks>
                </NavItem>
              )}

              {!auth.isLoggedIn && (
                <NavBtn>
                  <NavBtnLink to="/register">Sign Up</NavBtnLink>
                </NavBtn>
              )}

              {auth.isLoggedIn && auth.token != null && (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 dropleft">
                  <li className="nav-item dropdown ">
                    <div
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "white" }}
                    >
                      <img
                        src={
                          auth.user
                            ? auth.user.image.replace(/\s+/g, "%20")
                            : "https://lh3.googleusercontent.com/proxy/hZZ-VMxK16FXsVbvPxckcMuoQq0Ip8fK8q6y0VpzUMzrK13OjohEZBRJRZIqPB-p1M7XuAsBadS1_7zsgE2bsIGXd-iU2BJ8I31LpTcbp6yANoDNwntqvU0iMTnsDlL1EF9IZivuDhS1ZToSEyYA6OWT"
                        }
                        alt=""
                        className="avatar-image-small mr-2"
                      />
                      {auth.fullName}[{auth.role}]
                    </div>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={{
                            pathname: "/customer-profile",
                            state: {
                              customer: auth.user,
                            },
                          }}
                        >
                          My Profile
                        </Link>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <NavBtnLink
                        className="btn btn-outline-danger m-2"
                        onClick={signOut}
                      >
                        Logout
                      </NavBtnLink>
                    </ul>
                  </li>
                </ul>
                // <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                // 	<li className='nav-item'>
                // 		<span className='text-dark nav-link'>
                // 			{auth.fullName}
                // 		</span>
                // 	</li>
                // 	<button
                // 		className='btn btn-outline-danger m-2'
                // 		onClick={signOut}>
                // 		Logout
                // 	</button>
                // </ul>
              )}
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
