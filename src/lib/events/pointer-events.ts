import type { Pointer } from "@/lib/types/webgl";

export class PointerEvents {
  private pointers: Pointer[] = [];

  constructor(pointers: Pointer[]) {
    this.pointers = pointers;
  }

  public handlePointerDown(event: PointerEvent) {
    const pointer = this.getPointer(event.pointerId);
    if (pointer) {
      pointer.updatePointerDownData(event.pointerId, event.clientX, event.clientY);
    }
  }

  public handlePointerMove(event: PointerEvent) {
    const pointer = this.getPointer(event.pointerId);
    if (pointer) {
      pointer.updatePointerMoveData(event.clientX, event.clientY);
    }
  }

  public handlePointerUp(event: PointerEvent) {
    const pointer = this.getPointer(event.pointerId);
    if (pointer) {
      pointer.updatePointerUpData();
    }
  }

  private getPointer(id: number): Pointer | undefined {
    return this.pointers.find(p => p.id === id);
  }
} 