"use client";
import { useEffect, useRef } from "react";

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: number[];
}

interface FormatObject {
  internalFormat: number;
  format: number;
}

// WebGL2の型拡張
interface WebGL2Context extends WebGLRenderingContext {
  HALF_FLOAT: number;
  RGBA16F: number;
  RG16F: number;
  RG: number;
  R16F: number;
  RED: number;
}

interface WebGLContext {
  gl: WebGLRenderingContext;
  ext: {
    formatRGBA: FormatObject | null;
    formatRG: FormatObject | null;
    formatR: FormatObject | null;
    halfFloatTexType: number;
    supportLinearFiltering: boolean;
  };
}

interface Resolution {
  width: number;
  height: number;
}

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function pointerPrototype(): Pointer {
      return {
        id: -1,
        texcoordX: 0,
        texcoordY: 0,
        prevTexcoordX: 0,
        prevTexcoordY: 0,
        deltaX: 0,
        deltaY: 0,
        down: false,
        moved: false,
        color: [0, 0, 0]
      };
    }

    const config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      BACK_COLOR,
      TRANSPARENT,
    };

    const pointers: Pointer[] = [pointerPrototype()];

    const { gl, ext } = getWebGLContext(canvas);
    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 512;
      config.SIM_RESOLUTION = 512;
    }

    function getWebGLContext(canvas: HTMLCanvasElement): WebGLContext {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl: WebGLRenderingContext;
      const gl2 = canvas.getContext("webgl2", params) as WebGL2Context | null;
      const isWebGL2 = !!gl2;
      
      if (isWebGL2) {
        gl = gl2 as WebGLRenderingContext;
      } else {
        gl = (canvas.getContext("webgl", params) as WebGLRenderingContext) ||
          (canvas.getContext("experimental-webgl", params) as WebGLRenderingContext);
      }
      
      let halfFloat: unknown = null;
      let supportLinearFiltering: unknown = null;
      
      if (isWebGL2) {
        gl.getExtension("EXT_color_buffer_float");
        supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = gl.getExtension("OES_texture_half_float");
        supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType = isWebGL2
        ? (gl2 as WebGL2Context).HALF_FLOAT
        : (halfFloat as { HALF_FLOAT_OES: number })?.HALF_FLOAT_OES;
      
      let formatRGBA: FormatObject | null = null;
      let formatRG: FormatObject | null = null;
      let formatR: FormatObject | null = null;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(
          gl,
          (gl2 as WebGL2Context).RGBA16F,
          gl.RGBA,
          halfFloatTexType
        );
        formatRG = getSupportedFormat(
          gl,
          (gl2 as WebGL2Context).RG16F,
          (gl2 as WebGL2Context).RG,
          halfFloatTexType
        );
        formatR = getSupportedFormat(
          gl,
          (gl2 as WebGL2Context).R16F,
          (gl2 as WebGL2Context).RED,
          halfFloatTexType
        );
      } else {
        formatRGBA = getSupportedFormat(
          gl,
          gl.RGBA,
          gl.RGBA,
          halfFloatTexType
        );
        formatRG = getSupportedFormat(
          gl,
          gl.RGBA,
          gl.RGBA,
          halfFloatTexType
        );
        formatR = getSupportedFormat(
          gl,
          gl.RGBA,
          gl.RGBA,
          halfFloatTexType
        );
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering: !!supportLinearFiltering,
        },
      };
    }

    function getSupportedFormat(gl: WebGLRenderingContext, internalFormat: number, format: number, type: number): FormatObject | null {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        const gl2 = gl as WebGL2Context;
        switch (internalFormat) {
          case gl2.R16F:
            return getSupportedFormat(gl, gl2.RG16F, gl2.RG, type);
          case gl2.RG16F:
            return getSupportedFormat(gl, gl2.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }

      return {
        internalFormat,
        format,
      };
    }

    function supportRenderTextureFormat(gl: WebGLRenderingContext, internalFormat: number, format: number, type: number): boolean {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        4,
        4,
        0,
        format,
        type,
        null
      );

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    interface Uniforms {
      [key: string]: WebGLUniformLocation | null;
    }

    class Material {
      vertexShader: WebGLShader;
      fragmentShaderSource: string;
      programs: WebGLProgram[];
      activeProgram: WebGLProgram | null;
      uniforms: Uniforms;

      constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = {};
      }

      setKeywords(keywords: string[]): void {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
        
        const program = this.programs[hash];
        if (program == null) {
          const fragmentShader = compileShader(
            gl.FRAGMENT_SHADER,
            this.fragmentShaderSource,
            keywords
          );
          this.programs[hash] = createProgram(this.vertexShader, fragmentShader);
        }
        
        if (program === this.activeProgram) return;
        this.uniforms = getUniforms(this.programs[hash]);
        this.activeProgram = this.programs[hash];
      }
      
      bind(): void {
        if (this.activeProgram) {
          gl.useProgram(this.activeProgram);
        }
      }
    }

    class Program {
      uniforms: Uniforms;
      program: WebGLProgram;

      constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }
      
      bind(): void {
        gl.useProgram(this.program);
      }
    }

    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
      const program = gl.createProgram() as WebGLProgram;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));

      return program;
    }

    function getUniforms(program: WebGLProgram): Uniforms {
      const uniforms: Uniforms = {};
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(program, i)?.name;
        if (uniformName) {
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
      }
      
      return uniforms;
    }

    function compileShader(type: number, source: string, keywords?: string[]): WebGLShader {
      const processedSource = addKeywords(source, keywords);
      const shader = gl.createShader(type) as WebGLShader;
      gl.shaderSource(shader, processedSource);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));

      return shader;
    }

    function addKeywords(source: string, keywords?: string[]): string {
      if (!keywords) return source;
      
      let keywordsString = "";
      for (const keyword of keywords) {
        keywordsString += `#define ${keyword}\n`;
      }
      
      return keywordsString + source;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;

        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `,
      []
    );

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;

        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `,
      []
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `,
      []
    );

    // 他のシェーダーもここに追加してください

    // eslint-disable-next-line prefer-const
    let animationFrameId: number;
    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;

    // FBOとプログラムの初期化
    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    
    // メイン描画関数
    function updateFrame() {
      const dt = calcDeltaTime();
      if (resizeCanvas()) {
        // キャンバスがリサイズされた場合、FBOを再初期化
      }
      
      // ポインタの入力を処理
      // 物理シミュレーションのステップを実行
      // 描画
      
      animationFrameId = requestAnimationFrame(updateFrame);
    }

    function calcDeltaTime(): number {
      const now = Date.now();
      const dt = Math.min((now - lastUpdateTime) / 1000, 0.016666); // 最大DTを制限
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas(): boolean {
      if (!canvas) return false;
      
      const width = scaleByPixelRatio(canvas.clientWidth);
      const height = scaleByPixelRatio(canvas.clientHeight);
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      
      return false;
    }

    function scaleByPixelRatio(input: number): number {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function hashCode(s: string): number {
      if (s.length === 0) return 0;
      
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      
      return hash;
    }

    // 簡易的な色生成関数
    function generateColor(): Color {
      return {
        r: Math.random() * 0.15,
        g: Math.random() * 0.15,
        b: Math.random() * 0.15
      };
    }

    // イベントリスナーの設定
    const handleMouseDown = (e: MouseEvent) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      
      // ポインタの状態を更新
      pointer.down = true;
      pointer.color = [Math.random(), Math.random(), Math.random()];
      // スプラットを追加（実際の実装では）
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      
      if (pointer.down) {
        pointer.moved = true;
        // ポインタの移動データを更新（実際の実装では）
      }
    };

    const handleMouseUp = () => {
      pointers[0].down = false;
    };

    // イベントリスナーの登録
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // アニメーションの開始
    updateFrame();

    // クリーンアップ関数
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
    </div>
  );
}

export { SplashCursor };
