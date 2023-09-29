import { FaSearch } from "react-icons/fa";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./searchbox.module.scss";

function Searchbox({
  searchedTutorial,
  setSearchedTutorial,
}: {
  searchedTutorial: string;
  setSearchedTutorial: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className={styles.searchcontainer}>
      <input
        type='text'
        placeholder='Search...'
        value={searchedTutorial}
        onChange={e => {
          setSearchedTutorial(e.target.value);
        }}
      />
      <FontAwesomeIcon icon='search' className={styles.icon} />
    </div>
  );
}

export default Searchbox;
