import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Children, useState } from "react";
import { Collapse, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";

function Navbar({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Perfect Speaker</div>

      <FontAwesomeIcon
        icon='bars'
        fixedWidth
        className={styles.icon}
        onClick={() => {
          {
            setOpen(!open);
          }
        }}
      />

      <div className={styles.secondBox}>
        <Collapse in={open}>
          <div className={styles.otherContainer}>
            {children ? children : <div />}
            <Link to='/tutorial/createnew/'>Create</Link>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default Navbar;
