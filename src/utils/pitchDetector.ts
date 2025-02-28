// PitchDetector class based on the PitchDetect library
export class PitchDetector {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStreamSource: MediaStreamAudioSourceNode | null = null;
  private isRunning: boolean = false;
  private buffer: Float32Array | null = null;
  private onPitchCallback: ((frequency: number | null) => void) | null = null;

  constructor() {
    this.init = this.init.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.analyzePitch = this.analyzePitch.bind(this);
  }

  async init() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
      this.mediaStreamSource.connect(this.analyser);
      this.buffer = new Float32Array(2048);
      this.analyser.fftSize = 2048;
    } catch (error) {
      console.error('Error initializing audio:', error);
      throw error;
    }
  }

  start(callback: (frequency: number | null) => void) {
    if (!this.audioContext || !this.analyser) {
      throw new Error('PitchDetector not initialized');
    }
    this.onPitchCallback = callback;
    this.isRunning = true;
    this.analyzePitch();
  }

  stop() {
    this.isRunning = false;
    this.onPitchCallback = null;
  }

  private analyzePitch() {
    if (!this.isRunning || !this.analyser || !this.buffer || !this.onPitchCallback) {
      return;
    }

    this.analyser.getFloatTimeDomainData(this.buffer);
    const frequency = this.autoCorrelate(this.buffer, this.audioContext!.sampleRate);
    this.onPitchCallback(frequency);

    requestAnimationFrame(this.analyzePitch);
  }

  private autoCorrelate(buffer: Float32Array, sampleRate: number): number | null {
    // Find a repeating pattern in the signal
    const SIZE = buffer.length;
    const MAX_SAMPLES = Math.floor(SIZE/2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;
    let foundGoodCorrelation = false;

    // Calculate the root mean square of the signal
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);

    // Not enough signal
    if (rms < 0.01) {
      return null;
    }

    let lastCorrelation = 1;

    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;

      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs((buffer[i]) - (buffer[i + offset]));
      }

      correlation = 1 - (correlation / MAX_SAMPLES);

      if (correlation > 0.9 && correlation > lastCorrelation) {
        foundGoodCorrelation = true;
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation;
          bestOffset = offset;
        }
      } else if (foundGoodCorrelation) {
        break;
      }

      lastCorrelation = correlation;
    }

    if (bestCorrelation > 0.01) {
      return sampleRate / bestOffset;
    }

    return null;
  }
}

export const noteFromPitch = (frequency: number): string => {
  const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const C0 = 16.35; // Frequency of C0
  const steps = Math.round(12 * Math.log2(frequency / C0));
  const octave = Math.floor(steps / 12);
  const noteIndex = steps % 12;
  return noteStrings[noteIndex] + octave;
};

export const isNoteMatch = (detectedNote: string, targetNote: string): boolean => {
  return detectedNote === targetNote;
}; 