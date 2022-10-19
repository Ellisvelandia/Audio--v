import React, { ChangeEvent } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";
import Visualizer from "./Visualizer";
import { AudioAnalyzer } from "./lib/audio";
import Wave from "./Wave";

function App() {
  const [analyzer, setAnalyzer] = React.useState<AudioAnalyzer | null>(null);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const audioElmRef = React.useRef<HTMLAudioElement>(null!);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioUrl(URL.createObjectURL(file));
    setAnalyzer(new AudioAnalyzer(audioElmRef.current));
  };

  return (
    <div>
      <Canvas
        style={{
          width: "100vw",
          height: "calc(100vh - 80px)",
          backgroundColor: "#135bc752",
          backgroundImage:
            "linear-gradient(225deg,#135bc752 0%, #036af0 52%, #054a8b52 100%)",
        }}
      >
        <ambientLight />
        <OrbitControls />
        <EffectComposer>
          <Bloom
            luminanceSmoothing={0.5}
            luminanceThreshold={0}
            intensity={1}
          />
          <Glitch />
        </EffectComposer>
        {analyzer && (
          <Visualizer
            analyzer={analyzer}
            lineWidth={0.05}
            color={0x80ddff}
            height={0.8}
            segments={100}
            radius={2}
          />
        )}
        <Wave color={0x999999} segments={70} />
      </Canvas>
      <div
        style={{
          height: 80,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <input type="file" accept="audio/*" onChange={onFileChange} />
        <audio
          ref={audioElmRef}
          src={audioUrl ?? undefined}
          controls
          style={{
            width: "200",
          }}
        />
      </div>
    </div>
  );
}

export default App;
