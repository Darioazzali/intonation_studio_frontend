import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BoostrapNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";

function Navbar({ children }: { children?: ReactNode }) {
  return (
    <>
      <BoostrapNavbar collapseOnSelect expand='md' className={styles.navbar}>
        <Container>
          <BoostrapNavbar.Brand id='navbar-brand' as={Link} to='/'>
            Intonation Studio
          </BoostrapNavbar.Brand>
          <BoostrapNavbar.Toggle
            className={styles.toggle}
            as={FontAwesomeIcon}
            icon='bars'
            fixedWidth
          />
          <BoostrapNavbar.Collapse className={styles.collapse}>
            <Nav className='w-100 align-center '>
              <Nav.Item className={styles.searchbox}>{children}</Nav.Item>
            </Nav>
            <Nav id='createLink'>
              <Nav.Link as={Link} to='/tutorial/createnew'>
                Create
              </Nav.Link>
            </Nav>
          </BoostrapNavbar.Collapse>
        </Container>
      </BoostrapNavbar>
    </>
  );
}

export default Navbar;
