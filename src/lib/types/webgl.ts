/**
 * WebGL関連の型定義
 */

// WebGL2 の定数
export const WEBGL2_CONSTANTS = {
  R16F: 0x822D,
  RG16F: 0x822F,
  RGBA16F: 0x881A,
  RG: 0x8227,
  HALF_FLOAT: 0x140B,
  RED: 0x1903,
  RGBA: 0x1908,
} as const;

// WebGL1 の定数
export const WEBGL1_CONSTANTS = {
  RGBA: 0x1908,
  RED: 0x1903,
} as const;

// WebGLコンテキストの型
export type GLContext = WebGLRenderingContext;

// WebGLコンテキストの型ガード
export function isWebGL2(gl: GLContext): gl is WebGL2RenderingContext {
  return gl instanceof WebGL2RenderingContext;
}

// WebGLコンテキストの型ガード
export function isWebGL1(gl: GLContext): gl is WebGLRenderingContext {
  return gl instanceof WebGLRenderingContext;
}

// WebGLコンテキストの型変換
export function asWebGL2(gl: RenderingContext | null): WebGL2RenderingContext | null {
  if (!gl || !(gl instanceof WebGL2RenderingContext)) {
    return null;
  }
  return gl;
}

export function asWebGL1(gl: RenderingContext | null): WebGLRenderingContext | null {
  if (!gl || !(gl instanceof WebGLRenderingContext)) {
    return null;
  }
  return gl;
}

// シェーダーの型
export type Shader = WebGLShader;

// テクスチャフォーマットの型
export interface TextureFormat {
  internalFormat: number;
  format: number;
  type: number;
}

// WebGL拡張機能の型
export interface WebGLExtensions {
  formatRGBA: TextureFormat;
  formatRG: TextureFormat;
  formatR: TextureFormat;
  halfFloatTexType: number | null;
  supportLinearFiltering: boolean | null;
  halfFloat: OES_texture_half_float | null;
  textureFloat: OES_texture_float | null;
  textureFloatLinear: OES_texture_float_linear | null;
  textureHalfFloatLinear: OES_texture_half_float_linear | null;
}

// WebGLコンテキストのラッパー型
export interface WebGLContext {
  gl: GLContext;
  ext: WebGLExtensions;
}

// シェーダーユーティリティ関数の型
export interface ShaderUtilityFunctions {
  createProgram: (gl: GLContext, vertexShader: WebGLShader | null, fragmentShader: WebGLShader | null) => WebGLProgram | null;
  getUniforms: (gl: GLContext, program: WebGLProgram) => Record<string, WebGLUniformLocation>;
  compileShader: (gl: GLContext, type: number, source: string, keywords?: string[]) => WebGLShader | null;
  getSupportedFormat: (
    gl: GLContext,
    internalFormat: number,
    format: number,
    type: number | null
  ) => TextureFormat;
}

// シミュレーション設定の型
export interface SimulationConfig {
  TEXTURE_DOWNSAMPLE: number;
  DENSITY_DISSIPATION: number;
  VELOCITY_DISSIPATION: number;
  PRESSURE_DISSIPATION: number;
  PRESSURE_ITERATIONS: number;
  CURL: number;
  SPLAT_RADIUS: number;
  SHADING: boolean;
  COLORFUL: boolean;
  COLOR_UPDATE_SPEED: number;
  PAUSED: boolean;
  BACK_COLOR: { r: number; g: number; b: number };
  TRANSPARENT: boolean;
  SPLAT_FORCE: number;
}

// FBOパラメータの型
export interface FBOParams {
  minFilter?: number;
  magFilter?: number;
  wrapS?: number;
  wrapT?: number;
  internalFormat?: number;
  format?: number;
  type?: number;
  filtering?: boolean;
}

// ポインターの型
export interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: [number, number, number];
  updatePointerDownData(id: number, posX: number, posY: number): void;
  updatePointerMoveData(posX: number, posY: number): void;
  updatePointerUpData(): void;
}

// マテリアルの型
export interface Material {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation>;
  vertexShader?: WebGLShader;
  fragmentShader?: WebGLShader;
  bind(gl: GLContext): void;
}

// プログラムの型
export interface Program {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation>;
  vertexShader?: WebGLShader;
  fragmentShader?: WebGLShader;
  bind(gl: GLContext): void;
}

// FBOの型
export interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  attach(id: number): void;
}

// ダブルFBOの型
export interface DoubleFBO {
  read: FBO;
  write: FBO;
  swap(): void;
}