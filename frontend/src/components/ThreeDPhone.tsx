"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PresentationControls, ContactShadows, Html } from "@react-three/drei"
import * as THREE from "three"

function PhoneModel({ url }: { url: string }) {
    const meshRef = useRef<THREE.Group>(null)

    return (
        <group ref={meshRef} dispose={null}>
            {/* Phone Body */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[3.5, 7, 0.4]} />
                <meshStandardMaterial color="#1f1f1f" roughness={0.1} metalness={0.8} />
            </mesh>

            {/* Screen */}
            <mesh position={[0, 0, 0.21]}>
                <planeGeometry args={[3.2, 6.7]} />
                <meshStandardMaterial color="#000" />
                <Html
                    transform
                    occlude
                    distanceFactor={3.5}
                    position={[0, 0, 0.01]}
                    style={{
                        width: "320px",
                        height: "670px",
                        background: "#000",
                        borderRadius: "40px",
                        overflow: "hidden"
                    }}
                >
                    <iframe
                        src={url}
                        style={{ width: "100%", height: "100%", border: "none" }}
                        title="Phone Preview"
                    />
                </Html>
            </mesh>

            {/* Bezel / Frame Details (Simplified) */}
            <mesh position={[0, 3.4, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
                <capsuleGeometry args={[0.05, 0.8, 4, 8]} />
                <meshStandardMaterial color="#111" />
            </mesh>
        </group>
    )
}

export function ThreeDPhone({ url }: { url: string }) {
    return (
        <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />

                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                    <Float rotationIntensity={0.5} floatIntensity={0.5} speed={2}>
                        <PhoneModel url={url} />
                    </Float>
                </PresentationControls>

                <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
