import { Button } from "react-bootstrap";
import { FaMagic, FaMeh, FaSmileWink } from "react-icons/fa";

import styles from "./noTutorial.module.scss";

const NoTutorial = (props: any) => {
  return (
    <div>
      <div className={styles.noTutorial}>
        <div className={styles.feedbackFace}>
          <FaMeh />
        </div>

        <div> No tutorials found</div>
      </div>

      <div className={styles.noTutorial}>
        <div className={styles.feedbackFace}>
          <FaSmileWink />
        </div>
        <button>
          <span>Create new tutorial</span>
          <FaMagic />
        </button>
      </div>
    </div>
  );
};

export default NoTutorial;
