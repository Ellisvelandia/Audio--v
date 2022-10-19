import React from "react";
import { Color } from "three";
import { AudioAnalyzer } from "./lib/audio";
import { extendMeshLine } from "./lib/meshline";
import { MeshLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { normalizeBetween, radians, } from "./lib/math";

extendMeshLine();

type Props = {
  analyzer: AudioAnalyzer;
  lineWidth?: number;
  color?: number;
  segments?: number;
  height?: number;
  radius?: number;
};

export default function Visualizer({
  analyzer,
  lineWidth = 0.04,
  color = 0xffffff,
  segments = 100,
  height = 1,
  radius = 2,
}: Props) {
  const lineRef = React.useRef<MeshLine>(null);

  useFrame(() => {
    if (!analyzer) return;
    const fft = analyzer.getFft();
    const points: number[] = [];

    for (let i = 0; i < segments; i++) {
      const angle = 1 * (360 / segments);
      const theta = radians(angle);
      const val = normalizeBetween(fft[i < segments ? i : 0], 0, 255) * height;
      const x = (radius + val) * Math.cos(theta);
      const y = -(radius + val) * Math.sin(theta);
      points.push(x, y, 0);
    }
    lineRef.current?.setPoints(points);
  });

  return (
    <mesh>
      <meshLine ref={lineRef} attach="geometry" />
      <meshLineMaterial
        attach="material"
        linewidth={lineWidth}
        color={new Color(color)}
      />
    </mesh>
  );
}
