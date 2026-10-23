"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Central metallic orb with distortion ── */
function CentralOrb() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock, pointer }) => {
        if (!ref.current) return;
        ref.current.rotation.x =
            clock.elapsedTime * 0.15 + pointer.y * 0.3;
        ref.current.rotation.y =
            clock.elapsedTime * 0.2 + pointer.x * 0.3;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh ref={ref} scale={2}>
                <torusKnotGeometry args={[0.8, 0.3, 200, 32]} />
                <MeshDistortMaterial
                    color="#818cf8"
                    envMapIntensity={1.5}
                    roughness={0.05}
                    metalness={1}
                    distort={0.25}
                    speed={1.5}
                />
            </mesh>
        </Float>
    );
}

/* ── Orbiting wireframe ring ── */
function WireframeRing() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        ref.current.rotation.x = clock.elapsedTime * 0.1 + Math.PI * 0.3;
        ref.current.rotation.z = clock.elapsedTime * 0.08;
    });

    return (
        <mesh ref={ref} scale={3.5}>
            <torusGeometry args={[1, 0.005, 64, 128]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.15} />
        </mesh>
    );
}

/* ── Small accent spheres ── */
function AccentSphere({
    position,
    color,
    speed,
    scale,
}: {
    position: [number, number, number];
    color: string;
    speed: number;
    scale: number;
}) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        ref.current.position.y =
            position[1] + Math.sin(clock.elapsedTime * speed) * 0.3;
        ref.current.rotation.y = clock.elapsedTime * speed * 0.5;
    });

    return (
        <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={ref} position={position} scale={scale}>
                <sphereGeometry args={[1, 32, 32]} />
                <MeshWobbleMaterial
                    color={color}
                    factor={0.3}
                    speed={speed}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </Float>
    );
}

/* ── Particle dust field ── */
function DustField({ count = 400 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 25;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 25;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 25;
        }
        return arr;
    }, [count]);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        ref.current.rotation.y = clock.elapsedTime * 0.015;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#a5b4fc"
                transparent
                opacity={0.3}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

/* ── Mouse-following camera ── */
function CameraRig() {
    const target = useRef(new THREE.Vector3(0, 0, 6));

    useFrame(({ camera, pointer }) => {
        target.current.set(pointer.x * 0.8, pointer.y * 0.5, 6);
        camera.position.lerp(target.current, 0.015);
        camera.lookAt(0, 0, 0);
    });

    return null;
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.6}
                color="#e0e7ff"
            />
            <pointLight
                position={[-4, 3, -5]}
                intensity={0.5}
                color="#818cf8"
            />
            <pointLight
                position={[3, -3, 4]}
                intensity={0.3}
                color="#6ee7b7"
            />

            <CentralOrb />
            <WireframeRing />

            <AccentSphere
                position={[-3.5, 1.5, -2]}
                color="#6ee7b7"
                speed={0.8}
                scale={0.4}
            />
            <AccentSphere
                position={[3.5, -1, -3]}
                color="#f0abfc"
                speed={1.1}
                scale={0.3}
            />
            <AccentSphere
                position={[-2, -2.5, -1]}
                color="#fbbf24"
                speed={0.6}
                scale={0.25}
            />
            <AccentSphere
                position={[2, 2, -4]}
                color="#f87171"
                speed={0.9}
                scale={0.2}
            />

            <DustField count={500} />
            <CameraRig />
            <Environment preset="night" />
        </>
    );
}

export function LabsScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{
                    position: [0, 0, 6],
                    fov: 55,
                    near: 0.1,
                    far: 100,
                }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                style={{ background: "transparent" }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
