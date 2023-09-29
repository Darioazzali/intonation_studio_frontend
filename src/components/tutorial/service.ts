export const playAudio = (audio: HTMLAudioElement) => {
  return new Promise((resolve, reject) => {
    audio.onerror = (e) => reject("Error" + e);
    audio.play();
    audio.onended = resolve;
  });
};

export const pauseAudio = (audio: HTMLAudioElement) => {
  !audio.paused && audio.pause();
};
