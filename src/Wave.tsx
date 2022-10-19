import { createNoise3D } from "simplex-noise";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { BufferAttribute, Mesh, PlaneGeometry, Vector2 } from "three";

const noise3D = createNoise3D;

type Props = { 
  color?: number; 
  segments?: number; 
};

export default function Wave({ color = 0xffffff, segments = 100 }: Props) {
  const mesh = React.useRef<Mesh>(null);
  const geometry = React.useRef<PlaneGeometry>(null!);
  const timeRef = React.useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.2;
    const g = geometry.current;
    const v2 = new Vector2();

    for (let i = 0; i < g.attributes.position.count; i++) {
      const uvAttr = g.getAttribute("uv") as BufferAttribute;
      v2.fromBufferAttribute(uvAttr, i)
        .addScalar(timeRef.current * 0.01)
        .multiplyScalar(20)

      // const h = noise3D(v2.x, v2.y, timeRef.current)
      // g.attributes.position.setZ(i, h)
    }
    g.computeVertexNormals();
    g.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <mesh ref={mesh} rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry ref={geometry} args={[100, 100, segments, segments]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </group>
  );
}
