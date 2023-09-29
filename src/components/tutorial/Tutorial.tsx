import { FaPlay, FaPause, FaTags } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { Audio as AudioType, Tutorial } from "../../interfaces";
import Wave from "./wave/Wave";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./tutorial.module.scss";
import { pauseAudio, playAudio } from "./service";

interface TutorialInterface {
  TutorialProps: Tutorial;
  reference: React.MutableRefObject<HTMLDivElement | null>;
}

function TutorialComponent({ TutorialProps, reference }: TutorialInterface) {
  const { name, audios, id, playlists, language } = TutorialProps;
  const [currentAudioNumber, setCurrentAudioNumber] = useState(0);
  const [audioState, setaudioState] = useState<string>("blank");

  const maxAudio = audios.length;

  const playingAudio = useRef(
    new Audio("http://intonationstudio.com" + audios[currentAudioNumber]?.url)
  );

  const changeAudio = (nextOrPrev: "next" | "prev") => {
    if (audioState === "playing") return;
    const operation = nextOrPrev === "next" ? 1 : -1;
    if (
      (currentAudioNumber === 0 && nextOrPrev === "prev") ||
      (currentAudioNumber === maxAudio - 1 && nextOrPrev === "next")
    )
      return;
    setCurrentAudioNumber(currentAudioNumber + operation);
    playingAudio.current = new Audio(audios[currentAudioNumber]?.url);
  };

  const nextTrack = () => {
    return changeAudio("next");
  };
  const prevTrack = () => {
    return changeAudio("prev");
  };

  const handlePlay = async () => {
    switch (audioState) {
      case "blank":
        setaudioState("playing");
        await playAudio(playingAudio.current);
        setaudioState("blank");
        break;
      case "paused":
        setaudioState("playing");
        await playAudio(playingAudio.current);
        setaudioState("blank");
        break;
      case "playing":
        setaudioState("paused");
        pauseAudio(playingAudio.current);
        break;
    }
  };

  useEffect(() => {
    setaudioState("blank");
  }, [currentAudioNumber]);

  return (
    <div className={styles.mycard}>
      <div className={styles.cardContainer}>
        <div className={styles.upBar}>
          <div>
            <div className={styles.myTitle}>{name}</div>
            <div className={styles.tutorialSubtitle}>
              <FaTags />
              {playlists &&
                playlists.map((playlist) => {
                  return (
                    <Link
                      to={`/playlist/${playlist.id.toString()} `}
                      key={playlist.id}
                    >
                      {playlist.name}
                    </Link>
                  );
                })}
              {language && language.id ? (
                <Link to={`/playlist/${language.id.toString()} `}>
                  {language.name}
                </Link>
              ) : null}
            </div>
          </div>
          <Link to={`/tutorial/tutorial/${id}`}>
            <FontAwesomeIcon
              icon="share"
              fixedWidth
              className={styles.shareIcon}
            />
          </Link>
        </div>
        <Wave
          audios={audios}
          id={id}
          currentAudio={currentAudioNumber}
          duration={playingAudio.current.duration}
          audioState={audioState}
          reference={reference}
        />
        <div className={styles.bottomCard}>
          {audios[currentAudioNumber] && (
            <div className={styles.bottomLeft}>
              <span>
                {audios[currentAudioNumber].speaker.code.toUpperCase()}
              </span>
              <span style={{ color: "#676767", fontWeight: 400 }}>
                -{`(${currentAudioNumber + 1}/${maxAudio})`}{" "}
              </span>
            </div>
          )}
          {audioState === "playing" ? (
            <FaPause className={styles.play} onClick={() => handlePlay()} />
          ) : (
            <FaPlay className={styles.play} onClick={() => handlePlay()} />
          )}
          <div className={styles.bottomRight}>
            <FontAwesomeIcon
              icon="backward"
              fixedWidth
              className={styles.arrowIcon}
              onClick={() => prevTrack()}
            />
            {audios[currentAudioNumber] &&
              audios[currentAudioNumber].speaker.code}

            <FontAwesomeIcon
              icon="forward"
              fixedWidth
              className={styles.arrowIcon}
              onClick={() => nextTrack()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorialComponent;
