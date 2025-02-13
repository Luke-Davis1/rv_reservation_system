import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../elements/Button";
import { ButtonList } from "../elements/ButtonList";
import { Link } from "../elements/Link";

export function Header({ position = "relative" }) {
  const navigate = useNavigate();
  // Get if user is logged in
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const location = useLocation();

  const menus = [
    { name: 'Home', url: "/", user_access: 'ALL', tokenNeeded: false},
    { name: 'Contact', url: "/contact", user_access: 'ALL', tokenNeeded: false},
    { name: 'Profile', url: "/profile", user_access: 'ALL', tokenNeeded: true},
    { name: 'My Reservations', url: "/reservations", user_access: 'customer', tokenNeeded: true},
    { name: 'Dashboard', url: "/admin", user_access: 'admin', tokenNeeded: true},
    { name: 'Dashboard', url: "/employee", user_access: 'employee', tokenNeeded: true},
  ];

  const filteredMenus = menus.filter(menu => {
    if (menu.user_access === 'ALL') {
      return !menu.tokenNeeded || (menu.tokenNeeded && token);
    }
      
    // Show menus that require a token only if the user is logged in (token exists)
    if (menu.tokenNeeded) {
      return token && (menu.user_access === userType); // Check if user has a token and matches userType
    }

    // For menus that don't require a token, show them to everyone
    return !menu.tokenNeeded;
  });

  const handleLogout = (e) => {
    
    e.preventDefault();
    // Remove items from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    // redirect back to home page
    navigate("/");
  }

  const handleBookingButton = () => {
    // If there isn't a user type, they can only go to customer booking page
    // depending on user type, route to user book or employee/admin book
    if (!userType || userType === "customer") {
      // send to customer booking page
      navigate("/book");
    } else {
      navigate("/employee/reservations/book");
    }
  }

  const isActive = (url) => location.pathname === url;
  // Return the header with the name of the site, links, and login/logout options
  return <>
    <HeaderWrapper position={position}>
      <h1 style={{ fontWeight: 600, fontSize: "1.5rem" }}>Fam Camp</h1>
      <NavigationLinkList>
        {filteredMenus.map((menu) => (
          <Link key={menu.url} type={isActive(menu.url) ? "navigation-selected" : "navigation"} url={menu.url}>{menu.name}</Link>
        ))}
      </NavigationLinkList>
      <ButtonList>
        {token ? (
          <>
            <Link type='logout' onClick={handleLogout}>Logout</Link>
            <Button size="small" onClick={handleBookingButton}>Book a reservation <ArrowRight size={15} strokeWidth={'2px'} /></Button>
          </>
        ) : (
          <>
            <Link type='login' url={"/login"}>Login</Link>
            <Button size="small" onClick={() => navigate("/register")}>Create Account <ArrowRight size={15} strokeWidth={'2px'} /></Button>
          </>
        )}
      </ButtonList>
    </HeaderWrapper>
  </>
}

const HeaderWrapper = styled.div`
  position: ${({ position }) => {
    switch (position) {
      case 'absolute':
        return 'absolute';
      default:
        return 'relative';
    }
  }};

  ${({ position }) => position === 'absolute' && `
    top: 0;
    left: 0;
    right: 0;
  `}
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const NavigationLinkList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  gap: 1rem;
`;