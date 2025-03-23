import type { GLContext, FBO, DoubleFBO, Pointer, SimulationConfig } from "@/lib/types/webgl";
import { compileShader } from "@/lib/webgl/webgl-utils";
import {
  baseVertexShader,
  copyShader,
  clearShader,
  displayShaderSource,
  splatShader,
  advectionShader,
  divergenceShader,
  curlShader,
  vorticityShader,
  pressureShader,
  gradientSubtractShader,
} from "@/lib/shaders/fluid-shaders";

export class FluidSimulation {
  private gl: GLContext;
  private config: SimulationConfig;
  private dye: DoubleFBO | null = null;
  private velocity: DoubleFBO | null = null;
  private divergence: FBO | null = null;
  private curl: FBO | null = null;
  private pressure: DoubleFBO | null = null;
  private pointers: Pointer[] = [];
  private lastUpdateTime = Date.now();
  private colorUpdateTimer = 0;

  constructor(gl: GLContext, config: SimulationConfig) {
    this.gl = gl;
    this.config = config;
    this.pointers = [this.createPointer()];
    this.initShaders();
    this.initFramebuffers();
  }

  private createPointer(): Pointer {
    const pointer = {
      id: -1,
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      down: false,
      moved: false,
      color: [0, 0, 0] as [number, number, number],
      updatePointerDownData: (id: number, posX: number, posY: number): void => {
        this.updatePointerDownData(pointer, id, posX, posY);
      },
      updatePointerMoveData: (posX: number, posY: number): void => {
        this.updatePointerMoveData(pointer, posX, posY);
      },
      updatePointerUpData: (): void => {
        this.updatePointerUpData(pointer);
      }
    };
    return pointer;
  }

  private initShaders() {
    // シェーダーの初期化処理
    // TODO: シェーダーの初期化を実装
  }

  private initFramebuffers() {
    // FBOの初期化処理
    // TODO: FBOの初期化を実装
  }

  public update(dt: number) {
    this.updateColors(dt);
    this.applyInputs();
    this.step(dt);
  }

  private updateColors(dt: number) {
    this.colorUpdateTimer += dt * this.config.COLOR_UPDATE_SPEED;
    if (this.colorUpdateTimer >= 1) {
      this.colorUpdateTimer = this.wrap(this.colorUpdateTimer, 0, 1);
      for (const p of this.pointers) {
        p.color = this.generateColor();
      }
    }
  }

  private applyInputs() {
    for (const p of this.pointers) {
      if (p.moved) {
        p.moved = false;
        this.splatPointer(p);
      }
    }
  }

  private step(dt: number) {
    // シミュレーションステップの実装
    // TODO: シミュレーションステップを実装
  }

  private splatPointer(pointer: Pointer) {
    const dx = pointer.deltaX * this.config.SPLAT_FORCE;
    const dy = pointer.deltaY * this.config.SPLAT_FORCE;
    this.splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
  }

  private splat(x: number, y: number, dx: number, dy: number, color: [number, number, number]) {
    // スプラット処理の実装
    // TODO: スプラット処理を実装
  }

  private generateColor(): [number, number, number] {
    const c = this.HSVtoRGB(Math.random(), 1.0, 1.0);
    return [c.r * 0.15, c.g * 0.15, c.b * 0.15];
  }

  private HSVtoRGB(h: number, s: number, v: number): { r: number; g: number; b: number } {
    // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
    let r: number, g: number, b: number;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      default:
        r = v;
        g = p;
        b = q;
    }

    return { r, g, b };
  }

  private wrap(value: number, min: number, max: number): number {
    const range = max - min;
    if (range === 0) return min;
    return ((value - min) % range) + min;
  }

  public updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.texcoordX = posX / this.gl.canvas.width;
    pointer.texcoordY = 1.0 - posY / this.gl.canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
  }

  public updatePointerMoveData(pointer: Pointer, posX: number, posY: number) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / this.gl.canvas.width;
    pointer.texcoordY = 1.0 - posY / this.gl.canvas.height;
    pointer.deltaX = this.correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
    pointer.deltaY = this.correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
  }

  public updatePointerUpData(pointer: Pointer) {
    pointer.down = false;
  }

  private correctDeltaX(delta: number): number {
    const aspectRatio = this.gl.canvas.width / this.gl.canvas.height;
    return aspectRatio < 1 ? delta * aspectRatio : delta;
  }

  private correctDeltaY(delta: number): number {
    const aspectRatio = this.gl.canvas.width / this.gl.canvas.height;
    return aspectRatio > 1 ? delta / aspectRatio : delta;
  }

  public render(target: FBO | null) {
    this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    this.drawDisplay(target);
  }

  private drawDisplay(target: FBO | null) {
    // ディスプレイ描画処理の実装
    // TODO: ディスプレイ描画処理を実装
  }

  public cleanup() {
    // リソースの解放処理
    // TODO: リソースの解放処理を実装
  }
} 