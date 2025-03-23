import type { Pointer } from "@/lib/types/webgl";

export class PointerImpl implements Pointer {
  id = -1;
  texcoordX = 0;
  texcoordY = 0;
  prevTexcoordX = 0;
  prevTexcoordY = 0;
  deltaX = 0;
  deltaY = 0;
  down = false;
  moved = false;
  color: [number, number, number] = [0, 0, 0];

  constructor(private canvas: HTMLCanvasElement) {}

  updatePointerDownData(id: number, posX: number, posY: number): void {
    this.id = id;
    this.down = true;
    this.moved = false;
    this.texcoordX = posX / this.canvas.width;
    this.texcoordY = 1.0 - posY / this.canvas.height;
    this.prevTexcoordX = this.texcoordX;
    this.prevTexcoordY = this.texcoordY;
    this.deltaX = 0;
    this.deltaY = 0;
  }

  updatePointerMoveData(posX: number, posY: number): void {
    this.prevTexcoordX = this.texcoordX;
    this.prevTexcoordY = this.texcoordY;
    this.texcoordX = posX / this.canvas.width;
    this.texcoordY = 1.0 - posY / this.canvas.height;
    this.deltaX = this.correctDeltaX(this.texcoordX - this.prevTexcoordX);
    this.deltaY = this.correctDeltaY(this.texcoordY - this.prevTexcoordY);
    this.moved = Math.abs(this.deltaX) > 0 || Math.abs(this.deltaY) > 0;
  }

  updatePointerUpData(): void {
    this.down = false;
  }

  private correctDeltaX(delta: number): number {
    const aspectRatio = this.canvas.width / this.canvas.height;
    return aspectRatio < 1 ? delta * aspectRatio : delta;
  }

  private correctDeltaY(delta: number): number {
    const aspectRatio = this.canvas.width / this.canvas.height;
    return aspectRatio > 1 ? delta / aspectRatio : delta;
  }
} 