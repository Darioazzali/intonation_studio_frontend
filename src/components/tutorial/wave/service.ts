export const cleanNullSamples = (samples: Array<number | null>) =>
  samples.filter((sample) => sample != null) as number[];

export const buildPoints = (
  samples: Array<number | null>,
  windowScreen: number,
  yMax: number,
  yMin: number
) => {
  const cleanSamples = cleanNullSamples(samples);
  const samplesNumber = cleanSamples.length;
  return () =>
    cleanSamples.map((sample: number, index: number) => ({
      x: (index * windowScreen) / samplesNumber,
      y: 320 - (sample / yMax) * 300 + yMin,
    }));
};
