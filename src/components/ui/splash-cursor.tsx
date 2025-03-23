"use client";

import type {
  GLContext,
  WebGLContext,
  SimulationConfig,
  FBOParams,
  Material,
  Program,
  Pointer,
  FBO,
  DoubleFBO,
  TextureFormat,
} from "@/lib/types/webgl";
import {
  WEBGL2_CONSTANTS,
  WEBGL1_CONSTANTS,
  isWebGL2,
  isWebGL1,
  asWebGL2,
  asWebGL1,
} from "@/lib/types/webgl";

import { useEffect, useRef } from "react";
import { FluidSimulation } from "@/lib/simulation/fluid-simulation";
import { PointerEvents } from "@/lib/events/pointer-events";
import { PointerImpl } from "@/lib/pointer";

interface Props {
  children: React.ReactNode;
}

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

type Resolution = {
  width: number;
  height: number;
};

const config: SimulationConfig = {
  TEXTURE_DOWNSAMPLE: 1,
  DENSITY_DISSIPATION: 0.98,
  VELOCITY_DISSIPATION: 0.99,
  PRESSURE_DISSIPATION: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 30,
  SPLAT_RADIUS: 0.25,
  SHADING: true,
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  TRANSPARENT: false,
  SPLAT_FORCE: 6000,
};

export function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simulationRef = useRef<FluidSimulation | null>(null);
  const pointerEventsRef = useRef<PointerEvents | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // キャンバスのサイズを設定
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // シミュレーションの初期化
    const simulation = new FluidSimulation(gl, config);
    simulationRef.current = simulation;

    // ポインターイベントの初期化
    const pointer = new PointerImpl(canvas);
    const pointerEvents = new PointerEvents([pointer]);
    pointerEventsRef.current = pointerEvents;

    // イベントリスナーの設定
    canvas.addEventListener("pointerdown", pointerEvents.handlePointerDown.bind(pointerEvents));
    canvas.addEventListener("pointermove", pointerEvents.handlePointerMove.bind(pointerEvents));
    canvas.addEventListener("pointerup", pointerEvents.handlePointerUp.bind(pointerEvents));

    // アニメーションループ
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (simulationRef.current) {
        simulationRef.current.update(dt);
        simulationRef.current.render(null);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("pointerdown", pointerEvents.handlePointerDown.bind(pointerEvents));
      canvas.removeEventListener("pointermove", pointerEvents.handlePointerMove.bind(pointerEvents));
      canvas.removeEventListener("pointerup", pointerEvents.handlePointerUp.bind(pointerEvents));
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (simulationRef.current) {
        simulationRef.current.cleanup();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ touchAction: "none" }}
    />
  );
}

