"use strict";
console.log('hello world');
const keys = document.querySelectorAll('.key');
//Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext);
const notes = [
    { name: 'C', frequency: 261.63 },
    { name: 'C#', frequency: 277.18 },
    { name: 'D', frequency: 293.66 },
    { name: 'D#', frequency: 311.13 },
    { name: 'E', frequency: 329.63 },
    { name: 'F', frequency: 349.23 },
    { name: 'F#', frequency: 369.99 },
    { name: 'G', frequency: 392.00 },
    { name: 'G#', frequency: 415.30 },
    { name: 'A', frequency: 440.00 },
    { name: 'A#', frequency: 466.16 },
    { name: 'B', frequency: 493.88 },
    { name: 'C', frequency: 523.25 }
];
keys.forEach((key) => {
    key.addEventListener('click', () => {
        const note = key.dataset.note;
        if (note === undefined) {
            throw new Error('note not found');
        }
        const matchNote = notes.find((n) => n.name === note);
        play(matchNote);
    });
});
function play(note) {
    console.log(note);
}
const oscillator = audioContext.createOscillator();
if (oscillator === null) {
    throw new Error('Oscillator is null');
}
