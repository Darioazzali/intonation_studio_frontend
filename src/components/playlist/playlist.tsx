import { useRef } from "react";
import { Row, Container, Button } from "react-bootstrap";
import Navbar from "../navbar/navbar";
import { AllPageLoader } from "../../App";
import TutorialComponent from "../tutorial/Tutorial";
import { useParams } from "react-router-dom";
import RouteHeader from "../RouteHeader/RouteHeader";
import styles from "./playlist.module.scss";
import { usePlaylist } from "./service";

function PlaylistComponent() {
  const { playlistId } = useParams();
  const reference = useRef<HTMLDivElement | null>(null);
  const { isLoading, tutorials, playlist, showMoreTutorials, next } =
    usePlaylist(playlistId);
  return (
    <Container fluid className="mb-4">
      <Row className="mb-3">
        <Navbar />
      </Row>
      <AllPageLoader show={isLoading} />
      <Container fluid="md" className="content-container" ref={reference}>
        {playlist && (
          <RouteHeader
            title={playlist.name}
            itemsCount={playlist.tutorial_count}
          />
        )}
        {tutorials && tutorials.length !== 0
          ? tutorials.map((tutorial) => {
              return (
                <TutorialComponent
                  TutorialProps={tutorial}
                  key={tutorial.id}
                  reference={reference}
                />
              );
            })
          : !isLoading && (
              <div className={styles.notFound}>!! No playlists found!</div>
            )}
      </Container>
      <Button
        className="mx-auto my-3"
        style={{ display: next ? "block" : "none" }}
        onClick={() => showMoreTutorials()}
      >
        Show More...
      </Button>
    </Container>
  );
}

export default PlaylistComponent;
