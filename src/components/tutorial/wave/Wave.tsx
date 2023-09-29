import { Stage, Line, Layer, Circle, Label, Text } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Audio, Tutorial } from "../../../interfaces";
import { buildPoints, cleanNullSamples } from "./service";
interface WaveProps {
  audios: Audio[];
  currentAudio: number;
  duration: number;
  audioState: string;
  reference: React.MutableRefObject<HTMLDivElement | null>;
  id: number;
}

function Wave(props: WaveProps) {
  const { audios, currentAudio, duration, audioState, reference, id } = props;
  const wasPaused = useRef(false);
  const [windowScreen, setWindowScreen] = useState<number>(320);
  const yMax = parseInt(audios[currentAudio].analysis.data.max_y);
  const yMin = parseInt(audios[currentAudio].analysis.data.min_y);
  const currentAudioSamples = audios[currentAudio].analysis.data.samples;

  const points = buildPoints(currentAudioSamples, windowScreen, yMax, yMin);

  const arrayPoints = () =>
    points().reduce<number[]>(
      (accumulator, current) => [...accumulator, current.x, current.y],
      []
    );

  //Declaration of the Animated Circle for React Spring
  const AnimatedCircle = animated(Circle);

  const [{ x, y }, api] = useSpring(() => ({
    from: { x: points()[0].x, y: points()[0].y },
  }));

  const playCallback = () => {
    if (!wasPaused.current) {
      api.start({
        to: async (next: any, cancel: any) => {
          for (let i = 0; i < points().length; i++) {
            await next({ x: points()[i].x, y: points()[i].y });
          }
          await next({ x: points()[0].x, y: points()[0].y });
          cancel();
        },
        config: {
          duration: (duration * 1000) / points().length,
        },
        reset: true,
      });
    } else {
      api.resume();
      wasPaused.current = false;
    }
  };

  const pauseCallback = () => {
    if (wasPaused.current === false) {
      api.pause();
      wasPaused.current = true;
    } else {
      blankCallback();
    }
  };

  const blankCallback = () => {
    api.set({ x: points()[0].x, y: points()[0].y });
    api.stop();
    api.resume();
    wasPaused.current = false;
  };

  useEffect(() => {
    switch (audioState) {
      case "playing":
        playCallback();
        break;
      case "paused":
        pauseCallback();
        break;
      case "blank":
        blankCallback();
        break;
    }
  }, [audioState, currentAudio]);

  useEffect(() => {
    if (reference.current) {
      setWindowScreen(reference.current.clientWidth);
    }
  }, [reference]);

  useEffect(() => {
    blankCallback();
  }, []);

  return (
    <div className="wave" id={id.toString()}>
      <Stage width={windowScreen * 0.85} height={340}>
        <Layer>
          {points().map((myPoint, index) => (
            <Circle
              x={myPoint.x}
              y={myPoint.y}
              radius={3}
              key={index}
              fill="#676767"
            />
          ))}
          <Line
            points={arrayPoints()}
            stroke="#676767"
            strokeWidth={2.5}
            tension={0.5}
          />
          <AnimatedCircle x={x} y={y} fill="white" radius={2.5} />
        </Layer>
      </Stage>
    </div>
  );
}

export default Wave;
