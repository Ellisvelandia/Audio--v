export class AudioAnalyzer {
  #ctx: AudioContext;
  #analizerNode: AnalyserNode;
  #sourceNode: MediaElementAudioSourceNode;

  constructor(audioElement: HTMLAudioElement) {
    this.#ctx = new AudioContext();
    this.#analizerNode = this.#ctx.createAnalyser();
    this.#sourceNode = this.#ctx.createMediaElementSource(audioElement);

    this.#analizerNode.minDecibels = -60;
    this.#analizerNode.smoothingTimeConstant = 0.8;

    this.#sourceNode.connect(this.#analizerNode);
    this.#sourceNode.connect(this.#ctx.destination);
  }

  getFft(): Uint8Array {
    const freqData = new Uint8Array(this.#analizerNode.frequencyBinCount);
    this.#analizerNode.getByteFrequencyData(freqData);
    return freqData;
  }
}
