import { useEffect, useRef, useState } from "react";
import TutorialComponent from "./components/tutorial/Tutorial";
import type { nextPage, Page, Tutorial } from "./interfaces";
import { Row, Spinner, Container, Button, Col } from "react-bootstrap";
import SearchBox from "./components/navbar/SearchBox";
import NoTutorial from "./components/noTutorial/noTutorial";
import Navbar from "./components/navbar/navbar";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBackward,
  faBars,
  faForward,
  faMagicWandSparkles,
  faPlay,
  faSearch,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMagicWandSparkles,
  faSearch,
  faBars,
  faBackward,
  faForward,
  faPlay,
  faShare
);

function App() {
  const [searchedTutorial, setSearchedTutorial] = useState("");
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState<nextPage>();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const fetchTutorials = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://intonationstudio.com/api/tutorials/?" +
          new URLSearchParams({ search: searchedTutorial }),
        { method: "GET", mode: "cors" }
      );
      if (!response.ok) {
        throw new Error("Error fetching the tutorials");
      }
      const page: Page = await response.json();
      setNext(page.next);
      setTutorials(page.results);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const showMoreTutorials = async () => {
    try {
      setIsLoading(true);
      if (!next) return null;
      const nextHttps = next?.replace("http", "https");
      const response = await fetch(nextHttps, {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Error fetching next page");
      }
      const nextPage: Page = await response.json();

      const moreTutorials = nextPage.results;

      setTutorials((prevTutorials) => {
        return [...prevTutorials, ...moreTutorials];
      });
      setNext(nextPage.next);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const waitKeyRelease = setTimeout(() => {
      fetchTutorials();
    }, 2000);
    return () => clearTimeout(waitKeyRelease);
  }, [searchedTutorial]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <Container fluid className="mb-4">
      <Row className="mb-3">
        <Navbar>
          <SearchBox
            searchedTutorial={searchedTutorial}
            setSearchedTutorial={setSearchedTutorial}
          />
        </Navbar>
      </Row>
      <Row>
        <AllPageLoader show={isLoading} />
        <Container fluid="md" className="content-container" ref={cardRef}>
          {tutorials && tutorials.length !== 0
            ? tutorials.map((tutorial) => (
                <Row key={tutorial.id}>
                  {tutorial.audios.length !== 0 && (
                    <TutorialComponent
                      reference={cardRef}
                      TutorialProps={tutorial}
                    />
                  )}
                </Row>
              ))
            : !isLoading && <NoTutorial />}
        </Container>

        <Button
          className="mx-auto my-3"
          style={{ display: next ? "block" : "none" }}
          onClick={() => showMoreTutorials()}
        >
          Show More...
        </Button>
      </Row>
    </Container>
  );
}

export default App;

export const AllPageLoader = ({ show }: { show: boolean }) => {
  if (show)
    return (
      <div className="all-page-loader-container">
        <div className="all-page-loader">
          <Spinner animation="border" role="status" />
        </div>
      </div>
    );
  return <></>;
};
