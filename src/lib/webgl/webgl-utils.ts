import type { GLContext, FBO, DoubleFBO, FBOParams, TextureFormat } from "@/lib/types/webgl";
import { WEBGL2_CONSTANTS, WEBGL1_CONSTANTS, isWebGL2, isWebGL1 } from "@/lib/types/webgl";

/**
 * シェーダーのコンパイルとリンクを行う
 */
export function createProgram(gl: GLContext, vertexShader: WebGLShader | null, fragmentShader: WebGLShader | null): WebGLProgram | null {
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Error linking shaders:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

/**
 * シェーダープログラムから全ての uniform 変数のロケーションを取得する
 */
export function getUniforms(gl: GLContext, program: WebGLProgram): Record<string, WebGLUniformLocation> {
  const uniforms: Record<string, WebGLUniformLocation> = {};
  const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformCount; i++) {
    const uniformInfo = gl.getActiveUniform(program, i);
    if (uniformInfo) {
      const location = gl.getUniformLocation(program, uniformInfo.name);
      if (location)
        uniforms[uniformInfo.name] = location;
    }
  }
  return uniforms;
}

/**
 * シェーダーをコンパイルする（オプションでプリプロセッサのキーワードを追加）
 */
export function compileShader(
  gl: GLContext,
  type: number,
  source: string,
  keywords?: string[]
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }

  let shaderSource = source;
  if (keywords) {
    shaderSource = keywords.reduce((src, keyword) => src.replace(`#define ${keyword}`, `#define ${keyword} 1`), source);
  }

  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Error compiling shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * 指定のテクスチャフォーマットがレンダリングターゲットとしてサポートされているか判定
 */
export function getSupportedFormat(
  gl: GLContext,
  internalFormat: number,
  format: number,
  type: number | null
): TextureFormat {
  if (isWebGL2(gl)) {
    if (type === WEBGL2_CONSTANTS.HALF_FLOAT) {
      switch (internalFormat) {
        case WEBGL2_CONSTANTS.R16F:
          return {
            internalFormat: WEBGL2_CONSTANTS.R16F,
            format: WEBGL2_CONSTANTS.RED,
            type: WEBGL2_CONSTANTS.HALF_FLOAT,
          };
        case WEBGL2_CONSTANTS.RG16F:
          return {
            internalFormat: WEBGL2_CONSTANTS.RG16F,
            format: WEBGL2_CONSTANTS.RG,
            type: WEBGL2_CONSTANTS.HALF_FLOAT,
          };
        case WEBGL2_CONSTANTS.RGBA16F:
          return {
            internalFormat: WEBGL2_CONSTANTS.RGBA16F,
            format: WEBGL2_CONSTANTS.RGBA,
            type: WEBGL2_CONSTANTS.HALF_FLOAT,
          };
      }
    }
  }

  return {
    internalFormat: WEBGL1_CONSTANTS.RGBA,
    format: WEBGL1_CONSTANTS.RGBA,
    type: type || WEBGL1_CONSTANTS.RGBA,
  };
}

/**
 * 指定のパラメータで FBO を生成する
 */
export function createFBO(
  gl: GLContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: FBOParams
): FBO {
  gl.activeTexture(gl.TEXTURE0);
  const texture = gl.createTexture();
  if (!texture) {
    throw new Error("Failed to create texture");
  }
  gl.bindTexture(gl.TEXTURE_2D, texture);

  if (param.filtering) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  }

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  if (!fbo) {
    throw new Error("Failed to create framebuffer");
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  return {
    texture,
    fbo,
    width: w,
    height: h,
    attach(id: number): number {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
}

/**
 * ダブルバッファリング用の FBO を作成する（ping-pong 用）
 */
export function createDoubleFBO(
  gl: GLContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: FBOParams
): DoubleFBO {
  const fbo1 = createFBO(gl, w, h, internalFormat, format, type, param);
  const fbo2 = createFBO(gl, w, h, internalFormat, format, type, param);
  return {
    read: fbo1,
    write: fbo2,
    swap() {
      const temp = this.read;
      this.read = this.write;
      this.write = temp;
    },
  };
}

/**
 * 既存の FBO を新しいサイズにリサイズする
 */
export function resizeFBO(
  gl: GLContext,
  target: FBO,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: FBOParams
): FBO {
  const newFBO = createFBO(gl, w, h, internalFormat, format, type, param);
  return newFBO;
}

/**
 * ダブル FBO のリサイズ処理
 */
export function resizeDoubleFBO(
  gl: GLContext,
  target: DoubleFBO,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  param: FBOParams
): DoubleFBO {
  if (target.read.width === w && target.read.height === h) return target;
  target.read = resizeFBO(gl, target.read, w, h, internalFormat, format, type, param);
  target.write = createFBO(gl, w, h, internalFormat, format, type, param);
  return target;
}

/**
 * デバイスピクセル比に応じてサイズを調整する
 */
export function scaleByPixelRatio(input: number): number {
  const pixelRatio = window.devicePixelRatio || 1;
  return Math.floor(input * pixelRatio);
}

/**
 * 文字列からハッシュ値を生成する（シェーダーキーワードの管理用）
 */
export function hashCode(s: string): number {
  if (s.length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
} 