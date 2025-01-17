console.log("hello world");

const keys = document.querySelectorAll(".key") as NodeListOf<HTMLElement>;

//Create an audio context

const audioContext: AudioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)();

const notes: Array<{ name: string; frequency: number }> = [
  { name: "C", frequency: 261.63 },
  { name: "C#", frequency: 277.18 },
  { name: "D", frequency: 293.66 },
  { name: "D#", frequency: 311.13 },
  { name: "E", frequency: 329.63 },
  { name: "F", frequency: 349.23 },
  { name: "F#", frequency: 369.99 },
  { name: "G", frequency: 392.0 },
  { name: "G#", frequency: 415.3 },
  { name: "A", frequency: 440.0 },
  { name: "A#", frequency: 466.16 },
  { name: "B", frequency: 493.88 },
  { name: "C", frequency: 523.25 },
];

keys.forEach((key: HTMLElement) => {
  key.addEventListener("click", () => {
    const note: string | undefined = key.dataset.note;

    if (note === undefined) {
      throw new Error("note not found");
    }

    const matchNote = notes.find((n) => n.name === note);
    play(matchNote);
  });
});

function play(matchNote: { name: string; frequency: number } | undefined) {
  // Ensure the AudioContext is running
  if (audioContext.state === "suspended") {
    audioContext.resume().catch((error) => {
      console.error("Failed to resume the AudioContext:", error);
    });
  }

  const now: number = audioContext.currentTime;

  const oscillator: OscillatorNode | null = audioContext.createOscillator();
  const gainNode: GainNode = audioContext.createGain();

  if (oscillator === null) {
    throw new Error("Oscillator is null");
  }

  if (matchNote === undefined) {
    throw new Error("note not found at play function");
  }

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(matchNote.frequency, now);

  // Configure gain (volume envelope)
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);

  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(now);
  oscillator.stop(now + 1);
}
