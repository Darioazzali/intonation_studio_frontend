import { useEffect, useRef, useState } from "react";
import { redirect, useParams } from "react-router";
import TutorialComponent from "./components/tutorial/Tutorial";
import { Tutorial } from "./interfaces";
import { Container, Row } from "react-bootstrap";
import { AllPageLoader } from "./App";
import Navbar from "./components/navbar/navbar";

const SingleTutorial = () => {
  const { tutorialId } = useParams();
  const [tutorial, setTutorial] = useState<Tutorial>();
  const [isLoading, setIsLoading] = useState(false);
  const fetchSingleTutorial = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://intonationstudio.com/api/tutorials/" + tutorialId,
        { method: "GET", mode: "cors" }
      );

      if (!response.ok) {
        throw new Error("Error fetching the tutorials");
        redirect("/error");
      }

      const data: Tutorial = await response.json();
      setTutorial(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const cardRef = useRef(null);

  useEffect(() => {
    fetchSingleTutorial();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Navbar />
      </Row>
      <AllPageLoader show={isLoading} />

      {/* <Container
        fluid
        className="d-flex justify-content-center"
        ref={reference}
      > */}

      <Container fluid='md' className='content-container' ref={cardRef}>
        {tutorial && (
          <TutorialComponent
            key={tutorial.id}
            TutorialProps={tutorial}
            reference={cardRef}
          />
        )}
      </Container>
    </Container>
  );
};

export default SingleTutorial;
